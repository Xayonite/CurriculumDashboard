import ChooseFileBox from './subcomponents/chooseFileBox';
import SelectDeptBox from './subcomponents/selectDeptBox';
import FileManageCard from './subcomponents/FileManagerCard';
import './file-manager.css'


function FileManager(){

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
                    <SelectDeptBox />

                    <ChooseFileBox />
                </div>
                
                <button className = 'upload-button'> Upload </button>
                     
            </div>

            {/* Manage Files Area */}
            <h1>Manage Files</h1>

            <div className='manage-file-container'>
                <FileManageCard />
            </div>
            
        </div>
    )
}

export default FileManager