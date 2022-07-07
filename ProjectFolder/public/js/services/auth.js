import Config from '../config.js';

const login = async ( credentials ) => {
    const response = await fetch( `${Config.baseUrl}/api/auth/login`, {
        method: 'post',
        body: JSON.stringify( credentials ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if( !response.ok ) {
        const responseText = await response.text();
        throw new Error( responseText || 'Some error occured' );
    }

    const data = await response.json();

    // store token and other info in localStorage
    localStorage.setItem( Config.TOKEN_KEY, data.token );
    localStorage.setItem( Config.EMAIL_KEY, data.email );
    localStorage.setItem( Config.NAME_KEY, data.name );

    return data;
};

const logout = () => {
    localStorage.removeItem( Config.TOKEN_KEY );
    localStorage.removeItem( Config.EMAIL_KEY );
    localStorage.removeItem( Config.NAME_KEY );
};

const getToken = () => localStorage.getItem( Config.TOKEN_KEY );

export {
    login,
    logout,
    getToken
}

