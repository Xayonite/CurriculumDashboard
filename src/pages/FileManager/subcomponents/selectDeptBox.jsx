import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../file-manager.css'

function SelectDeptBox(){
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

    return (
            <DropdownButton
                id="dropdown-department-button"
                title={selectedDepartment}
                className='dropdown-button'>
                {departments.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        className='dropdown-option'
                        onClick={() => setSelectedDepartment(option)}>
                        {option}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        );
    }

export default SelectDeptBox