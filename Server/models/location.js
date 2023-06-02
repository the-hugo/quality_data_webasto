import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  error_num: { type: Number, ref: 'Defect' },

    x: Number,
    y: Number,
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
