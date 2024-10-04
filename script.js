// Login functionality
const loginForm = document.getElementById('login-form');
const attendanceSection = document.getElementById('attendance-section');
const loginSection = document.getElementById('login-section');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'kidstars' && password === 'kidstars145@') {
        loginSection.style.display = 'none';
        attendanceSection.style.display = 'block';
    } else {
        alert('Invalid login credentials.');
    }
});

// Save attendance
const attendanceForm = document.getElementById('attendance-form');
const attendanceHistory = document.getElementById('attendance-history');

attendanceForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const studentName = document.getElementById('student-name').value;

    google.script.run
        .withSuccessHandler(function(response) {
            const listItem = document.createElement('li');
            listItem.textContent = `${studentName} - Saved at ${new Date().toLocaleString()}`;
            attendanceHistory.appendChild(listItem);
        })
        .saveAttendance(studentName);
});

// Search attendance
const searchButton = document.getElementById('search-attendance');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    google.script.run
        .withSuccessHandler(function(results) {
            searchResults.innerHTML = '';
            results.forEach(function(result) {
                const listItem = document.createElement('li');
                listItem.textContent = result;
                searchResults.appendChild(listItem);
            });
        })
        .searchAttendance(startDate, endDate);
});
