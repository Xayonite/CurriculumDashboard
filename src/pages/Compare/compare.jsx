import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { getFilesByDept } from '../../database/db';
import SelectDeptBox from '../../components/selectDeptBox';
import SelectFileBox from '../../components/selectFileBox';
import SkillBarChart from '../../components/skillBarChart';
import SkillsLineChart from '../../components/skillsLineChart';
import { analyzeExcelWithProgression } from '../../components/analytics';
import './compare.css';

function Compare() {
    const [deptAIndex, setDeptAIndex] = useState(null);
    const [deptAName, setDeptAName] = useState(null);
    const [filesA, setFilesA] = useState([]);
    const [fileA, setFileA] = useState("Select File A");
    const [analyticsA, setAnalyticsA] = useState(null);

    const [deptBIndex, setDeptBIndex] = useState(null);
    const [deptBName, setDeptBName] = useState(null);
    const [filesB, setFilesB] = useState([]);
    const [fileB, setFileB] = useState("Select File B");
    const [analyticsB, setAnalyticsB] = useState(null);

    const defaultSkills = Array(10).fill("Default");
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
        if (deptAIndex !== null) {
            getFilesByDept(deptAIndex).then(setFilesA);
            setFileA("Select File A");
            setAnalyticsA(null);
        }
    }, [deptAIndex]);

    useEffect(() => {
        if (deptBIndex !== null) {
            getFilesByDept(deptBIndex).then(setFilesB);
            setFileB("Select File B");
            setAnalyticsB(null);
        }
    }, [deptBIndex]);

    useEffect(() => {
        async function analyze(fileName, files, setAnalytics) {
            if (!fileName || fileName.startsWith("Select")) {
                setAnalytics(null);
                return;
            }
            const fileRecord = files.find(f => f.fileName === fileName);
            if (!fileRecord) {
                setAnalytics(null);
                return;
            }
            const result = await analyzeExcelWithProgression(fileRecord.file);
            setAnalytics(result);
        }

        analyze(fileA, filesA, setAnalyticsA);
    }, [fileA, filesA]);

    useEffect(() => {
        async function analyze(fileName, files, setAnalytics) {
            if (!fileName || fileName.startsWith("Select")) {
                setAnalytics(null);
                return;
            }
            const fileRecord = files.find(f => f.fileName === fileName);
            if (!fileRecord) {
                setAnalytics(null);
                return;
            }
            const result = await analyzeExcelWithProgression(fileRecord.file);
            setAnalytics(result);
        }

        analyze(fileB, filesB, setAnalyticsB);
    }, [fileB, filesB]);

    return (
        <div className='compare-content'>
            <div className='compare-area'>
                <div className='dropdown-area'>
                    <SelectDeptBox onSelect={(dept, index) => {
                        setDeptAName(dept);
                        setDeptAIndex(index);
                    }} />
                    <SelectFileBox
                        files={filesA}
                        selectedFile={fileA}
                        onSelect={setFileA}
                        label="File A"
                    />
                </div>

                <div className='statistics-area'>

                <div className='statistics-container'>
                    <div className='graphs-container'>
                        <div className='graph-detail'>
                            <p>{fileA} ({deptAName})</p>
                            <SkillBarChart data={analyticsA?.skillDistribution || defaultSkillDistribution} fileName={fileA} />
                            <SkillsLineChart lineChartData={analyticsA?.lineChartData || defaultLineChartData} fileName={fileA} />
                        </div>
                    </div>

                    <div className='coverage-container'>
                        <div>
                            <p><strong>Skill Ratio:</strong> {analyticsA?.ratioOfFocus ?? "None"}</p>
                            <p><strong>Well Covered:</strong> {analyticsA?.wellCovered || "None"}</p>
                            <p><strong>Low Coverage:</strong> {analyticsA?.lowCoverage || "None"}</p>
                            {analyticsA?.gaps?.length > 0 && (
                                <p><strong>Gaps:</strong> {analyticsA.gaps}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className='compare-area'>
                <div className='dropdown-area'>
                    <SelectDeptBox onSelect={(dept, index) => {
                        setDeptBName(dept);
                        setDeptBIndex(index);
                    }} />
                    <SelectFileBox
                        files={filesB}
                        selectedFile={fileB}
                        onSelect={setFileB}
                        label="File B"
                    />
                </div>

                <div className='statistics-area'>
                <div className='statistics-container'>
                    <div className='graphs-container'>
                        <div className='graph-detail'>
                            <p>{fileB} ({deptBName})</p>
                            <SkillBarChart data={analyticsB?.skillDistribution || defaultSkillDistribution} fileName={fileB} />
                            <SkillsLineChart lineChartData={analyticsB?.lineChartData || defaultLineChartData} fileName={fileB} />
                        </div>
                    </div>

                    <div className='coverage-container'>
                        <div>
                            <p><strong>Skill Ratio:</strong> {analyticsB?.ratioOfFocus ?? "None"}</p>
                            <p><strong>Well Covered:</strong> {analyticsB?.wellCovered || "None"}</p>
                            <p><strong>Low Coverage:</strong> {analyticsB?.lowCoverage || "None"}</p>
                            {analyticsB?.gaps?.length > 0 && (
                                <p><strong>Gaps:</strong> {analyticsB.gaps}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Compare;
