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
    fetch( 'http://localhost:3000/signup', {
            method: 'POST',
            headers: { //req.headers
                'content-type': 'application/json',
            },
            body: JSON.stringify( { //req.body
                usuario: event.target.usuario.value,
                password: event.target.password.value,
            } ),
        } )
        .then( res => res.json() )
        .then( console.log )
}

const Registro = `<form onsubmit="registro(event)">
                    <input type="text" name="usuario">
                    <input type="password" name="password" id="">
                    <button type="submit">Registrarse</button>
</form>`
const Home = `<div>Home</div>`
const contenido = document.querySelector( '.contenido' );
const router = {
    '/': Home,
    '/registro': Registro
}
const onNavClick = ruta => {
    history.pushState( {},
        ruta + ' | nodePracicas',
        location.origin + ruta )
        contenido.innerHTML=router[ruta]
}
