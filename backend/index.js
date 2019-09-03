const express = require( 'express' );
const app = express();

app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );
app.use(express.json()); //parsea de JSON el body de la petición 
app.get( '/',  ( req, res ) => {
    res.send('hola express')
})
app.post('/signup',(req,res)=>{
    console.log(req.headers)
    res.send(req.body); 
})
app.listen( 3000 ,()=>console.log('servidor levantado en el puerto 3000'))
