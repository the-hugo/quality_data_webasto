import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  coordinates: {
    x: Number,
    y: Number,
  },
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
