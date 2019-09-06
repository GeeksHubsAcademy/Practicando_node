const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const userSchema = new mongoose.Schema( {
    usuario: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
} );
userSchema.pre( 'save', function ( next ) {
    const user = this;
    if ( user.isModified( 'password' ) ) {
        bcrypt.hash( user.password, 10 )
            .then( hash => {
                user.password = hash;
                return next();
            } ).catch( err => next( err ) )
    } else next();
} )
const UserModel = mongoose.model( 'user', userSchema );
module.exports = UserModel;
