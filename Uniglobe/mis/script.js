// Global variables
let currentUser = null;
let currentRole = null;
let currentDate = new Date();
let events = [];
let attendanceData = [];
let marksheetData = [];
let studentsData = [];

// Sample data for demonstration
const sampleEvents = [
    {
        id: 1,
        title: 'Mid-term Exam',
        description: 'CS101 Mid-term examination',
        start_date: '2024-03-15',
        end_date: '2024-03-15',
        event_type: 'exam',
        location: 'Room 101'
    },
    {
        id: 2,
        title: 'Project Submission',
        description: 'Programming project deadline',
        start_date: '2024-03-20',
        end_date: '2024-03-20',
        event_type: 'assignment',
        location: 'Online'
    },
    {
        id: 3,
        title: 'Semester Break',
        description: 'Spring semester break',
        start_date: '2024-04-01',
        end_date: '2024-04-07',
        event_type: 'holiday',
        location: ''
    }
];

const sampleAttendance = [
    { date: '2024-03-01', subject: 'CS101', status: 'present', remarks: '' },
    { date: '2024-03-01', subject: 'CS102', status: 'present', remarks: '' },
    { date: '2024-03-02', subject: 'CS101', status: 'absent', remarks: 'Sick leave' },
    { date: '2024-03-02', subject: 'CS102', status: 'late', remarks: 'Traffic' },
    { date: '2024-03-03', subject: 'CS101', status: 'present', remarks: '' },
    { date: '2024-03-03', subject: 'CS102', status: 'present', remarks: '' },
    { date: '2024-03-04', subject: 'CS201', status: 'present', remarks: '' },
    { date: '2024-03-04', subject: 'CS202', status: 'present', remarks: '' },
    { date: '2024-03-05', subject: 'CS201', status: 'present', remarks: '' },
    { date: '2024-03-05', subject: 'CS202', status: 'absent', remarks: 'Personal emergency' }
];

const sampleMarksheet = [
    {
        subject_code: 'CS101',
        subject_name: 'Introduction to Computer Science',
        credits: 3,
        internal: 85,
        external: 78,
        total: 81.5,
        grade: 'A',
        gpa: 3.7
    },
    {
        subject_code: 'CS102',
        subject_name: 'Programming Fundamentals',
        credits: 4,
        internal: 92,
        external: 88,
        total: 90,
        grade: 'A',
        gpa: 4.0
    },
    {
        subject_code: 'CS201',
        subject_name: 'Data Structures',
        credits: 4,
        internal: 78,
        external: 82,
        total: 80,
        grade: 'B+',
        gpa: 3.3
    },
    {
        subject_code: 'CS202',
        subject_name: 'Object Oriented Programming',
        credits: 4,
        internal: 88,
        external: 85,
        total: 86.5,
        grade: 'A-',
        gpa: 3.7
    },
    {
        subject_code: 'MATH101',
        subject_name: 'Calculus I',
        credits: 3,
        internal: 75,
        external: 80,
        total: 77.5,
        grade: 'B',
        gpa: 3.0
    },
    {
        subject_code: 'ENG101',
        subject_name: 'English Composition',
        credits: 3,
        internal: 90,
        external: 85,
        total: 87.5,
        grade: 'A-',
        gpa: 3.7
    }
];

// Sample students data for admin panel
const sampleStudents = [
    {
        id: 1,
        student_id: 'UG2024001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@uniglobe.edu',
        program: 'BSc Computer Science',
        semester: 2,
        status: 'active',
        phone: '+977-9841234567',
        enrollment_date: '2024-01-15'
    },
    {
        id: 2,
        student_id: 'UG2024002',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@uniglobe.edu',
        program: 'BSc Information Technology',
        semester: 1,
        status: 'active',
        phone: '+977-9841234568',
        enrollment_date: '2024-01-20'
    },
    {
        id: 3,
        student_id: 'UG2024003',
        first_name: 'Mike',
        last_name: 'Johnson',
        email: 'mike.johnson@uniglobe.edu',
        program: 'BSc Software Engineering',
        semester: 3,
        status: 'active',
        phone: '+977-9841234569',
        enrollment_date: '2023-09-10'
    },
    {
        id: 4,
        student_id: 'UG2024004',
        first_name: 'Sarah',
        last_name: 'Williams',
        email: 'sarah.williams@uniglobe.edu',
        program: 'BSc Computer Science',
        semester: 2,
        status: 'inactive',
        phone: '+977-9841234570',
        enrollment_date: '2024-01-25'
    },
    {
        id: 5,
        student_id: 'UG2024005',
        first_name: 'David',
        last_name: 'Brown',
        email: 'david.brown@uniglobe.edu',
        program: 'BSc Information Technology',
        semester: 1,
        status: 'active',
        phone: '+977-9841234571',
        enrollment_date: '2024-02-01'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    events = [...sampleEvents];
    attendanceData = [...sampleAttendance];
    marksheetData = [...sampleMarksheet];
    studentsData = [...sampleStudents];
    
    // Set up event listeners
    setupEventListeners();
    
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token && userRole) {
        currentUser = JSON.parse(localStorage.getItem('user'));
        currentRole = userRole;
        
        if (userRole === 'admin') {
            showAdminDashboard();
        } else {
            showDashboard();
        }
    } else {
        // Start with role selection
        document.getElementById('roleSelectionSection').classList.add('active');
        document.getElementById('loginSection').classList.remove('active');
        document.getElementById('dashboardSection').classList.remove('active');
    }
}

function setupEventListeners() {
    // Role selection
    document.querySelectorAll('.btn-role-select').forEach(btn => {
        btn.addEventListener('click', handleRoleSelection);
    });
    
    // Back to role selection
    document.getElementById('backToRoleBtn').addEventListener('click', showRoleSelection);
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => navigateMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => navigateMonth(1));
    
    // Calendar event modal
    document.querySelector('.btn-add-event').addEventListener('click', showEventModal);
    document.querySelector('.modal-close').addEventListener('click', hideEventModal);
    document.querySelector('.modal-cancel').addEventListener('click', hideEventModal);
    document.getElementById('eventForm').addEventListener('submit', handleAddEvent);
    
    // Attendance filter
    document.getElementById('filterAttendance').addEventListener('click', filterAttendance);
    
    // Semester selector
    document.getElementById('semesterSelect').addEventListener('change', loadMarksheet);
    
    // Students filter
    document.getElementById('filterStudents').addEventListener('click', filterStudents);
    
    // Theme switcher
    document.getElementById('themeToggle').addEventListener('click', toggleThemeDropdown);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', changeTheme);
    });
    
    // Close theme dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const themeSwitcher = document.querySelector('.theme-switcher');
        const dropdown = document.getElementById('themeDropdown');
        
        if (!themeSwitcher.contains(event.target) && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });
}

function handleRoleSelection(e) {
    const role = e.currentTarget.closest('.role-card').dataset.role;
    currentRole = role;
    
    // Update login form based on role
    updateLoginForm(role);
    
    // Show login section
    showLoginSection();
}

function showRoleSelection() {
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('roleSelectionSection').classList.add('active');
}

function showLoginSection() {
    document.getElementById('roleSelectionSection').classList.remove('active');
    document.getElementById('loginSection').classList.add('active');
}

function updateLoginForm(role) {
    const loginTitle = document.getElementById('loginTitle');
    const demoInfo = document.getElementById('demoInfo');
    
    if (role === 'student') {
        loginTitle.textContent = 'Student Management Information System';
        demoInfo.textContent = 'Demo: john.doe@uniglobe.edu / student123';
    } else if (role === 'admin') {
        loginTitle.textContent = 'Administrator Management Information System';
        demoInfo.textContent = 'Demo: admin@uniglobe.edu / admin123';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (currentRole === 'student') {
        // Student authentication
        if (email === 'john.doe@uniglobe.edu' && password === 'student123') {
            currentUser = {
                id: 1,
                student_id: 'UG2024001',
                first_name: 'John',
                last_name: 'Doe',
                email: email,
                program: 'BSc Computer Science',
                semester: 2,
                role: 'student'
            };
            
            // Store user data
            localStorage.setItem('authToken', 'demo-token');
            localStorage.setItem('user', JSON.stringify(currentUser));
            localStorage.setItem('userRole', 'student');
            
            showDashboard();
        } else {
            alert('Invalid student credentials. Please use the demo credentials provided.');
        }
    } else if (currentRole === 'admin') {
        // Admin authentication
        if (email === 'admin@uniglobe.edu' && password === 'admin123') {
            currentUser = {
                id: 1,
                admin_id: 'ADMIN001',
                first_name: 'Admin',
                last_name: 'User',
                email: email,
                role: 'admin'
            };
            
            // Store user data
            localStorage.setItem('authToken', 'demo-token');
            localStorage.setItem('user', JSON.stringify(currentUser));
            localStorage.setItem('userRole', 'admin');
            
            showAdminDashboard();
        } else {
            alert('Invalid admin credentials. Please use the demo credentials provided.');
        }
    }
}

function showDashboard() {
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('dashboardSection').classList.add('active');
    
    // Update user name and role
    document.getElementById('userName').textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    document.querySelector('.user-info small').textContent = 'Student';
    
    // Hide admin-only sidebar items
    updateSidebarVisibility();
    
    // Load initial data
    loadProfile();
    loadCalendar();
    loadAttendance();
    loadMarksheet();
    
    // Update event button visibility for student role
    updateEventButtonVisibility();
}

function showAdminDashboard() {
    // For now, show the same dashboard but with admin-specific content
    // In a full implementation, this would show admin-specific features
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('dashboardSection').classList.add('active');
    
    // Update user name and role
    document.getElementById('userName').textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    document.querySelector('.user-info small').textContent = 'Administrator';
    
    // Show admin-only sidebar items
    updateSidebarVisibility();
    
    // Load initial data (same as student for demo)
    loadProfile();
    loadCalendar();
    loadAttendance();
    // loadMarksheet(); // Removed for admin panel
    loadStudents();
    
    // Update event button visibility for admin role
    updateEventButtonVisibility();
    
    // Show admin notification only when coming from login (not on page load)
    const isFromLogin = !document.getElementById('roleSelectionSection').classList.contains('active');
    if (isFromLogin) {
        showNotification('Welcome to Admin Dashboard! You can manage students, attendance, and marksheets.', 'info');
    }
}

function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    currentUser = null;
    currentRole = null;
    
    document.getElementById('dashboardSection').classList.remove('active');
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('roleSelectionSection').classList.add('active');
    
    // Clear form
    document.getElementById('loginForm').reset();
}

function handleNavigation(e) {
    const section = e.currentTarget.dataset.section;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show selected section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${section}Section`).classList.add('active');
}

// Profile Management
function loadProfile() {
    if (currentRole === 'admin') {
        // Load admin profile
        loadAdminProfile();
    } else {
        // Load student profile (default)
        loadStudentProfile();
    }
}

function loadAdminProfile() {
    // Update profile section header
    const profileHeader = document.querySelector('#profileSection .section-header h2');
    if (profileHeader) {
        profileHeader.innerHTML = '<i class="fas fa-user-shield"></i> Administrator Profile';
    }
    
    // Update profile information
    document.getElementById('studentName').textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    document.getElementById('studentId').textContent = currentUser.admin_id;
    document.getElementById('studentProgram').textContent = 'System Administrator';
    document.getElementById('studentSemester').textContent = 'N/A';
    
    // Update contact details
    document.getElementById('studentEmail').textContent = currentUser.email;
    document.getElementById('studentPhone').textContent = '+977-9841234567';
    document.getElementById('studentDOB').textContent = 'January 1, 1985';
    document.getElementById('studentGender').textContent = 'Male';
    document.getElementById('studentAddress').textContent = 'Uniglobe College, Kathmandu, Nepal';
    document.getElementById('studentEnrollment').textContent = 'January 1, 2020';
}

function loadStudentProfile() {
    // Update profile section header
    const profileHeader = document.querySelector('#profileSection .section-header h2');
    if (profileHeader) {
        profileHeader.innerHTML = '<i class="fas fa-user"></i> Student Profile';
    }
    
    // Update profile information with student data
    document.getElementById('studentName').textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    document.getElementById('studentId').textContent = currentUser.student_id;
    document.getElementById('studentProgram').textContent = currentUser.program;
    document.getElementById('studentSemester').textContent = `Semester ${currentUser.semester}`;
    
    // Update contact details
    document.getElementById('studentEmail').textContent = currentUser.email;
    document.getElementById('studentPhone').textContent = '+977-9841234567';
    document.getElementById('studentDOB').textContent = 'May 15, 2000';
    document.getElementById('studentGender').textContent = 'Male';
    document.getElementById('studentAddress').textContent = 'Kathmandu, Nepal';
    document.getElementById('studentEnrollment').textContent = 'January 15, 2024';
}

// Sidebar visibility management
function updateSidebarVisibility() {
    const adminOnlyItems = document.querySelectorAll('.admin-only');
    const marksheetLink = document.querySelector('.nav-link[data-section="marksheets"]');
    
    adminOnlyItems.forEach(item => {
        if (currentRole === 'admin') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Hide marksheet link for admin
    if (currentRole === 'admin') {
        marksheetLink.style.display = 'none';
    } else {
        marksheetLink.style.display = 'flex';
    }
}

// Students Management
function loadStudents() {
    updateStudentsSummary();
    renderStudentsTable(studentsData);
}

function updateStudentsSummary() {
    const totalStudents = studentsData.length;
    const activeStudents = studentsData.filter(student => student.status === 'active').length;
    
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('activeStudents').textContent = activeStudents;
}

function renderStudentsTable(students) {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.student_id}</td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.program}</td>
            <td>Semester ${student.semester}</td>
            <td><span class="student-status ${student.status}">${student.status}</span></td>
            <td class="student-actions">
                <button class="btn-action btn-view" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-edit" title="Edit Student">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" title="Delete Student">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function filterStudents() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const programFilter = document.getElementById('programFilter').value;
    const semesterFilter = document.getElementById('semesterFilter').value;
    
    let filteredStudents = [...studentsData];
    
    // Filter by search term
    if (searchTerm) {
        filteredStudents = filteredStudents.filter(student => 
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.student_id.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by program
    if (programFilter) {
        filteredStudents = filteredStudents.filter(student => 
            student.program === programFilter
        );
    }
    
    // Filter by semester
    if (semesterFilter) {
        filteredStudents = filteredStudents.filter(student => 
            student.semester.toString() === semesterFilter
        );
    }
    
    renderStudentsTable(filteredStudents);
}

// Calendar Management
function loadCalendar() {
    renderCalendar();
    renderEvents();
    updateEventButtonVisibility();
}

function updateEventButtonVisibility() {
    const addEventBtn = document.querySelector('.btn-add-event');
    if (addEventBtn) {
        if (currentRole === 'admin') {
            addEventBtn.style.display = 'inline-block';
            addEventBtn.title = 'Add Event (Admin Only)';
        } else {
            addEventBtn.style.display = 'none';
        }
    }
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day and number of days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Clear calendar
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if today
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Check if has events
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (hasEventsOnDate(dateString)) {
            dayElement.classList.add('has-event');
        }
        
        calendarDays.appendChild(dayElement);
    }
}

function hasEventsOnDate(date) {
    return events.some(event => {
        const startDate = new Date(event.start_date);
        const endDate = event.end_date ? new Date(event.end_date) : startDate;
        const checkDate = new Date(date);
        
        return checkDate >= startDate && checkDate <= endDate;
    });
}

function renderEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    
    // Sort events by date
    const sortedEvents = events.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    
    // Show next 5 events
    const upcomingEvents = sortedEvents.filter(event => new Date(event.start_date) >= new Date()).slice(0, 5);
    
    upcomingEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        
        const eventDate = new Date(event.start_date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        eventElement.innerHTML = `
            <h5>${event.title}</h5>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Type:</strong> ${event.event_type}</p>
            ${event.description ? `<p>${event.description}</p>` : ''}
            ${event.location ? `<p><strong>Location:</strong> ${event.location}</p>` : ''}
        `;
        
        eventsList.appendChild(eventElement);
    });
}

function navigateMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function showEventModal() {
    // Check if user is admin
    if (currentRole !== 'admin') {
        showNotification('Only administrators can add events to the calendar.', 'error');
        return;
    }
    
    document.getElementById('eventModal').style.display = 'block';
    document.getElementById('eventStartDate').value = new Date().toISOString().split('T')[0];
}

function hideEventModal() {
    document.getElementById('eventModal').style.display = 'none';
    document.getElementById('eventForm').reset();
}

function handleAddEvent(e) {
    e.preventDefault();
    
    const newEvent = {
        id: events.length + 1,
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        start_date: document.getElementById('eventStartDate').value,
        end_date: document.getElementById('eventEndDate').value || document.getElementById('eventStartDate').value,
        event_type: document.getElementById('eventType').value,
        location: document.getElementById('eventLocation').value
    };
    
    events.push(newEvent);
    renderCalendar();
    renderEvents();
    hideEventModal();
}

// Attendance Management
function loadAttendance() {
    updateAttendanceSummary();
    renderAttendanceTable();
}

function updateAttendanceSummary() {
    const totalClasses = attendanceData.length;
    const presentCount = attendanceData.filter(a => a.status === 'present').length;
    const absentCount = attendanceData.filter(a => a.status === 'absent').length;
    const lateCount = attendanceData.filter(a => a.status === 'late').length;
    const percentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;
    
    document.getElementById('overallPercentage').textContent = `${percentage}%`;
    document.getElementById('presentCount').textContent = presentCount;
    document.getElementById('absentCount').textContent = absentCount;
    document.getElementById('lateCount').textContent = lateCount;
}

function renderAttendanceTable() {
    const tableBody = document.getElementById('attendanceTableBody');
    tableBody.innerHTML = '';
    
    attendanceData.forEach(record => {
        const row = document.createElement('tr');
        const date = new Date(record.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${record.subject}</td>
            <td>${record.remarks || '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function filterAttendance() {
    const subject = document.getElementById('subjectFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let filteredData = [...attendanceData];
    
    if (subject) {
        filteredData = filteredData.filter(record => record.subject === subject);
    }
    
    if (startDate && endDate) {
        filteredData = filteredData.filter(record => {
            const recordDate = new Date(record.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return recordDate >= start && recordDate <= end;
        });
    }
    
    renderFilteredAttendance(filteredData);
}

function renderFilteredAttendance(data) {
    const tableBody = document.getElementById('attendanceTableBody');
    tableBody.innerHTML = '';
    
    data.forEach(record => {
        const row = document.createElement('tr');
        const date = new Date(record.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${record.subject}</td>
            <td>${record.remarks || '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Marksheet Management
function loadMarksheet() {
    const semester = document.getElementById('semesterSelect').value;
    
    // Filter marksheet data by semester (in real app, this would be from server)
    const semesterData = marksheetData.filter(subject => {
        // For demo, show all data
        return true;
    });
    
    renderMarksheet(semesterData);
    updateGPADisplay(semesterData);
}

function renderMarksheet(data) {
    const tableBody = document.getElementById('marksheetTableBody');
    tableBody.innerHTML = '';
    
    data.forEach(subject => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${subject.subject_code}</td>
            <td>${subject.subject_name}</td>
            <td>${subject.credits}</td>
            <td>${subject.internal}</td>
            <td>${subject.external}</td>
            <td>${subject.total}</td>
            <td class="grade-${subject.grade.toLowerCase()}">${subject.grade}</td>
            <td>${subject.gpa}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function updateGPADisplay(data) {
    if (data.length === 0) return;
    
    const totalCredits = data.reduce((sum, subject) => sum + subject.credits, 0);
    const weightedGPA = data.reduce((sum, subject) => sum + (subject.gpa * subject.credits), 0);
    const averageGPA = weightedGPA / totalCredits;
    
    document.getElementById('currentGPA').textContent = averageGPA.toFixed(2);
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
        hideEventModal();
    }
});

// Theme Management
function toggleThemeDropdown() {
    const dropdown = document.getElementById('themeDropdown');
    dropdown.classList.toggle('show');
}

function changeTheme(e) {
    const theme = e.currentTarget.dataset.theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
    
    // Close dropdown
    document.getElementById('themeDropdown').classList.remove('show');
    
    // Show notification
    showNotification(`Theme changed to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`, 'success');
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
}); 