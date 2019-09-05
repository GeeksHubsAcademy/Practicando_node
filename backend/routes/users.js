const router=require('express').Router();
const UserModel = require( '../models/User' );

router.get( '/', ( req, res ) => { //READ
    UserModel.find( {} ).then( users => res.send( users ) ).catch( console.log )
} );
router.post( '/signup', async ( req, res ) => { //CREATE
    try {
        console.log(req.body);
        const user = await new UserModel( req.body ).save()
        res.send( user );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Ha habido un problema al registrar el usuario' );
    }
} )
router.patch( '/:id', async ( req, res ) => {
    try {
        const user = await UserModel.findByIdAndUpdate( req.params.id, req.body, { new: true, useFindAndModify: false } )
        res.send( user )
    } catch ( error ) {
        console.log( error );
        res.send( 'Ha habido un error al tratar de actualizar el usuario' )
    }
} )
router.delete( '/:id', async ( req, res ) => {
    try {
        const user = await UserModel.findByIdAndDelete( req.params.id )
        res.send( user )
    } catch ( error ) {
        console.log( error );
    }
} )
module.exports=router;