# Uniglobe College MIS - Student Portal

A comprehensive Management Information System (MIS) for Uniglobe College students, built with HTML, CSS, and JavaScript.

## Features

### 🎓 Student Profile Management
- Complete student information display
- Personal details, academic information, and contact details
- Profile image management
- Edit profile functionality

### 📅 Academic Calendar
- Interactive monthly calendar view
- Event management (exams, assignments, holidays)
- Add new events with details
- Upcoming events display
- Calendar navigation (previous/next month)

### ✅ Attendance Tracking
- Overall attendance percentage
- Subject-wise attendance breakdown
- Present/Absent/Late status tracking
- Filter attendance by subject and date range
- Detailed attendance records with remarks

### 📊 Academic Performance (Marksheets)
- Semester-wise academic records
- Subject-wise marks breakdown
- Internal and external marks display
- Grade and GPA calculation
- Overall semester GPA display

## How to Use

### 1. Getting Started
1. Open `index.html` in your web browser
2. Use the demo credentials to login:
   - **Email:** john.doe@uniglobe.edu
   - **Password:** student123

### 2. Navigation
- Use the navigation menu at the top to switch between different sections:
  - **Profile:** View and edit student information
  - **Calendar:** Manage academic calendar and events
  - **Attendance:** Track attendance records
  - **Marksheets:** View academic performance

### 3. Profile Section
- View complete student information
- Click "Edit Profile" to modify details
- Profile image can be updated

### 4. Calendar Section
- Navigate through months using arrow buttons
- Click "Add Event" to create new calendar events
- Events are color-coded by type (exam, assignment, holiday)
- View upcoming events in the sidebar

### 5. Attendance Section
- View overall attendance statistics
- Filter attendance by:
  - Subject (CS101, CS102, CS201, CS202)
  - Date range
- Attendance status is color-coded:
  - 🟢 Present (Green)
  - 🔴 Absent (Red)
  - 🟡 Late (Yellow)

### 6. Marksheets Section
- Select semester to view academic records
- View detailed marks for each subject:
  - Internal marks
  - External marks
  - Total marks
  - Grade and GPA
- Overall semester GPA is displayed prominently

## Technical Details

### File Structure
```
uniglobe-college-mis/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

### Technologies Used
- **HTML5:** Semantic markup and structure
- **CSS3:** Modern styling with Flexbox and Grid
- **JavaScript (ES6+):** Interactive functionality
- **Font Awesome:** Icons
- **Local Storage:** Session management

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Responsive Design
The system is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Demo Data

The system includes sample data for demonstration:

### Sample Events
- Mid-term Exam (March 15, 2024)
- Project Submission (March 20, 2024)
- Semester Break (April 1-7, 2024)

### Sample Attendance
- 10 attendance records across different subjects
- Various status types (present, absent, late)
- Different dates and remarks

### Sample Marksheets
- 6 subjects with complete academic records
- Realistic grades and GPA calculations
- Multiple semesters support

## Customization

### Adding New Students
1. Modify the `handleLogin` function in `script.js`
2. Add new user credentials
3. Update profile information in HTML

### Adding New Subjects
1. Update the subject filter options in HTML
2. Add corresponding attendance and marksheet data
3. Modify the sample data arrays in `script.js`

### Styling Changes
- Modify `styles.css` for visual changes
- Color scheme can be updated in CSS variables
- Responsive breakpoints can be adjusted

## Security Notes

⚠️ **Important:** This is a demo system for educational purposes. In a production environment:

1. **Authentication:** Implement proper server-side authentication
2. **Data Storage:** Use a secure database instead of localStorage
3. **Input Validation:** Add proper input validation and sanitization
4. **HTTPS:** Use HTTPS for secure data transmission
5. **Session Management:** Implement proper session management

## Future Enhancements

Potential improvements for a production system:

1. **Backend Integration:** Connect to a real database
2. **Real-time Updates:** WebSocket integration for live updates
3. **File Upload:** Profile image upload functionality
4. **Notifications:** Push notifications for important events
5. **Mobile App:** Native mobile application
6. **Admin Panel:** Administrative interface for teachers
7. **Reports:** PDF generation for reports
8. **API Integration:** Integration with external systems

## Support

For technical support or questions about the system, please contact the development team.

---

**Developed for Uniglobe College**  
*Student Management Information System* 