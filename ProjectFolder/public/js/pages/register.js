import {
    register
} from '../services/auth.js';


const userName= document.getElementById('name');
const nameAlert = document.getElementById('name-alert');
const userEmail = document.getElementById('email');
const emailAlert = document.getElementById('email-alert');
const userPassword = document.getElementById('password');
const passwordAlert = document.getElementById('password-alert');
const userCpassword = document.getElementById('cpassword');
const cpasswordAlert = document.getElementById('cpassword-alert');
const submitBtn = document.getElementById('submit');



function validateName() {
  let errors = null;

  const name = userName.value.trim();
  if(name === '') {
    errors = {
        ...errors,
        required: 'Name Cannot Be Empty'
    }
    nameAlert.textContent = errors.required;
  } else {
    nameAlert.textContent = '';
  }
  return errors;
}



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
    const cpassword = userCpassword.value;
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

    if(cpassword !== password) {
        errors = {
            ...errors,
            notequal: 'Confirm Password should Be Same as Password'
        };
        cpasswordAlert.textContent = errors.notequal;
    }
    return errors;
};


async function onRegisterFormSubmit( event ) {
    event.preventDefault();

    const name = userName.value;
    const email = userEmail.value;
    const password = userPassword.value;
    const confirmPassword = userCpassword.value;

    const errors = {
        name: validateName(),
        email: validateEmail(),
        password: validatePassword(),
    };

    
    const details = {
        name,
        email,
        password,
        confirmPassword
    };

    if( !errors.name && !errors.email && !errors.password){
    try {
        await register( details );
        window.location = './login.html';
    } catch( error ) {
        console.log( error.message );
    }
}
}

document.addEventListener( 'DOMContentLoaded', function() {
    document.querySelector( '#register-form' ).addEventListener( 'submit', onRegisterFormSubmit );
});




