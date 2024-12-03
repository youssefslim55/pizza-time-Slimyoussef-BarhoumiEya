
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, address, city, state, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





/*const User = require('../models/user');
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
}*/