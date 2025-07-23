import { useState } from 'react';
import '../file-manager.css'
import addIcon from '../../../assets/Add_round.png';

function ChooseFileBox({onFileSelect}){
    const [selectedFileName, setSelectedFileName] = useState("No file selected");

    const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setSelectedFileName(file.name);
                if (onFileSelect) {
                    onFileSelect(file);
                }
            } else {
                setSelectedFileName("Choose File");
            }
        };

    return (
        <div className = 'select-file-button'>
            <label htmlFor="file-upload-input">
                {selectedFileName} 
            </label>
            <img src={addIcon} alt="Example" />
            <input
                id="file-upload-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    )
}

export default ChooseFileBox