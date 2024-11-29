import dbConnect from '../../lib/mongodb';
import Team from '../../models/Team';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, details } = req.body;
    if (!name || !details) {
      return res.status(400).json({ error: 'Name and details are required' });
    }
    const team = await Team.create({ name, details });
    return res.status(201).json(team);
  } else if (req.method === 'GET') {
    const teams = await Team.find({});
    return res.status(200).json(teams);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID is required to delete a team' });
    }

    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.status(200).json({ message: 'Team deleted successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
