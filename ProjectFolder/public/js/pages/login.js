import {
    login
} from '../services/auth.js';

const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const emailAlert = document.getElementById('email-alert');
const passwordAlert = document.getElementById('password-alert');


const validateEmail = () => {
    let errors = null;
    const email = userEmail.value;
    const validEmail = /^[A-Za-z][A-Za-z0-9\._\-]+@gmail\.com$/;

    if( email === '' ) {
        errors = {
            ...errors,
            required: 'Email cannot be empty'
        };
        emailAlert.textContent = errors.required;
    } else 
    if( !validEmail.test( email ) ) {
        errors = {
            ...errors,
            pattern: 'Not a valid email'
        };
        emailAlert.textContent = errors.pattern;
    } else {
        emailAlert.textContent = '';
    }
    return errors;
};


const validatePassword = () => {
    let errors = null;
    const password = userPassword.value;
    const charList = /[%$#@\*&\^\(\)!;'"]/;

    if( password.length < 8 ) {
        errors = {
            ...errors,
            minlength: 'Password must have at least 8 characters'
        };
        passwordAlert.textContent = errors.minlength;
    }else
    if( !charList.test( password ) ) {
        errors = {
            ...errors,
            specialChars: 'Password must have at least 1 special character'
        };
        passwordAlert.textContent = errors.specialChars;
    } else {
        passwordAlert.textContent = '';
    }
    return errors;
};

async function onLoginFormSubmit( event ) {
    event.preventDefault();

    const email = userEmail.value;
    const password = userPassword.value;

    const credentials = {
        email,
        password
    };

    const errors = {
        email: validateEmail(),
        password: validatePassword(),
    };

    if(!errors.email && !errors.password) {
    try {
        const data = await login( credentials );
        console.log(data);
        window.location = '/calender.html';
    } catch( error ) {
        console.log( error.message );
    }
}
}

document.addEventListener( 'DOMContentLoaded', function() {
    document.querySelector( '#login-form' ).addEventListener( 'submit', onLoginFormSubmit );
});