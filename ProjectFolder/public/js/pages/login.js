import {
    login
} from '../services/auth.js';

async function onLoginFormSubmit( event ) {
    event.preventDefault();

    const email = document.getElementById( 'email' ).value;
    const password = document.getElementById( 'password' ).value;

    const credentials = {
        email,
        password
    };

    try {
        const data = await login( credentials );
        window.location = '/calender.html';
    } catch( error ) {
        console.log( error.message );
    }
}

document.addEventListener( 'DOMContentLoaded', function() {
    document.querySelector( '#login-form' ).addEventListener( 'submit', onLoginFormSubmit );
});