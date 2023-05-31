import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  serial_num: String,
  image: String,
  component: String,
  level: Number,
  subComponents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
});

const Component = mongoose.model('Component', componentSchema);

export default Component;
