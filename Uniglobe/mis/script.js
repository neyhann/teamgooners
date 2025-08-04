// Global variables
let currentUser = null;
let currentRole = null;
let currentDate = new Date();
let isLoggedIn = false;

// Sample data
const sampleTeachers = [
    { name: "Dr. Ram Bahadur Thapa", subject: "Physics", avatar: "RT" },
    { name: "Ms. Sita Devi Shrestha", subject: "Chemistry", avatar: "SS" },
    { name: "Mr. Hari Prasad Nepal", subject: "Biology", avatar: "HN" },
    { name: "Dr. Gita Kumari Basnet", subject: "Mathematics", avatar: "GB" },
    { name: "Ms. Laxmi Devi Tamang", subject: "English", avatar: "LT" },
    { name: "Mr. Krishna Bahadur Gurung", subject: "Nepali", avatar: "KG" }
];

const sampleNotices = [
    { title: "Mid-Term Examination Schedule", content: "Mid-term examinations will be held from August 15-20, 2025.", date: "2025-08-01" },
    { title: "Science Fair Registration", content: "Registration for the annual science fair is now open.", date: "2025-08-02" },
    { title: "Parent-Teacher Meeting", content: "Parent-teacher meeting scheduled for August 25, 2025.", date: "2025-08-03" },
    { title: "Annual Sports Day", content: "Annual sports day will be celebrated on September 10, 2025.", date: "2025-08-05" },
    { title: "Library Week", content: "Library week activities from September 15-20, 2025.", date: "2025-08-08" }
];

const sampleAssignments = [
    { subject: "Physics", title: "Mechanics Assignment - Chapter 3", dueDate: "2025-08-10", status: "pending", score: null },
    { subject: "Chemistry", title: "Organic Chemistry Lab Report", dueDate: "2025-08-08", status: "submitted", score: null },
    { subject: "Biology", title: "Cell Biology Project", dueDate: "2025-08-15", status: "pending", score: null },
    { subject: "Mathematics", title: "Calculus Problem Set", dueDate: "2025-08-05", status: "graded", score: 85 },
    { subject: "English", title: "Essay Writing - My Future Goals", dueDate: "2025-08-12", status: "submitted", score: null },
    { subject: "Nepali", title: "Nepali Literature Analysis", dueDate: "2025-08-18", status: "pending", score: null }
];

const sampleAttendance = [
    { date: '2025-08-01', subject: 'Physics', status: 'present', remarks: '' },
    { date: '2025-08-01', subject: 'Chemistry', status: 'present', remarks: '' },
    { date: '2025-08-01', subject: 'Biology', status: 'present', remarks: '' },
    { date: '2025-08-01', subject: 'Mathematics', status: 'present', remarks: '' },
    { date: '2025-08-01', subject: 'English', status: 'present', remarks: '' },
    { date: '2025-08-01', subject: 'Nepali', status: 'present', remarks: '' },
    { date: '2025-08-02', subject: 'Physics', status: 'present', remarks: '' },
    { date: '2025-08-02', subject: 'Chemistry', status: 'late', remarks: 'Traffic jam' },
    { date: '2025-08-02', subject: 'Biology', status: 'present', remarks: '' },
    { date: '2025-08-02', subject: 'Mathematics', status: 'present', remarks: '' },
    { date: '2025-08-02', subject: 'English', status: 'present', remarks: '' },
    { date: '2025-08-02', subject: 'Nepali', status: 'present', remarks: '' },
    { date: '2025-08-03', subject: 'Physics', status: 'absent', remarks: 'Sick leave' },
    { date: '2025-08-03', subject: 'Chemistry', status: 'absent', remarks: 'Sick leave' },
    { date: '2025-08-03', subject: 'Biology', status: 'absent', remarks: 'Sick leave' },
    { date: '2025-08-03', subject: 'Mathematics', status: 'absent', remarks: 'Sick leave' },
    { date: '2025-08-03', subject: 'English', status: 'absent', remarks: 'Sick leave' },
    { date: '2025-08-03', subject: 'Nepali', status: 'absent', remarks: 'Sick leave' }
];

const sampleEcaEvents = [
    { title: 'Basketball Tournament', date: '2025-08-10', type: 'Sports', status: 'Participated', achievement: 'Runner-up' },
    { title: 'Science Quiz Competition', date: '2025-08-15', type: 'Academic', status: 'Participated', achievement: '1st Place' },
    { title: 'Debate Competition', date: '2025-08-20', type: 'Academic', status: 'Participated', achievement: 'Best Speaker' },
    { title: 'Cultural Dance Performance', date: '2025-08-25', type: 'Cultural', status: 'Participated', achievement: 'Special Recognition' },
    { title: 'Chess Tournament', date: '2025-09-01', type: 'Sports', status: 'Participated', achievement: '3rd Place' }
];

const sampleExamResults = {
    "2025": {
        "Mid Term Exam": [
            { subject: "Physics", fullMarks: 100, obtained: 87, percentage: 87, grade: "A" },
            { subject: "Chemistry", fullMarks: 100, obtained: 80, percentage: 80, grade: "A-" },
            { subject: "Biology", fullMarks: 100, obtained: 91, percentage: 91, grade: "A+" },
            { subject: "Mathematics", fullMarks: 100, obtained: 86, percentage: 86, grade: "A" },
            { subject: "English", fullMarks: 100, obtained: 84, percentage: 84, grade: "A-" },
            { subject: "Nepali", fullMarks: 100, obtained: 89, percentage: 89, grade: "A" }
        ],
        "Final Term Exam": [
            { subject: "Physics", fullMarks: 100, obtained: 85, percentage: 85, grade: "A" },
            { subject: "Chemistry", fullMarks: 100, obtained: 78, percentage: 78, grade: "B+" },
            { subject: "Biology", fullMarks: 100, obtained: 92, percentage: 92, grade: "A+" },
            { subject: "Mathematics", fullMarks: 100, obtained: 88, percentage: 88, grade: "A" },
            { subject: "English", fullMarks: 100, obtained: 82, percentage: 82, grade: "A-" },
            { subject: "Nepali", fullMarks: 100, obtained: 90, percentage: 90, grade: "A+" }
        ],
        "Unit Tests": [
            { subject: "Physics", fullMarks: 50, obtained: 42, percentage: 84, grade: "A-" },
            { subject: "Chemistry", fullMarks: 50, obtained: 38, percentage: 76, grade: "B+" },
            { subject: "Biology", fullMarks: 50, obtained: 45, percentage: 90, grade: "A+" },
            { subject: "Mathematics", fullMarks: 50, obtained: 43, percentage: 86, grade: "A" },
            { subject: "English", fullMarks: 50, obtained: 41, percentage: 82, grade: "A-" },
            { subject: "Nepali", fullMarks: 50, obtained: 44, percentage: 88, grade: "A" }
        ]
    },
    "2026": {
        "Mid Term Exam": [
            { subject: "Physics", fullMarks: 100, obtained: 90, percentage: 90, grade: "A+" },
            { subject: "Chemistry", fullMarks: 100, obtained: 85, percentage: 85, grade: "A" },
            { subject: "Biology", fullMarks: 100, obtained: 94, percentage: 94, grade: "A+" },
            { subject: "Mathematics", fullMarks: 100, obtained: 89, percentage: 89, grade: "A" },
            { subject: "English", fullMarks: 100, obtained: 87, percentage: 87, grade: "A" },
            { subject: "Nepali", fullMarks: 100, obtained: 92, percentage: 92, grade: "A+" }
        ],
        "Final Term Exam": [
            { subject: "Physics", fullMarks: 100, obtained: 88, percentage: 88, grade: "A" },
            { subject: "Chemistry", fullMarks: 100, obtained: 82, percentage: 82, grade: "A-" },
            { subject: "Biology", fullMarks: 100, obtained: 95, percentage: 95, grade: "A+" },
            { subject: "Mathematics", fullMarks: 100, obtained: 91, percentage: 91, grade: "A+" },
            { subject: "English", fullMarks: 100, obtained: 86, percentage: 86, grade: "A" },
            { subject: "Nepali", fullMarks: 100, obtained: 93, percentage: 93, grade: "A+" }
        ],
        "Unit Tests": [
            { subject: "Physics", fullMarks: 50, obtained: 44, percentage: 88, grade: "A" },
            { subject: "Chemistry", fullMarks: 50, obtained: 40, percentage: 80, grade: "A-" },
            { subject: "Biology", fullMarks: 50, obtained: 46, percentage: 92, grade: "A+" },
            { subject: "Mathematics", fullMarks: 50, obtained: 45, percentage: 90, grade: "A+" },
            { subject: "English", fullMarks: 50, obtained: 43, percentage: 86, grade: "A" },
            { subject: "Nepali", fullMarks: 50, obtained: 45, percentage: 90, grade: "A+" }
        ]
    }
};

const sampleLeaveData = [
    { fromDate: '2025-08-01', toDate: '2025-08-03', type: 'Sick Leave', reason: 'Fever and cold', status: 'Approved' },
    { fromDate: '2025-08-10', toDate: '2025-08-10', type: 'Personal Leave', reason: 'Family function', status: 'Approved' },
    { fromDate: '2025-08-15', toDate: '2025-08-16', type: 'Emergency Leave', reason: 'Medical emergency', status: 'Pending' }
];

const sampleSyllabus = {
    "Physics": {
        title: "Physics - Grade 11",
        chapters: [
            { name: "Chapter 1: Mechanics", description: "Motion, forces, energy, and momentum" },
            { name: "Chapter 2: Thermodynamics", description: "Heat, temperature, and energy transfer" },
            { name: "Chapter 3: Waves", description: "Wave motion, sound, and light" },
            { name: "Chapter 4: Electricity", description: "Electric charges, current, and circuits" },
            { name: "Chapter 5: Modern Physics", description: "Quantum mechanics and relativity" }
        ]
    },
    "Chemistry": {
        title: "Chemistry - Grade 11",
        chapters: [
            { name: "Chapter 1: Atomic Structure", description: "Atoms, molecules, and chemical bonding" },
            { name: "Chapter 2: Chemical Reactions", description: "Reaction types, stoichiometry, and kinetics" },
            { name: "Chapter 3: Organic Chemistry", description: "Hydrocarbons and functional groups" },
            { name: "Chapter 4: Analytical Chemistry", description: "Qualitative and quantitative analysis" },
            { name: "Chapter 5: Physical Chemistry", description: "Thermodynamics and electrochemistry" }
        ]
    },
    "Biology": {
        title: "Biology - Grade 11",
        chapters: [
            { name: "Chapter 1: Cell Biology", description: "Cell structure, function, and division" },
            { name: "Chapter 2: Genetics", description: "Inheritance, DNA, and genetic engineering" },
            { name: "Chapter 3: Ecology", description: "Ecosystems, populations, and biodiversity" },
            { name: "Chapter 4: Human Physiology", description: "Body systems and homeostasis" },
            { name: "Chapter 5: Evolution", description: "Natural selection and speciation" }
        ]
    },
    "Mathematics": {
        title: "Mathematics - Grade 11",
        chapters: [
            { name: "Chapter 1: Algebra", description: "Polynomials, equations, and inequalities" },
            { name: "Chapter 2: Trigonometry", description: "Trigonometric functions and identities" },
            { name: "Chapter 3: Calculus", description: "Limits, derivatives, and integrals" },
            { name: "Chapter 4: Geometry", description: "Coordinate geometry and vectors" },
            { name: "Chapter 5: Statistics", description: "Data analysis and probability" }
        ]
    },
    "English": {
        title: "English - Grade 11",
        chapters: [
            { name: "Unit 1: Literature", description: "Poetry, prose, and drama analysis" },
            { name: "Unit 2: Grammar", description: "Advanced grammar and sentence structure" },
            { name: "Unit 3: Writing", description: "Essay writing and creative writing" },
            { name: "Unit 4: Communication", description: "Public speaking and presentation skills" },
            { name: "Unit 5: Research", description: "Academic writing and research methods" }
        ]
    },
    "Nepali": {
        title: "Nepali - Grade 11",
        chapters: [
            { name: "Unit 1: Nepali Literature", description: "Classical and modern Nepali literature" },
            { name: "Unit 2: Grammar", description: "Nepali grammar and sentence structure" },
            { name: "Unit 3: Writing", description: "Essay writing in Nepali" },
            { name: "Unit 4: Poetry", description: "Nepali poetry and literary devices" },
            { name: "Unit 5: Culture", description: "Nepali culture, history, and traditions" }
        ]
    }
};

// Initialize the application
function initializeApp() {
    setupEventListeners();
    showRoleSelection();
}

// Setup event listeners
function setupEventListeners() {
    // Role selection
    document.querySelectorAll('.btn-role-select').forEach(btn => {
        btn.addEventListener('click', handleRoleSelection);
    });
    
    // Back to role selection
    const backBtn = document.getElementById('backToRoleBtn');
    if (backBtn) {
        backBtn.addEventListener('click', showRoleSelection);
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Hamburger menu
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleSidebar);
    }
    
    // Calendar navigation
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    if (prevMonth) prevMonth.addEventListener('click', () => navigateMonth(-1));
    if (nextMonth) nextMonth.addEventListener('click', () => navigateMonth(1));
    
    // Profile editing
    setupProfileEditing();
    
    // Leave application
    setupLeaveApplication();
    
    // Exam results
    setupExamResults();
    
    // Attendance filters
    setupAttendanceFilters();
}

// Handle role selection
function handleRoleSelection(e) {
    const role = e.target.closest('.role-card').dataset.role;
    currentRole = role;
    updateLoginForm(role);
    showLoginSection();
}

// Show role selection
function showRoleSelection() {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById('roleSelectionSection').classList.add('active');
    isLoggedIn = false;
}

// Show login section
function showLoginSection() {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById('loginSection').classList.add('active');
}

// Update login form based on role
function updateLoginForm(role) {
    const loginTitle = document.getElementById('loginTitle');
    const demoInfo = document.getElementById('demoInfo');
    
    if (role === 'student') {
        loginTitle.textContent = 'Student Portal Login';
        demoInfo.textContent = 'Demo: prajun.kansakar@uniglobe.edu / student123';
    } else {
        loginTitle.textContent = 'Administrator Portal Login';
        demoInfo.textContent = 'Demo: admin@uniglobe.edu / admin123';
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (currentRole === 'student' && email === 'prajun.kansakar@uniglobe.edu' && password === 'student123') {
            currentUser = {
            name: 'Prajun Ratna Kansakar',
                email: email,
            role: 'student',
            id: 'UGSS2025001',
            grade: 'Grade 11 - Science',
            section: 'Section A',
            phone: '+977-9841234567',
            dob: 'March 15, 2008',
            gender: 'Male',
            address: 'Kamladi, Kathmandu, Nepal',
            enrollment: 'April 15, 2025',
            parent: 'Ratna Kansakar',
            parentContact: '+977-9851234567'
        };
        isLoggedIn = true;
            showDashboard();
        showNotification('Login successful!', 'success');
    } else if (currentRole === 'admin' && email === 'admin@uniglobe.edu' && password === 'admin123') {
            currentUser = {
            name: 'Administrator',
                email: email,
                role: 'admin'
            };
        isLoggedIn = true;
        showDashboard();
        showNotification('Login successful!', 'success');
        } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

// Show dashboard
function showDashboard() {
    if (!isLoggedIn) {
        showNotification('Please login first!', 'error');
        return;
    }
    
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById('dashboardSection').classList.add('active');
    
    document.getElementById('userName').textContent = currentUser.name;
    loadDashboardData();
    showSection('dashboard');
}

// Load dashboard data
function loadDashboardData() {
    renderCalendar();
    renderTeachers();
    renderNotices();
    renderAssignments();
    loadAttendance();
    loadEcaEvents();
    loadExamResults();
    loadSyllabus();
    loadLeaveData();
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    
    if (!isLoggedIn) {
        showNotification('Please login first!', 'error');
        return;
    }
    
    const section = e.target.closest('.nav-link').dataset.section;
    showSection(section);
}

// Show section
function showSection(sectionName) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    // Handle dashboard section specially
    let targetSection;
    if (sectionName === 'dashboard') {
        targetSection = document.getElementById('dashboard');
    } else {
        targetSection = document.getElementById(`${sectionName}Section`);
    }
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Handle logout
function handleLogout() {
    currentUser = null;
    currentRole = null;
    isLoggedIn = false;
    showRoleSelection();
    showNotification('Logged out successfully!', 'info');
}

// Render calendar
function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonth = document.querySelector('.calendar-header h3');
    
    if (!calendarDays || !currentMonth) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    currentMonth.textContent = `${getMonthName(month)} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    let calendarHTML = '';
    
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const isCurrentMonth = date.getMonth() === month;
        const isToday = date.toDateString() === new Date().toDateString();
        const isSaturday = date.getDay() === 6; // Saturday = 6
        
        let dayClass = 'calendar-day';
        if (!isCurrentMonth) dayClass += ' other-month';
        if (isToday) dayClass += ' today';
        if (isSaturday) dayClass += ' holiday';
        
        calendarHTML += `<div class="${dayClass}">${date.getDate()}</div>`;
    }
    
    calendarDays.innerHTML = calendarHTML;
}

// Get month name
function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

// Navigate month
function navigateMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

// Render teachers
function renderTeachers() {
    const teachersList = document.getElementById('teachersList');
    if (!teachersList) return;
    
    let teachersHTML = '';
    
    sampleTeachers.forEach(teacher => {
        teachersHTML += `
            <div class="teacher-item">
                <div class="teacher-avatar">${teacher.avatar}</div>
                <div class="teacher-info">
                    <h4>${teacher.name}</h4>
                    <p>${teacher.subject}</p>
                </div>
            </div>
        `;
    });
    
    teachersList.innerHTML = teachersHTML;
}

// Render notices
function renderNotices() {
    const noticesList = document.getElementById('noticesList');
    if (!noticesList) return;
    
    let noticesHTML = '';
    
    sampleNotices.forEach(notice => {
        noticesHTML += `
            <div class="notice-item">
                <h4>${notice.title}</h4>
                <p>${notice.content}</p>
                <div class="notice-date">${formatDate(notice.date)}</div>
            </div>
        `;
    });
    
    noticesList.innerHTML = noticesHTML;
}

// Render assignments
function renderAssignments() {
    const assignmentsList = document.getElementById('assignmentsList');
    if (!assignmentsList) return;
    
    let assignmentsHTML = '';
    
    sampleAssignments.slice(0, 3).forEach(assignment => {
        assignmentsHTML += `
            <div class="assignment-item">
                <h4>${assignment.title}</h4>
                <p>${assignment.subject} - Due: ${formatDate(assignment.dueDate)}</p>
                <span class="assignment-status ${assignment.status}">${assignment.status}</span>
            </div>
        `;
    });
    
    assignmentsList.innerHTML = assignmentsHTML;
}

// Load attendance
function loadAttendance() {
    updateAttendanceSummary();
    renderAttendanceTable();
}

// Update attendance summary
function updateAttendanceSummary() {
    const total = sampleAttendance.length;
    const present = sampleAttendance.filter(a => a.status === 'present').length;
    const absent = sampleAttendance.filter(a => a.status === 'absent').length;
    const late = sampleAttendance.filter(a => a.status === 'late').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    const overallPercentage = document.getElementById('overallPercentage');
    const presentCount = document.getElementById('presentCount');
    const absentCount = document.getElementById('absentCount');
    const lateCount = document.getElementById('lateCount');
    
    if (overallPercentage) overallPercentage.textContent = `${percentage}%`;
    if (presentCount) presentCount.textContent = present;
    if (absentCount) absentCount.textContent = absent;
    if (lateCount) lateCount.textContent = late;
}

// Render attendance table
function renderAttendanceTable() {
    const tableBody = document.getElementById('attendanceTableBody');
    if (!tableBody) return;
    
    let tableHTML = '';
    
    sampleAttendance.forEach(record => {
        const statusClass = `status-${record.status}`;
        tableHTML += `
            <tr>
                <td>${formatDate(record.date)}</td>
                <td>${record.subject}</td>
                <td><span class="${statusClass}">${record.status}</span></td>
                <td>${record.remarks || '-'}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Load ECA events
function loadEcaEvents() {
    const ecaTableBody = document.getElementById('ecaTableBody');
    if (!ecaTableBody) return;
    
    let tableHTML = '';
    
    sampleEcaEvents.forEach(event => {
        tableHTML += `
            <tr>
                <td>${event.title}</td>
                <td>${formatDate(event.date)}</td>
                <td>${event.type}</td>
                <td><span class="status-approved">${event.status}</span></td>
                <td>${event.achievement}</td>
            </tr>
        `;
    });
    
    ecaTableBody.innerHTML = tableHTML;
}

// Load exam results
function loadExamResults() {
    const examTableBody = document.getElementById('examTableBody');
    if (!examTableBody) return;
    
    // Default to current year, term 2
    const currentYear = '2025';
    const currentTerm = 'Term 2';
    const examData = sampleExamResults[currentYear][currentTerm];
    
    renderExamTable(examData);
    updateGPADisplay(examData);
}

// Render exam table
function renderExamTable(data) {
    const tableBody = document.getElementById('examTableBody');
    if (!tableBody) return;
    
    let tableHTML = '';
    
    data.forEach(exam => {
        tableHTML += `
            <tr>
                <td>${exam.subject}</td>
                <td>${exam.fullMarks}</td>
                <td>${exam.obtained}</td>
                <td>${exam.percentage}%</td>
                <td>${exam.grade}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Update GPA display
function updateGPADisplay(data) {
    const totalPercentage = data.reduce((sum, exam) => sum + exam.percentage, 0);
    const averagePercentage = totalPercentage / data.length;
    const gpa = (averagePercentage / 100) * 4;
    
    const currentGPAElement = document.getElementById('currentGPA');
    if (currentGPAElement) {
        currentGPAElement.textContent = gpa.toFixed(2);
    }
}

// Setup profile editing
function setupProfileEditing() {
    const editProfileBtn = document.querySelector('.btn-edit-profile');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', toggleProfileEdit);
    }
}

// Toggle profile editing
function toggleProfileEdit() {
    const detailGroups = document.querySelectorAll('.detail-group');
    const editBtn = document.querySelector('.btn-edit-profile');
    
    detailGroups.forEach(group => {
        const span = group.querySelector('span');
        const input = group.querySelector('input');
        
        if (span && !input) {
            // Create input field
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = span.textContent;
            inputField.className = 'edit-input';
            group.appendChild(inputField);
            span.style.display = 'none';
        } else if (span && input) {
            // Save changes
            span.textContent = input.value;
            input.remove();
            span.style.display = 'inline';
        }
    });
    
    if (editBtn.textContent.includes('Edit')) {
        editBtn.innerHTML = '<i class="fas fa-save"></i> Save Profile';
    } else {
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        showNotification('Profile updated successfully!', 'success');
    }
}

// Setup leave application
function setupLeaveApplication() {
    const addLeaveBtn = document.querySelector('.btn-add-leave');
    if (addLeaveBtn) {
        addLeaveBtn.addEventListener('click', showLeaveModal);
    }
    
    // Leave form submission
    const leaveForm = document.getElementById('leaveForm');
    if (leaveForm) {
        leaveForm.addEventListener('submit', handleLeaveSubmission);
    }
    
    // Modal close buttons
    const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-cancel');
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', hideModals);
    });
}

// Show leave modal
function showLeaveModal() {
    const leaveModal = document.getElementById('leaveModal');
    if (leaveModal) {
        leaveModal.style.display = 'block';
    }
}

// Handle leave submission
function handleLeaveSubmission(e) {
    e.preventDefault();
    
    const leaveType = document.getElementById('leaveType').value;
    const fromDate = document.getElementById('leaveFromDate').value;
    const toDate = document.getElementById('leaveToDate').value;
    const reason = document.getElementById('leaveReason').value;
    
    if (leaveType && fromDate && toDate && reason) {
        // Add new leave application to sample data
        const newLeave = {
            fromDate: fromDate,
            toDate: toDate,
            type: leaveType,
            reason: reason,
            status: 'Pending'
        };
        
        sampleLeaveData.push(newLeave);
        
        // Reload leave data
        loadLeaveData();
        
        hideModals();
        showNotification('Leave application submitted successfully!', 'success');
        
        // Reset form
        e.target.reset();
    } else {
        showNotification('Please fill all required fields!', 'error');
    }
}

// Hide modals
function hideModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Setup exam results
function setupExamResults() {
    const loadExamBtn = document.getElementById('loadExamResults');
    if (loadExamBtn) {
        loadExamBtn.addEventListener('click', loadExamResultsBySelection);
    }
}

// Load exam results by selection
function loadExamResultsBySelection() {
    const examSelect = document.getElementById('examSelect');
    if (examSelect) {
        const selectedExam = examSelect.value;
        let examData = [];
        
        // Find the exam data from the sample data
        for (const year in sampleExamResults) {
            for (const examType in sampleExamResults[year]) {
                if (examType === selectedExam) {
                    examData = sampleExamResults[year][examType];
                    break;
                }
            }
            if (examData.length > 0) break;
        }
        
        if (examData.length > 0) {
            renderExamTable(examData);
            updateGPADisplay(examData);
            showNotification(`Loaded ${selectedExam} results`, 'success');
        }
    }
}

// Load syllabus
function loadSyllabus() {
    const syllabusContainer = document.getElementById('syllabusContainer');
    if (syllabusContainer) {
        let syllabusHTML = '';
        
        for (const subject in sampleSyllabus) {
            const subjectData = sampleSyllabus[subject];
            syllabusHTML += `
                <div class="syllabus-subject">
                    <h3>${subjectData.title}</h3>
                    <div class="syllabus-chapters">
            `;
            
            subjectData.chapters.forEach(chapter => {
                syllabusHTML += `
                    <div class="chapter-item">
                        <h4>${chapter.name}</h4>
                        <p>${chapter.description}</p>
                    </div>
                `;
            });
            
            syllabusHTML += `
                    </div>
                </div>
            `;
        }
        
        syllabusContainer.innerHTML = syllabusHTML;
    }
}

// Load leave data
function loadLeaveData() {
    const leaveTableBody = document.getElementById('leaveTableBody');
    if (leaveTableBody) {
        let leaveHTML = '';
        
        sampleLeaveData.forEach(leave => {
            const statusClass = leave.status === 'Approved' ? 'status-approved' : 'status-pending';
            leaveHTML += `
                <tr>
                    <td>${formatDate(leave.fromDate)}</td>
                    <td>${formatDate(leave.toDate)}</td>
                    <td>${leave.type}</td>
                    <td>${leave.reason}</td>
                    <td><span class="${statusClass}">${leave.status}</span></td>
                </tr>
            `;
        });
        
        leaveTableBody.innerHTML = leaveHTML;
    }
}

// Setup attendance filters
function setupAttendanceFilters() {
    const filterBtn = document.getElementById('filterAttendance');
    if (filterBtn) {
        filterBtn.addEventListener('click', filterAttendance);
    }
}

// Filter attendance
function filterAttendance() {
    const subjectFilter = document.getElementById('attendanceSubjectFilter');
    const statusFilter = document.getElementById('attendanceStatusFilter');
    
    let filteredData = sampleAttendance;
    
    if (subjectFilter && subjectFilter.value) {
        filteredData = filteredData.filter(record => record.subject === subjectFilter.value);
    }
    
    if (statusFilter && statusFilter.value) {
        filteredData = filteredData.filter(record => record.status === statusFilter.value);
    }
    
    renderFilteredAttendance(filteredData);
}

// Render filtered attendance
function renderFilteredAttendance(data) {
    const tableBody = document.getElementById('attendanceTableBody');
    if (!tableBody) return;
    
    let tableHTML = '';
    
    data.forEach(record => {
        const statusClass = `status-${record.status}`;
        tableHTML += `
            <tr>
                <td>${formatDate(record.date)}</td>
            <td>${record.subject}</td>
                <td><span class="${statusClass}">${record.status}</span></td>
            <td>${record.remarks || '-'}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp); 