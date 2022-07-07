import { logout as logoutSvc } from './services/auth.js';

const menuButton = document.getElementById( 'menu-button' );
const logout = document.getElementById( 'logout' );

menuButton.addEventListener( 'click', function() {
    const navItems= document.querySelectorAll('.nav-items')
    for(let i =0;i<navItems.length; i++){
        navItems[i].classList.toggle('d-sm-none');
    }
});

logout.addEventListener( 'click', function() {
    logoutSvc();
    window.location = '/login.html';
});

