const User = require('../models/user');
const jwt = require('jsonwebtoken');
// Inscription d'un nouvel utilisateur
exports.registerUser = async (req, res) =>{
const {username , password } = req. body;

try{
const newUser = new User({ username, password });
await newUser.save();
res.status(201).json({ message: 'Utilisateur créé avec succès'});
}catch (error){
res.status(400).json({ message: error.message });
}
};

//Connexion d'un utilisateur existant
exports.loginUser = async (req, res) => {
const { username, password } = req.body;
try {
const user = await User.findOne({ username });
if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé '});

const isMatch = await user.matchPassword(password) ;
if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect'});
// Génération d'un token JWT(voir annexe jwt)
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
{expiresin: '30d' });
res.json({token });
 } catch (error) {
res.status(500).json({message: error.message });
 }
}