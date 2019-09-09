// function pedirAlaAPI  ()  {
//     fetch( 'http://localhost:3000' ) //A J A X
//         .then( res => res.text() )
//         .then( res => {
//             document.querySelector( '.res' ).innerHTML = res
//         } )
//         .catch( error => console.log( error ) )
// }
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
            console.log( res );

            if ( typeof res === 'string' ) {
                document.querySelector( '.loginMsg' ).classList.add('alert','alert-danger')
                return  document.querySelector( '.loginMsg' ).innerHTML = res
            }
             document.querySelector( '.loginMsg' ).classList.add('alert','alert-success');
             document.querySelector( '.loginMsg' ).innerHTML = `Bienvenido ${res.user.usuario}.`
             localStorage.setItem('token',res.token)
        } )
}

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
    () => contenido.innerHTML = router[ location.pathname ] )
