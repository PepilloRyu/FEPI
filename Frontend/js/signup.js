const validate = (event) => {
    event.preventDefault()
    let ageInput = document.getElementById('age-input');
    let nameInput = document.getElementById('name-input');
    let emailInput = document.getElementById('email-input');
    let passwordInput = document.getElementById('password-input');

    let ageErrorMessage = document.getElementById('age-error-message');
    let nameErrorMessage = document.getElementById('name-error-message');
    let emailErrorMessage = document.getElementById('email-error-message');
    let passwordErrorMessage = document.getElementById('password-error-message');

    ageErrorMessage.textContent = '';
    nameErrorMessage.textContent = '';
    emailErrorMessage.textContent = '';
    passwordErrorMessage.textContent = '';

    if (!ageInput.value) {
        ageErrorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:var(--mg-danger); margin-right:6px;"></i> <span>Please enter your age.</span>';
        ageInput.style.border = '2px solid var(--mg-danger)';
        document.getElementById('age-privacy-div').innerHTML = '';
    }
    else {
        ageErrorMessage.innerHTML = '';
        ageInput.style.border = '';
    }

    if (!nameInput.value) {
        console.log("Entering Name if Block");
        nameErrorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:var(--mg-danger); margin-right:6px;"></i> <span>Please enter your Name.</span>';
        nameInput.style.border = '2px solid var(--mg-danger)';
    }
    else {
        console.log("Name Input is not empty");
        nameErrorMessage.innerHTML = '';
        nameInput.style.border = '';
    }

    if (!emailInput.value) {
        emailErrorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:var(--mg-danger); margin-right:6px;"></i> <span>Please enter your Email.</span>';
        emailInput.style.border = '2px solid var(--mg-danger)';
    }
    else {
        emailErrorMessage.innerHTML = '';
        emailInput.style.border = '';
    }

    if (!passwordInput.value) {
        passwordErrorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:var(--mg-danger); margin-right:6px;"></i> <span>Please enter your Password.</span>';
        passwordInput.style.border = '2px solid var(--mg-danger)';
    }
    else {
        passwordErrorMessage.innerHTML = '';
        passwordInput.style.border = '';
    }
    // RegisterUser(event);
}

const createAccountButtonAnimation = () => {
    document.getElementById("create-account-button").classList.toggle('clicked');
    setTimeout(() => document.getElementById("create-account-button").classList.toggle('clicked'), 300)

    document.getElementById('create-account-span').classList.toggle('hidden');
    document.getElementById('loading-balls-container').classList.toggle('hidden');
}

const loginButtonAnimation = () => {
    document.getElementById("login-button").classList.toggle('clicked');
    setTimeout(() => document.getElementById("login-button").classList.toggle('clicked'), 300)
    window.location.href = "loginpage.html";
}

