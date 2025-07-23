import { useState } from 'react';
import { getFilesByDept, deleteFileByName } from '../../../database/db';
import triangleDown from '../../../assets/triangle-down.svg';
import deleteIcon from '../../../assets/delete-icon.svg';
import '../file-manager.css'

function FileManageCard({title, index, fileUploaded}){
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const bgColor = index % 2 === 0 ? '#D9D9D9' : '#FFFFFF';
    const borderColor = index % 2 === 0 ? '#D9D9D9' : '#FFFFFF';
    
    
    
    const loadFiles = async () => {
        const deptFiles = await getFilesByDept(index);
        setFiles(deptFiles);
    };

    const handleToggle = async () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
        await loadFiles();
        }
    };
    const handleDelete = async (fileName) => {
        await deleteFileByName(fileName);
        await loadFiles(); 
    };
    

    return (
        <div className='manage-file-card' style={{ backgroundColor: bgColor, borderColor: borderColor }}>
            <div className = 'manage-file-row'>
                <h4 className='manage-file-card-title'> {title} </h4>
                <img 
                    src={triangleDown} 
                    alt="Triangle down" 
                    width={24} 
                    height={24} 
                    onClick={handleToggle}
                    className={`dropdown-icon ${isOpen ? 'open' : ''}`}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {isOpen && (
                <div className='manage-file-card-dropdown'>
                {files.length > 0 ? (
                    files.map((file, idx) => (
                    <div
                        key={idx}
                        style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                        }}
                    >
                        <p style={{ margin: 0 }}>{file.fileName}</p>
                        <img
                        src={deleteIcon}
                        alt='Delete file'
                        width={20}
                        height={20}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(file.fileName)}
                        />
                    </div>
                    ))
                ) : (
                    <p>No files uploaded for this department.</p>
                )}
                </div>
            )}

        </div>
        
        
        
    )
}

export default FileManageCard