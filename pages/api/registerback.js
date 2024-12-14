import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await User.create({ username, password: hashedPassword });

      // Return the response
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: 'Method not allowed' });
  }
}

