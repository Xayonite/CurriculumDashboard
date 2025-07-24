import * as XLSX from "xlsx";

export async function analyzeExcelWithProgression(fileBlob) {
    const arrayBuffer = await fileBlob.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // ✅ Extract skill names from header (row 0, col 5 onward)
    const skills = data[0].slice(4);

    // ✅ Course rows (excluding header & last 3)
    const courseRows = data.slice(1, data.length - 3);
    
    /*
    const filteredCourseRows = courseRows.filter(row => {
        const col0 = String(row[0] || "").trim().toLowerCase();
        return col0 !== "" && col0 !== "course code" && !col0.includes("year");
    });

    const totalCourses = filteredCourseRows.length;
    TESTING*/
    const totalCourses = 55;


    // ✅ Check counts for bar chart
    const checkCounts = new Array(skills.length).fill(0);
    courseRows.forEach(row => {
        row.slice(4).forEach((cell, idx) => {
        if (String(cell).includes("✔")) checkCounts[idx]++;
        });
    });

    const percentages = checkCounts.map(c => (c / totalCourses) * 100);

    // ✅ Build skill distribution
    const skillDistribution = skills.map((skill, idx) => ({
        skill,
        checkCount: checkCounts[idx],
        percentage: percentages[idx],
        color: percentages[idx] >= 30 ? "green" : percentages[idx] > 0 ? "orange" : "red"
    }));

    // ✅ Categorize skills
    const wellCovered = skillDistribution.filter(s => s.percentage >= 30).map(s => s.skill);
    const lowCoverage = skillDistribution.filter(s => s.percentage < 30 && s.percentage > 0).map(s => s.skill);
    const gaps = skillDistribution.filter(s => s.percentage === 0).map(s => s.skill);

    // ✅ Extract totals row for ratio
    const civicEngagementIndex = skillDistribution.findIndex(s => s.skill === "Civic Engagement");

    // Sum checkCounts for Leadership to Civic Engagement (inclusive)
    const greenTotal = skillDistribution
    .slice(0, civicEngagementIndex + 1)  // +1 because slice is exclusive of end index
    .reduce((sum, skill) => sum + skill.checkCount, 0);

    // Sum checkCounts for skills after Civic Engagement until last column
    const redTotal = skillDistribution
    .slice(civicEngagementIndex + 1)
    .reduce((sum, skill) => sum + skill.checkCount, 0);

    // Calculate ratio
    const ratioOfFocus = redTotal ? greenTotal / redTotal : 0;

    // ✅ Summary Text
    const summaryText = `
        Skills Summary
        Ratio of Skills Focus: ${ratioOfFocus.toFixed(2)}

        Well-covered (≥ 30%): ${wellCovered.join(", ")}
        Low coverage (< 30%): ${lowCoverage.join(", ")}
        Gaps (0%): ${gaps.join(", ")}
    `;

    // ✅ Progression Calculation (Line Chart)
    const courseData = data.slice(1, data.length - 3);
    const headers = data[0];
    const courseMatrix = courseData.map(row => row.slice(0, 5 + skills.length));

    // Fill missing year labels in first column
    let currentYear = "";
    courseMatrix.forEach(row => {
        if (row[0] && row[0].trim() !== "") currentYear = row[0];
        else row[0] = currentYear;
    });

    // Group rows by year
    const yearGroups = {};
    const yearCounts = {}; 
    

    courseMatrix.forEach(row => {
        const col0 = String(row[0] || "").trim();

        if (col0.toLowerCase().includes("year")) {
            // ✅ This is a header row like "1st Year, 1st Trimester"
            const yearMatch = col0.match(/^\d+(st|nd|rd|th)\s+Year/i);
            currentYear = yearMatch ? yearMatch[0] : col0; // e.g., "1st Year"
        } else if (currentYear && col0 && col0.toLowerCase() !== "course code") {
            // ✅ This is a subject row
            if (row.slice(5).some(cell => String(cell).trim() !== "")) {
                if (!yearGroups[currentYear]) yearGroups[currentYear] = [];
                if (!yearCounts[currentYear]) yearCounts[currentYear] = 0;

                yearGroups[currentYear].push(row.slice(4)); // ✅ Add skill data
                yearCounts[currentYear]++; // ✅ Count subject row
            }
        }
    });



    // Calculate percentage progression
    const progression = {};
    for (const [year, rows] of Object.entries(yearGroups)) {
        const counts = new Array(skills.length).fill(0);

        // Count all checks for each skill in this year
        rows.forEach(r => {
            r.forEach((cell, idx) => {
                if (String(cell).includes("✔")) counts[idx]++;
            });
        });

        // Use actual number of subjects for this year from yearCounts
        const totalCoursesYear = yearCounts[year] || 1; 
        const percentagesYear = counts.map(c => (c / totalCoursesYear) * 100);

        progression[`End of ${year}`] = percentagesYear;
    }


    // Sort progression columns by year order (1st to 4th)
    const sortedYears = Object.keys(progression).sort((a, b) =>
        parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0])
    );

    const lineChartData = {
        yearCounts,
        skills,
        years: sortedYears,
        series: sortedYears.map(year => ({
        name: year,
        data: progression[year]
        }))
    };

    return {
        skills,
        skillDistribution,
        wellCovered,
        lowCoverage,
        gaps,
        ratioOfFocus,
        greenTotal,
        redTotal,
        summaryText,
        lineChartData,
        yearGroups
    };
}
