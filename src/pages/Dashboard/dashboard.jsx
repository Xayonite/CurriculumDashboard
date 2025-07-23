import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { getFilesByDept } from '../../database/db';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SelectDeptBox from '../../components/selectDeptBox';
import SelectFileBox from '../../components/selectFileBox';
import './dashboard.css'

function Dashboard(){
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedDeptIndex, setDeptIndex] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("Select File");

    const handleDeptChange = (dept, index) => {
        setSelectedDept(dept);
        setDeptIndex(index);
        console.log("Selected Department:", dept);
        console.log("Index of Department:", index);
    };

    useEffect(() => {
        if (selectedDeptIndex !== null) {
        fetchFiles(selectedDeptIndex);
        }
    }, [selectedDeptIndex]);

    const fetchFiles = async (deptIndex) => {
        const deptFiles = await getFilesByDept(deptIndex);
        setFiles(deptFiles);
        setSelectedFile("Select File"); 
    };

    const handleFileSelect = (fileName) => {
        setSelectedFile(fileName);
    };
    
    const handlePreview = async () => {
        if (selectedFile === "Select File") {
            alert("Please select a file to preview!");
            return;
        }

        const fileRecord = files.find(file => file.fileName === selectedFile);
        if (!fileRecord) {
            alert("File not found in database.");
            return;
        }

        const url = URL.createObjectURL(fileRecord.file);
        window.open(url, '_blank'); // Open file in new tab
    };

    
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

    const [excelData, setExcelData] = useState([]);


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
            <SelectDeptBox onSelect={handleDeptChange}/>

            <SelectFileBox 
                files={files} 
                selectedFile={selectedFile} 
                onSelect={handleFileSelect} 
            />
            
            <button className='btn btn-primary' onClick={handlePreview} disabled={selectedFile === "Select File"}>
                Preview File
            </button>
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