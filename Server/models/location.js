import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  error_num: { type: Number, ref: 'Defect' },
  type: String,
  dropLocation: [Number] // Array of Numbers
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
