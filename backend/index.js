const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const UserModel = require( './models/User' )
mongoose.connect( 'mongodb://localhost:27017/usuario', { useNewUrlParser: true, useCreateIndex: true } )
    .then( () => console.log( 'conexión con MongoDB establecida con éxito' ) )
    .catch( error => console.log( 'Error al conectar a MongoDB: ' + error ) )

app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

app.use( express.json() ); //parsea de JSON el body de la petición 
app.get( '/', ( req, res ) => { //READ
    UserModel.find( {} ).then( users => res.send( users ) ).catch( console.log )
} );
app.post( '/signup', async ( req, res ) => { //CREATE
    try {
        const user = await new UserModel( req.body ).save()
        res.send( user );
    } catch ( error ) {
        console.log( error );

        res.status( 500 ).send( 'Ha habido un problema al registrar el usuario' );
    }
} )
app.patch( '/:id', async ( req, res ) => {
    try {
        const user = await UserModel.findByIdAndUpdate( req.params.id, req.body, { new: true, useFindAndModify: false } )
        res.send( user )
    } catch ( error ) {
        console.log( error );
        res.send( 'Ha habido un error al tratar de actualizar el usuario' )
    }
} )
app.delete( '/:id', async ( req, res ) => {
    try {
        const user = await UserModel.findByIdAndDelete( req.params.id )
        res.send( user )
    } catch ( error ) {
        console.log( error );
    }
} )
app.listen( 3000, () => console.log( 'servidor levantado en el puerto 3000' ) )
