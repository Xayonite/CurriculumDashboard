import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './file-manager.css'

import addIcon from '../../assets/Add_round.png';

function FileManager(){
    const programs = ["BS IT", "BS CS", "BS IS", "BS EMC", "BS DS"];
    const schoolYears = ["A.Y 2024 - 2025", "A.Y 2023 - 2024", "A.Y 2022 - 2023"];

    const [selectedProgram, setSelectedProgram] = useState("Choose Program");
    const [selectedYear, setSelectedYear] = useState("Select School Year");

    const [selectedFileName, setSelectedFileName] = useState("No file selected");


    function loadProgramOptions() {
        return (
            <DropdownButton
                id="dropdown-program-button"
                title={selectedProgram}
                className='dropdown-button'>
                {programs.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        className='dropdown-option'
                        onClick={() => setSelectedProgram(option)}>
                        {option}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        );
    }

    function loadYearOptions() {
        return (
            <DropdownButton
                id="dropdown-year-button"
                title={selectedYear}
                className='dropdown-button'>
                {schoolYears.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        className='dropdown-option'
                        onClick={() => setSelectedYear(option)}>
                        {option}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        );
    }

    return (
    <div className='file-manager-content'>
        <div className='upload-area'>
            <h1>Upload File</h1>
            
            <div className='dropdown-area'>
                {loadProgramOptions()}
                {loadYearOptions()}
                <div>
                    <label htmlFor="file-upload-input" className='upload-button'>
                        Upload File <img src={addIcon} alt="Example" />
                    </label>
                    <input
                        id="file-upload-input"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setSelectedFileName(file.name);
                            } else {
                                setSelectedFileName("No file selected");
                            }
                        }}
                    />
                    
                </div>
                <span className='file-name'>{selectedFileName}</span>
            </div>
        </div>
    </div>
    )
}

export default FileManager