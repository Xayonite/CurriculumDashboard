import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './dashboard.css'

function Dashboard(){
    const programs = ["BS IT", "BS CS", "BS IS", "BS EMC", "BS DS"];
    const schoolYears = ["A.Y 2024 - 2025", "A.Y 2023 - 2024", "A.Y 2022 - 2023"];

    const values = [
        {
            image: "skill_ratio.png",
            title: "Skills Ratio",
            description: "Description 1",
        },
        {
            image: "skill_distribution.png",
            title: "Skills Distribution",
            description: "Description 2",
        },
        {
            image: "skill_progression.png",
            title: "Skills Progression",
            description: "Description 3",
        },
    ];

    const [selectedProgram, setSelectedProgram] = useState("Choose Program");
    const [selectedYear, setSelectedYear] = useState("Select School Year");

    const [excelData, setExcelData] = useState([]);

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

    function loadStatistics() {
    return values.map((option, index) => (
        <div className='statistics' key={index}>
            <a href={`/${option.image}`} target="_blank" rel="noopener noreferrer">
                <img src={`/${option.image}`} alt={option.title} />
            </a>
            <h1>{option.title}</h1>
            <p>{option.description}</p>
        </div>
    ));
}

    useEffect(() => {
    setExcelData([]); 

    fetch('/BSIT_AY2024-2025.xlsx')
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setExcelData(jsonData);
        })
        .catch(err => console.error("Error loading Excel file:", err));
    }, []);



    return (
    <div className='dashboard-content'>
        <div className='dropdown-area'>
            {loadProgramOptions()}
            {loadYearOptions()}
        </div>
        <div className='statistics-area'>
            <h1>Statistics</h1>
            <div className='statistics-container'>
                {loadStatistics()}
            </div>
        </div>
        <div className='excel-area'>
            <h1>Excel Values</h1>
            <div className='excel-container'>
                <table>
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    )
}

export default Dashboard