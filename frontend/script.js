const BASE_URL = "http://localhost:3000/api/v1";

// Signup
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });
        const data = await response.json();
        alert(data.message);
        if (data.success) {
            window.location.href = "login.html";
        }
    } catch (err) {
        alert("Error during signup");
        console.error(err);
    }
});

// Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Error during login");
        console.error(err);
    }
});

// Logout
document.getElementById("logout-button")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    window.location.href = "login.html";
});

// Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("username").textContent = user.name;
        document.getElementById("role").textContent = user.role;
    } else {
        alert("Unauthorized access");
        window.location.href = "login.html";
    }
}
