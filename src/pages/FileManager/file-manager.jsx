import {useState} from 'react';
import ChooseFileBox from './subcomponents/chooseFileBox';
import SelectDeptBox from './subcomponents/selectDeptBox';
import FileManageCard from './subcomponents/FileManagerCard';
import { addFile, getFileByFileName } from '../../database/db';
import './file-manager.css'


function FileManager(){
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedDeptIndex, setDeptIndex] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

    
    const handleDeptChange = (dept, index) => {
        setSelectedDept(dept);
        setDeptIndex(index);
        console.log("Selected Department:", dept);
        console.log("Index of Department:", index);
    };

    const handleUpload = async () => {
        if (!selectedFile || selectedDeptIndex === null) {
            alert('Please select both a file and a department.');
            return;
        }

        try {
            const existingFile = await getFileByFileName(selectedFile.name);

            if (existingFile) {
            alert(`File "${selectedFile.name}" already uploaded.`);
            return;
            }

            await addFile(selectedFile, selectedDeptIndex);
            alert('File uploaded to IndexedDB!');
            setSelectedFile(null);
            setFileUploaded(prev => !prev); // Notify children to refresh
        } catch (error) {
            console.error('Upload failed:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    const manageFilesDepartments = [
                        "E.T. Yuchenco School of Business", 
                        "School of Architecture, Industrial Design, and the Built Environment (ARIDBE)", 
                        "School of Chemical, Biological, and Materials Engineering and Sciences (CBMES)", 
                        "School of Civil, Environmental, and Geological Engineering (CEGE)", 
                        "School of Electrical, Electronics, and Computer Engineering (EECE)",
                        "School of Health Sciences (HS)", 
                        "School of Industrial Engineering and Engineering Management (IE-EMG)", 
                        "School of Information Technology (IT)", 
                        "School of Medicine",
                        "School of Mechanical, Manufacturing, and Energy Engineering (MME)", 
                        "School of Media Studies (MS)", 
                        "School of Nursing", 
                        "School of Tourism and Hospitality Management (THM)",
                        "Senior High School"];
    
    return (
        <div className='file-manager-content'>
            <div className='upload-area'>
                <h1>Upload File</h1>
                
                <div className='dropdown-area'>
                    <SelectDeptBox onSelect={handleDeptChange} />
                    <ChooseFileBox onFileSelect={setSelectedFile}/>
                </div>
                
                <button className = 'upload-button' onClick = {handleUpload}> 
                    Upload 
                </button>
            </div>

            {/* Manage Files Area */}
            <h1>Manage Files</h1>

            <div className='manage-file-container'>
                {manageFilesDepartments.map((dept, idx) => (
                    <FileManageCard 
                        key = {idx} 
                        title = {dept} 
                        index = {idx} 
                        fileUploaded={fileUploaded}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default FileManager