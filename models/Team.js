import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
