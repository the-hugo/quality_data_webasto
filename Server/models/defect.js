import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
  error_num: Number,
  serial_num: { type: String, ref: 'Product' },
  personal_id: { type: String, ref: 'User' },
  description: String,
  action_type: String,
  category: String,
  spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  component: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
});

const Defect = mongoose.model('Defect', defectSchema);

export default Defect;
