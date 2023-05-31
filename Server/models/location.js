import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  error_num: { type: Number, ref: 'Defect' },
  name: String,
  description: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
