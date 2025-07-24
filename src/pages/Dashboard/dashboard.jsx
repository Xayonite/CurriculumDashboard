import { useState, useEffect } from 'react';
import { getFilesByDept } from '../../database/db';
import SelectDeptBox from '../../components/selectDeptBox';
import SelectFileBox from '../../components/selectFileBox';
import SkillBarChart from '../../components/skillBarChart';
import SkillsLineChart from '../../components/skillsLineChart';
import { analyzeExcelWithProgression } from '../../components/analytics';
import FormattedList from '../../components/formattedList';
import * as XLSX from 'xlsx';
import './dashboard.css'

function Dashboard(){
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedDeptIndex, setDeptIndex] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("Select File");
    const [analytics, setAnalytics] = useState(null);
    const [excelData, setExcelData] = useState([]);

    const handleDeptChange = (dept, index) => {
        setSelectedDept(dept);
        setDeptIndex(index);
        setSelectedFile("Select File");
        setAnalytics(null); 
        console.log("Selected Department:", dept);
        console.log("Index of Department:", index);
    };

    const fetchFiles = async (deptIndex) => {
        const deptFiles = await getFilesByDept(deptIndex);
        setFiles(deptFiles);
        setSelectedFile("Select File"); 
        setAnalytics(null);
    };

    const handleFileSelect = (fileName) => {
        setSelectedFile(fileName);
    };

    useEffect(() => {
        if (selectedDeptIndex !== null) {
        fetchFiles(selectedDeptIndex);
        }
    }, [selectedDeptIndex]);

    useEffect(() => {
        async function analyzeFile() {
        if (!selectedFile || selectedFile === "Select File") {
            console.log("Select File");
            setAnalytics(null);
            return;
        }

        const fileRecord = files.find(f => f.fileName === selectedFile);
        if (!fileRecord) {
            console.log("No File Record");
            setAnalytics(null);
            return;
        }

        const result = await analyzeExcelWithProgression(fileRecord.file);
        console.log("Loaded Successfully");
        console.log("Analytics result:", result);
        setAnalytics(result);
        }

        analyzeFile();
    }, [selectedFile, files]);

    
    const defaultSkills = [
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
    ];

    const defaultSkillDistribution = defaultSkills.map(skill => ({
        skill,
        checkCount: 0,
        percentage: 0,
    }));

    const defaultLineChartData = {
        skills: defaultSkills,
        years: ["End of 1st Year", "End of 2nd Year", "End of 3rd Year", "End of 4th Year"],
        series: [
            { name: "End of 1st Year", data: Array(defaultSkills.length).fill(0) },
            { name: "End of 2nd Year", data: Array(defaultSkills.length).fill(0) },
            { name: "End of 3rd Year", data: Array(defaultSkills.length).fill(0) },
            { name: "End of 4th Year", data: Array(defaultSkills.length).fill(0) },
        ],
        };
    
    useEffect(() => {
    async function loadExcel() {
        if (!selectedFile || selectedFile === "Select File") {
        setExcelData([]); // clear data if no file selected
        return;
        }

        // Find the file object from your files array
        const fileRecord = files.find(f => f.fileName === selectedFile);
            if (!fileRecord) {
            console.error("Selected file not found in files list");
            setExcelData([]);
            return;
            }

            try {
            const arrayBuffer = await fileRecord.file.arrayBuffer(); // get file data as arrayBuffer
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setExcelData(jsonData);
            } catch (err) {
            console.error("Error loading selected Excel file:", err);
            setExcelData([]);
            }
        }

    loadExcel();
    }, [selectedFile, files]);



    return (
    <div className='dashboard-content'>
        <div className='dropdown-area'>
            <SelectDeptBox onSelect={handleDeptChange}/>

            <SelectFileBox 
                files={files} 
                selectedFile={selectedFile} 
                onSelect={handleFileSelect} 
            />
            
        </div>
        
        <div className='statistics-container'>
            <h1>Statistics</h1>
    
                {/* Ratios and Shits */}
                <p><strong>Skills Ratio:</strong> {analytics?.ratioOfFocus || "No ratio info."}</p>
                
                <div className='graphs-container'>
                    <SkillBarChart skillDistribution={analytics?.skillDistribution || defaultSkillDistribution} fileName={selectedFile}/>
                    <SkillsLineChart lineChartData={analytics?.lineChartData|| defaultLineChartData} fileName={selectedFile} />
                </div>
                
                <div className='coverage-container'>
                    <p><strong>Well Covered:</strong> <FormattedList items={analytics?.wellCovered} emptyText="No well-covered skills." /></p>
                    <p><strong>Low Coverage:</strong> <FormattedList items={analytics?.lowCoverage} emptyText="No low-coverage skills." /></p>
                    <p><strong>Gaps:</strong> <FormattedList items={analytics?.gaps} emptyText="No gaps found." /></p>
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