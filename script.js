// WGPA Calculator for Faculty of Computing, SLIIT

// Grade Points Mapping
const gradePoints = {
    'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00,
    'B-': 2.67, 'C+': 2.33, 'C': 2.00, 'C-': 1.67,
    'D': 1.00, 'F': 0.00, 'E': 0.00
};

const gradeOptions = Object.keys(gradePoints);

// FoC Weights: [Y1, Y2, Y3, Y4]
const focWeights = [0, 0.2, 0.3, 0.5];

// DOM Elements
const currentYearSelect = document.getElementById('currentYear');
const calculateBtn = document.getElementById('calculateBtn');
const resultsDiv = document.getElementById('results');
const finalWGPASpan = document.getElementById('finalWGPA');
const yearGPAsDiv = document.getElementById('yearGPAs');

const semesterIds = [
    'y1s1', 'y1s2',
    'y2s1', 'y2s2',
    'y3s1', 'y3s2',
    'y4s1', 'y4s2'
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Render module tables for each semester
    semesterIds.forEach(id => renderModuleTable(id));
    // Set default year and show corresponding inputs
    showYearInputs(1);
    // Add event listeners
    currentYearSelect.addEventListener('change', function() {
        showYearInputs(parseInt(this.value));
        updateAllGPAs();
    });
    calculateBtn.addEventListener('click', calculateWGPA);
    // Add sample data button (for testing)
    addSampleDataButton();
    // Add live GPA calculation listeners
    addLiveGPAListeners();
}

function showYearInputs(year) {
    // Hide all year sections
    document.querySelectorAll('.year-section').forEach(section => {
        section.style.display = 'none';
    });
    // Show sections up to the selected year
    for (let i = 1; i <= year; i++) {
        const yearSection = document.getElementById(`year${i}`);
        if (yearSection) {
            yearSection.style.display = 'block';
        }
    }
}

function renderModuleTable(semId) {
    const container = document.getElementById(`table-${semId}`);
    if (!container) return;
    container.innerHTML = '';
    // Table
    const table = document.createElement('table');
    table.className = 'table table-bordered table-sm align-middle mb-2';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Module Code</th>
                <th>Grade</th>
                <th>Credits</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    container.appendChild(table);
    // Add Row Button
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-outline-primary btn-sm';
    addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Module';
    addBtn.onclick = () => { addModuleRow(table, semId); addLiveGPAListeners(); };
    container.appendChild(addBtn);
    // Add initial row
    addModuleRow(table, semId);
}

function addModuleRow(table, semId, data = {}) {
    const tbody = table.querySelector('tbody');
    const tr = document.createElement('tr');
    // Module Code
    const tdCode = document.createElement('td');
    const inputCode = document.createElement('input');
    inputCode.type = 'text';
    inputCode.className = 'form-control form-control-sm';
    inputCode.placeholder = 'e.g. IT1010';
    inputCode.value = data.code || '';
    tdCode.appendChild(inputCode);
    // Grade
    const tdGrade = document.createElement('td');
    const selectGrade = document.createElement('select');
    selectGrade.className = 'form-select form-select-sm';
    gradeOptions.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        if (data.grade === g) opt.selected = true;
        selectGrade.appendChild(opt);
    });
    tdGrade.appendChild(selectGrade);
    // Credits
    const tdCredits = document.createElement('td');
    const inputCredits = document.createElement('input');
    inputCredits.type = 'number';
    inputCredits.className = 'form-control form-control-sm';
    inputCredits.min = 0;
    inputCredits.step = 1;
    inputCredits.placeholder = 'e.g. 3';
    inputCredits.value = data.credits || '';
    tdCredits.appendChild(inputCredits);
    // Remove Button
    const tdRemove = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-outline-danger btn-sm';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.onclick = () => { tr.remove(); updateAllGPAs(); };
    tdRemove.appendChild(removeBtn);
    // Append all
    tr.appendChild(tdCode);
    tr.appendChild(tdGrade);
    tr.appendChild(tdCredits);
    tr.appendChild(tdRemove);
    tbody.appendChild(tr);
    // Add listeners for live GPA update
    [inputCode, selectGrade, inputCredits].forEach(el => {
        el.removeEventListener('input', updateAllGPAs);
        el.removeEventListener('change', updateAllGPAs);
        el.addEventListener('input', updateAllGPAs);
        el.addEventListener('change', updateAllGPAs);
    });
}

function addSampleDataButton() {
    const sampleBtn = document.createElement('button');
    sampleBtn.className = 'btn btn-outline-secondary btn-sm mt-2';
    sampleBtn.innerHTML = '<i class="fas fa-magic me-1"></i>Load Sample Data';
    sampleBtn.onclick = loadSampleData;
    const container = document.querySelector('.calculator-container');
    container.appendChild(sampleBtn);
}

function loadSampleData() {
    // Example: Fill Y1S1 and Y1S2 with some modules, rest empty
    const sampleModules = {
        y1s1: [
            { code: 'IT1010', grade: 'C+', credits: 3 },
            { code: 'IT1020', grade: 'B-', credits: 4 },
            { code: 'IT1030', grade: 'A', credits: 3 },
        ],
        y1s2: [
            { code: 'IE1010', grade: 'A+', credits: 4 },
            { code: 'IE1020', grade: 'A', credits: 3 },
            { code: 'IT1050', grade: 'B', credits: 2 },
        ],
        y2s1: [
            { code: 'IE2010', grade: 'B+', credits: 3 },
            { code: 'IE2020', grade: 'B', credits: 3 },
        ],
        y2s2: [
            { code: 'IE2040', grade: 'C', credits: 2 },
        ],
        y3s1: [],
        y3s2: [],
        y4s1: [],
        y4s2: [],
    };
    semesterIds.forEach(id => {
        renderModuleTable(id); // clear
        const container = document.getElementById(`table-${id}`);
        const table = container.querySelector('table');
        if (sampleModules[id] && sampleModules[id].length > 0) {
            sampleModules[id].forEach(row => addModuleRow(table, id, row));
        }
    });
    currentYearSelect.value = '2';
    showYearInputs(2);
    showNotification('Sample data loaded! Click Calculate WGPA to see the result.', 'success');
}

// Calculate Semester GPA from module rows
function calculateSemesterGPA(modules) {
    let totalPoints = 0;
    let totalCredits = 0;
    for (const module of modules) {
        const gp = gradePoints[module.grade] || 0;
        const credits = parseFloat(module.credits) || 0;
        totalPoints += gp * credits;
        totalCredits += credits;
    }
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
}

// Calculate Year GPA (average of two semesters)
function calculateYearGPA(sem1GPA, sem2GPA) {
    const sem1 = parseFloat(sem1GPA) || 0;
    const sem2 = parseFloat(sem2GPA) || 0;
    if (sem1 === 0 && sem2 === 0) return 0;
    return ((sem1 + sem2) / 2).toFixed(2);
}

// Calculate WGPA for FoC
function calculateWGPA(yearGPAs) {
    let wgpa = 0;
    for (let i = 0; i < yearGPAs.length; i++) {
        wgpa += parseFloat(yearGPAs[i] || 0) * focWeights[i];
    }
    return wgpa.toFixed(2);
}

// Main calculation function
function calculateWGPA() {
    calculateBtn.innerHTML = '<span class="loading"></span> Calculating...';
    calculateBtn.disabled = true;
    setTimeout(() => {
        try {
            const currentYear = parseInt(currentYearSelect.value);
            const yearGPAs = [];
            for (let year = 1; year <= currentYear; year++) {
                // For each semester, collect module data
                const sem1Id = `y${year}s1`;
                const sem2Id = `y${year}s2`;
                const sem1Modules = getModulesFromTable(sem1Id);
                const sem2Modules = getModulesFromTable(sem2Id);
                const sem1GPA = calculateSemesterGPA(sem1Modules);
                const sem2GPA = calculateSemesterGPA(sem2Modules);
                const yearGPA = calculateYearGPA(sem1GPA, sem2GPA);
                yearGPAs.push(yearGPA);
            }
            // Fill remaining years with 0
            for (let year = currentYear + 1; year <= 4; year++) {
                yearGPAs.push(0);
            }
            // Calculate final WGPA
            const finalWGPA = calculateWGPA(yearGPAs);
            // Display results
            displayResults(yearGPAs, finalWGPA);
            showNotification('WGPA calculated successfully!', 'success');
        } catch (error) {
            console.error('Error calculating WGPA:', error);
            showNotification('Error calculating WGPA. Please check your inputs.', 'error');
        } finally {
            calculateBtn.innerHTML = '<i class="fas fa-calculator me-2"></i>Calculate WGPA';
            calculateBtn.disabled = false;
        }
    }, 500);
}

function getModulesFromTable(semId) {
    const container = document.getElementById(`table-${semId}`);
    if (!container) return [];
    const table = container.querySelector('table');
    if (!table) return [];
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    return rows.map(tr => {
        const tds = tr.querySelectorAll('td');
        return {
            code: tds[0].querySelector('input').value.trim(),
            grade: tds[1].querySelector('select').value,
            credits: tds[2].querySelector('input').value.trim(),
        };
    }).filter(m => m.code && m.credits); // Only valid rows
}

function displayResults(yearGPAs, finalWGPA) {
    // Display year GPAs
    let yearGPAsHTML = '';
    for (let i = 0; i < yearGPAs.length; i++) {
        const weight = focWeights[i] * 100;
        const gpa = yearGPAs[i];
        const weightClass = weight > 0 ? 'text-primary' : 'text-muted';
        yearGPAsHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>Year ${i + 1}:</span>
                <div>
                    <span class="fw-bold">${gpa}</span>
                    <small class="ms-2 ${weightClass}">(${weight}%)</small>
                </div>
            </div>
        `;
    }
    yearGPAsDiv.innerHTML = yearGPAsHTML;
    finalWGPASpan.textContent = finalWGPA;
    finalWGPASpan.classList.add('success-pulse');
    resultsDiv.style.display = 'block';
    setTimeout(() => {
        finalWGPASpan.classList.remove('success-pulse');
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility function to convert letter grade to grade point
function letterGradeToPoint(letterGrade) {
    return gradePoints[letterGrade.toUpperCase()] || 0;
}

function addLiveGPAListeners() {
    semesterIds.forEach(semId => {
        const container = document.getElementById(`table-${semId}`);
        if (!container) return;
        const table = container.querySelector('table');
        if (!table) return;
        const inputs = table.querySelectorAll('input, select');
        inputs.forEach(el => {
            el.removeEventListener('input', updateAllGPAs);
            el.removeEventListener('change', updateAllGPAs);
            el.addEventListener('input', updateAllGPAs);
            el.addEventListener('change', updateAllGPAs);
        });
    });
}

function updateAllGPAs() {
    // For each semester, calculate and display GPA
    for (let year = 1; year <= 4; year++) {
        let semGPAs = [];
        for (let sem = 1; sem <= 2; sem++) {
            const semId = `y${year}s${sem}`;
            const modules = getModulesFromTable(semId);
            const gpa = calculateSemesterGPA(modules);
            const gpaDiv = document.getElementById(`semGPA-${semId}`);
            if (gpaDiv) {
                gpaDiv.textContent = modules.length ? `Semester ${sem} GPA: ${gpa}` : '';
            }
            semGPAs.push(parseFloat(gpa) || 0);
        }
        // Year GPA
        const yearGPA = (semGPAs[0] === 0 && semGPAs[1] === 0) ? '' : ((semGPAs[0] + semGPAs[1]) / 2).toFixed(2);
        const yearDiv = document.getElementById(`yearGPA-y${year}`);
        if (yearDiv) {
            yearDiv.textContent = yearGPA ? `Year ${year} GPA: ${yearGPA}` : '';
        }
    }
}

window.WGPACalculator = {
    calculateSemesterGPA,
    calculateYearGPA,
    calculateWGPA,
    letterGradeToPoint,
    gradePoints,
    focWeights
}; 