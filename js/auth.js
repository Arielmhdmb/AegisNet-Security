function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Cek akun default atau akun yang baru didaftarkan di localStorage
  const savedUser = localStorage.getItem("registeredUser");
  const savedPass = localStorage.getItem("registeredPass");

  if ((username === "admin" && password === "admin123") || (username === savedUser && password === savedPass && username !== "")) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Username atau password salah! (Coba: admin / admin123)";
    errorMsg.classList.remove("hidden");
  }
}

function handleRegister(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (fullname === "" || username === "" || password === "") {
    alert("Semua field wajib diisi!");
    return;
  }

  localStorage.setItem("registeredUser", username);
  localStorage.setItem("registeredPass", password);
  alert("Registrasi berhasil! Silakan login menggunakan akun Anda.");
  window.location.href = "login.html";
}

function handleLogout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
