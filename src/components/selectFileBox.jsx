import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../App.css'

function SelectFileBox({ files, selectedFile, onSelect }){
    

    return (
            <DropdownButton
            title={
                <span className="dropdown-title" title={selectedFile}>
                {selectedFile}
                </span>
            }
            variant="secondary"
            disabled={files.length === 0}
            className='dropdown-button'
            >
            {files.length > 0 ? (
                files.map((file, idx) => (
                <Dropdown.Item
                    key={idx}
                    className='dropdown-option'
                    onClick={() => onSelect(file.fileName)}
                >
                    {file.fileName}
                </Dropdown.Item>
                ))
            ) : (
                <Dropdown.Item disabled>No files available</Dropdown.Item>
            )}
            </DropdownButton>
        );
    }

export default SelectFileBox