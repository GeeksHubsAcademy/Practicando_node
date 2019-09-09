const UserModel = require( '../models/User.js' );
const jwt = require( 'jsonwebtoken' )
const isAuthenticated = async ( req, res, next ) => {
    const token = req.headers.authorization;
    try {
        jwt.verify( token, 'mimamamemimamucho' )
        const user = await UserModel.findOne( { tokens: token } ) // busca al usuario
        if ( !user ) throw new Error( 'No estas autorizado' ); //en caso de no haber token en la bd, envia un error al frontend;
        req.user=user;//guardamos la información del user en el objeto req
        next();
    } catch ( error ) {
        console.error( error )
        if ( error.message === 'jwt expired' ) UserModel.findOneAndUpdate( { tokens: token }, { $pull: { tokens: token } } ).exec() //quita el token de la bd cuando expira
        res.status( 401 ).send( error.message )
    }

}
module.exports = isAuthenticated
