const form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    let hasError = false;

    // Name validation
    if (name.length < 2) {
        document.getElementById("name-error").innerHTML = "Name should be at least 2 letters.";
        hasError = true;
    } else {
        document.getElementById("name-error").innerHTML = "";
    }

    // Email validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        document.getElementById("email-error").innerHTML = "Invalid email address.";
        hasError = true;
    } else {
        document.getElementById("email-error").innerHTML = "";
    }

    // check if email is already registered 
    const userData = JSON.parse(localStorage.getItem("user")) || [];
    let isEmailExist = false;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            isEmailExist = true;
            break;
        }
    }
    if (isEmailExist) {
        document.getElementById("email-error").innerHTML = "Email already registered.";
        hasError = true;
    } else {
        document.getElementById("email-error").innerHTML = "";
    }


    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById("password-error").innerHTML = "Password should have at least 1 capital letter, 1 small letter, 1 number, 1 special character and at least 8 characters.";
        hasError = true;
    } else if (password === name || password === email) {
        document.getElementById("password-error").innerHTML = "password cannot be the same as name or email.";
        hasError = true;
    } else {
        document.getElementById("password-error").innerHTML = "";
    }
    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById("confirm-password-error").innerHTML = "Passwords do not match.";
        hasError = true;
    } else {
        document.getElementById("confirm-password-error").innerHTML = "";
    }

    // If there are no errors, submit the form
    if (!hasError) {
        // Collect all the form data
        const formData = new FormData(form);
        // Store the data in the browser's local storage or a cookie
        localStorage.setItem("user", JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }));
        // Redirect the user to the login page
        window.location.href = '/index.html';
    }

});


// incomplete 