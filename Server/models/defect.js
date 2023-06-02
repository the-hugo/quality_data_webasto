import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
  error_num: Number,
  serial_num: { type: String, ref: 'Product' },
  personal_id: { type: String, ref: 'User' },
  description: String,
  action_type: String,
  category: String,
  spots: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }], default: [] },
  component: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }], default: [] },
});

const Defect = mongoose.model('Defect', defectSchema);

export default Defect;


