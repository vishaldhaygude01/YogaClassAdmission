const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();


        res.status(201).json({ userId: newUser._id, token });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        res.status(200).json({ userId: user._id, token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
