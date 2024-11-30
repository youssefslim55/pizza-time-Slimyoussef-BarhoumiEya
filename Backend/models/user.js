const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique: true, //comme en sql cad l user mawjoud mara bark
        minlength: 3,
        maxlength: 30,
    },
    password :{
        type: String,
        required:true,
        minlength:6,
    },    
});
//middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur*
userSchema.pre('save',async function (next) {
    if (!this.isModified('password'))return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
    
});

//methode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
    
};

const User = mongoose.model('User',userSchema);
//rajaali l class user
module.exports = User;