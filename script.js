// Chức năng đăng nhập
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
        alert('Sai tài khoản hoặc mật khẩu.');
    }
});

// Lưu điểm danh học sinh
const attendanceForm = document.getElementById('attendance-form');
const attendanceHistory = document.getElementById('attendance-history');

attendanceForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const studentName = document.getElementById('student-name').value;

    fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify({studentName: studentName}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const listItem = document.createElement('li');
        listItem.textContent = `${studentName} - Đã lưu lúc ${new Date().toLocaleString()}`;
        attendanceHistory.appendChild(listItem);
    })
    .catch((error) => {
        console.error('Lỗi:', error);
    });
});

// Tìm kiếm điểm danh
const searchButton = document.getElementById('search-attendance');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    fetch('https://script.google.com/macros/s/AKfycbzVUTqIpUo_u9Bheq62Hlod2IEpoad7wKKZS-vB5rxhTUvqb9b5FUKQ05S6Hjc45QNPSA/exec', {
        method: 'POST',
        body: JSON.stringify({startDate: startDate, endDate: endDate}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(results => {
        searchResults.innerHTML = '';
        results.forEach(function(result) {
            const listItem = document.createElement('li');
            listItem.textContent = result;
            searchResults.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error('Lỗi:', error);
    });
});
