import React, { useState } from 'react';
import '../file-manager.css'

import addIcon from '../../../assets/Add_round.png';

function ChooseFileBox(){
    const [selectedFileName, setSelectedFileName] = useState("No file selected");

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
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        setSelectedFileName(file.name);
                    } else {
                        setSelectedFileName("Choose File");
                    }
                }}

                
            />
        </div>
    )
}

export default ChooseFileBox