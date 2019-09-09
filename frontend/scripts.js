// function pedirAlaAPI  ()  {
//     fetch( 'http://localhost:3000' ) //A J A X
//         .then( res => res.text() )
//         .then( res => {
//             document.querySelector( '.res' ).innerHTML = res
//         } )
//         .catch( error => console.log( error ) )
// }
const header = document.querySelector( 'header' );

const registro = event => {
    event.preventDefault(); //evita que se refresque la página
    fetch( 'http://localhost:3000/user/signup', {
            method: 'POST',
            headers: { //req.headers
                'content-type': 'application/json',
            },
            body: JSON.stringify( { //req.body
                usuario: event.target.usuario.value,
                email: event.target.email.value,
                password: event.target.password.value,
            } ),
        } )
        .then( res => res.json() )
        .then( user => {
            event.target.usuario.value = "";
            event.target.password.value = "";
            contenido.innerHTML = `Bievenido ${user.usuario}`
        } )
}
const login = event => {
    event.preventDefault(); //evita que se refresque la página
    fetch( 'http://localhost:3000/user/login', {
            method: 'POST',
            headers: { //req.headers
                'content-type': 'application/json',
            },
            body: JSON.stringify( { //req.body
                usuario: event.target.usuario.value,
                password: event.target.password.value,
            } )
        } ).then( res => res.status === 200 ? res.json() : res.text() )
        .then( res => {
            const loginMsg = document.querySelector( '.loginMsg' ); // selecciono el nodo p
            if ( typeof res === 'string' ) {
                loginMsg.classList.add( 'alert', 'alert-danger' ); // añade clases de bootstrap para darle estilos
                return loginMsg.innerHTML = res //añade el mensaje de error proveniente del backend al DOM
            }
            loginMsg.classList.add( 'alert', 'alert-success' ); // añade clases de bootstrap para darle estilos
            loginMsg.innerHTML = `Bienvenido ${res.user.usuario}.` //añade al DOM mensaje de bienvenida al usuario
            localStorage.setItem( 'token', res.token ); //añade al localStorage el token del usuario
            localStorage.setItem( 'user', JSON.stringify( res.user ) ) //añade el objeto usuario al localStorage
            document.querySelector( 'header' ).innerHTML = loggedIn;
        } )
}
const notLoggedIn = `
            <span onclick="onNavClick('/')">Home</span>
            <span onclick="onNavClick('/registro')">Registro</span>
            <span onclick="onNavClick('/login')">Login</span>
`
const loggedIn = `
            <span onclick="onNavClick('/')">Home</span>
            <span onclick="onNavClick('/profile')">${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).usuario:''}</span>
            <span onclick="onNavClick('/logout')">Logout</span>
`
let Msg = ""
const Registro = `<form onsubmit="registro(event)"
                class="register">
                <h2>Darse de alta:</h2>
                    <input type="text" name="usuario">
                    <input type="email" name="email">
                    <input type="password" name="password" >
                    <button type="submit">Registrarse</button>
                    <p>${Msg}</p>
</form>`
const Login = `<form onsubmit="login(event)"
                class="register">
                <h2>Login:</h2>
                    <input type="text" name="usuario">
                    <input type="password" name="password" >
                    <button type="submit">Registrarse</button>
                    <p class="loginMsg"></p>
</form>`
const Home = `<div>Home</div>`
const contenido = document.querySelector( '.contenido' );
const router = {
    '/': Home,
    '/registro': Registro,
    '/login': Login
}
const onNavClick = ruta => {
    history.pushState( {},
        ruta + ' | nodePracicas',
        location.origin + ruta )
    contenido.innerHTML = router[ ruta ]
}
window.addEventListener( 'popstate',
    () => contenido.innerHTML = router[ location.pathname ] )
window.addEventListener( 'load',
    () => {
        contenido.innerHTML = router[ location.pathname ]
        localStorage.getItem( 'user' ) ? header.innerHTML=loggedIn:header.innerHTML=notLoggedIn;
    } )
