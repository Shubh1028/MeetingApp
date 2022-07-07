import { logout as logoutSvc } from './services/auth.js';
import Config from './config.js';


const menuButton = document.getElementById( 'menu-button' );
const logout = document.getElementById( 'logout' );
const nameLocal = document.getElementById('name-local')

menuButton.addEventListener( 'click', function() {
    const navItems= document.querySelectorAll('.nav-items')
    for(let i =0;i<navItems.length; i++){
        navItems[i].classList.toggle('d-sm-none');
    }
});

nameLocal.textContent = localStorage.getItem(Config.NAME_KEY)

logout.addEventListener( 'click', function() {
    logoutSvc();
    window.location = '/login.html';
});

