import mongoose from 'mongoose';
const collabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['project', 'startup', 'hackathon', 'other'], default: 'project' },
  message: { type: String, required: true },
  github: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
const Collab = mongoose.model('Collab', collabSchema);

export default Collab;
