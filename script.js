// Chức năng đăng nhập
const loginForm = document.getElementById('login-form');
const attendanceSection = document.getElementById('attendance-section');
const loginSection = document.getElementById('login-section');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form submit mặc định
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra tài khoản và mật khẩu
    if (username === 'kidstars' && password === 'kidstars145@') {
        loginSection.style.display = 'none'; // Ẩn phần đăng nhập
        attendanceSection.style.display = 'block'; // Hiển thị phần điểm danh
    } else {
        alert('Sai tài khoản hoặc mật khẩu.'); // Thông báo sai tài khoản hoặc mật khẩu
    }
});

// Lưu điểm danh học sinh
const attendanceForm = document.getElementById('attendance-form');
const attendanceHistory = document.getElementById('attendance-history');

attendanceForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form submit mặc định
    const studentName = document.getElementById('student-name').value;

    // Gửi dữ liệu học sinh đến Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbw_zHakO4Xb-4g_sXBS15lbfsly90DpBW-xtmWwKKV5t0k8cQXaZ27Feu-k5jN7-7SY/exec', {
        method: 'POST',
        body: JSON.stringify({studentName: studentName}),
        headers: {
            'Content-Type': 'application/json' // Định dạng dữ liệu gửi đi
        }
    })
    .then(response => response.json())
    .then(data => {
        // Thêm học sinh vào danh sách lịch sử điểm danh
        const listItem = document.createElement('li');
        listItem.textContent = `${studentName} - Đã lưu lúc ${new Date().toLocaleString()}`;
        attendanceHistory.appendChild(listItem); // Hiển thị lên màn hình
    })
    .catch((error) => {
        console.error('Lỗi:', error); // Xử lý lỗi
    });
});

// Tìm kiếm điểm danh
const searchButton = document.getElementById('search-attendance');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Gửi yêu cầu tìm kiếm lịch sử điểm danh theo ngày
    fetch('https://script.google.com/macros/s/AKfycbw_zHakO4Xb-4g_sXBS15lbfsly90DpBW-xtmWwKKV5t0k8cQXaZ27Feu-k5jN7-7SY/exec', {
        method: 'POST',
        body: JSON.stringify({startDate: startDate, endDate: endDate}),
        headers: {
            'Content-Type': 'application/json' // Định dạng dữ liệu gửi đi
        }
    })
    .then(response => response.json())
    .then(results => {
        searchResults.innerHTML = ''; // Xóa kết quả tìm kiếm cũ
        results.forEach(function(result) {
            const listItem = document.createElement('li');
            listItem.textContent = result; // Hiển thị kết quả tìm kiếm
            searchResults.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error('Lỗi:', error); // Xử lý lỗi nếu có
    });
});
