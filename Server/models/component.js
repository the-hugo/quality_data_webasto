import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  component_num: String,
  serial_num: { type: String, ref: 'Product' },
  image: String,
  component: String,
  level: Number,
  subComponents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
});

const Component = mongoose.model('Component', componentSchema);

export default Component;
