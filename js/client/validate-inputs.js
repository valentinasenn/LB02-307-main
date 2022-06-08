// Selektoren für name, lastname, mobile, password

const form = document.getElementById('form');
const gender = document.getElementById('gender');
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('passwordRepeat');
const number = document.getElementById('number');
const message = document.getElementById('message');
const checkbox = document.getElementById('checkbox');
const button = document.getElementById('button');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-group success';
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });
    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    return input.value.length >= min && input.value.length <= max;
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validierung Vornamen
function checkSurname(input, min, max) {
    const regex = /^[a-z ,.'-]+$/i;
    if (regex.test(input.value.trim()) && checkLength(input, min, max)) {
        showSuccess(input);
    } else {
        showError(
            input,
            `${getFieldName(input)} should contain between ${min} and ${max} symbols`
        );
    }
}

// Validierung Nachname
function checkLastname(input, min, max) {
    const regex = /^[a-z ,.'-]+$/i;
    if (regex.test(input.value.trim()) && checkLength(input, min, max)) {
        showSuccess(input);
    } else {
        showError(
            input,
            `${getFieldName(input)} should contain between ${min} and ${max} symbols`
        );
    }
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check password is valid
function checkPassword(input, min, max) {
    const regex = /^(?=.*[A-Z])$/;
    if (checkLength(input, min, max)) {
        showSuccess(input);
    } else {
        showError(
            input,
            `${getFieldName(input)} should contain between ${min} and ${max} symbols`
        );
    }
}

// Validierung Übereinstimmung Passwörter
function matchPassword(input, repeatInput) {
    if (password.value === passwordRepeat.value) {
        showSuccess(input)
    } else {
        showError(repeatInput, 'Passwords don\'t match');
    }
}

// Validierung Telefonnummer
function checkTelefon(input) {
    const regex = /^\d{10}$/;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telephone Number is not valid');
    }
}

// Validierung Checkbox
function checkCheckbox(input) {
    if (input.checked) {
        showSuccess(input);
    } else {
        showError(input, 'AGB must be accepted.');
    }
}

if (document.getElementById("checkbox").checked) {
    showSuccess();
} else {
    showError('Telephone Number is not valid');
}

function validateForm(){
    checkSurname(name, 3, 15);
    checkLastname(lastname, 2, 50)
    checkEmail(email);
    checkPassword(password, 6, 10)
    matchPassword(password, repeatPassword);
    checkTelefon(number);
    checkCheckbox(checkbox);
}



// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});