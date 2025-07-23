import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../App.css'

function SelectDeptBox({onSelect}){
    const departments = [
                        "ETY School of Business", 
                        "School of ARIDBE", 
                        "School of CBMES", 
                        "School of CEGE", 
                        "School of EECE",
                        "School of HS", 
                        "School of IE-EMG", 
                        "School of IT", 
                        "School of Medicine",
                        "School of MME", 
                        "School of MS", 
                        "School of Nursing", 
                        "School of THM",
                        "Senior High School"];

    const [selectedDepartment, setSelectedDepartment] = useState("Choose Department");
    
    const handleSelect = (option) => {
        setSelectedDepartment(option);
        const index = departments.indexOf(option);
        onSelect(option, index);
        };

    return (
            <DropdownButton
                id="dropdown-department-button"
                title={selectedDepartment}
                className='dropdown-button'>
                {departments.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        className='dropdown-option'
                        onClick={() => handleSelect(option)}>
                        {option}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        );
    }

export default SelectDeptBox