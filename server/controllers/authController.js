const { User } = require('../database/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'This email is already in use' });

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'Freelancer',
            emailVerified: 'incomplete'
        })
        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(201).json({ message: 'User has successfully registered', user, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


module.exports = {
    register,
    login,
}