import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
      return res.status(500).json({ error: 'Server error, please try again later' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

