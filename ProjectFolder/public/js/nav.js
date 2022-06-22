const menuButton = document.getElementById( 'menu-button' );

menuButton.addEventListener( 'click', function() {
    // alert( 'Menu button was clicked' );
    const navItems= document.querySelectorAll('.nav-items')
    console.log(navItems);
    for(let i =0;i<navItems.length; i++){
        navItems[i].classList.toggle('d-sm-none');
    }
});