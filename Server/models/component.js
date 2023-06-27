import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  component_num: String,
  serial_num: { type: String, ref: 'Product' },
  image: String,
  level: Number,
  subComponents: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }], default: [] },
});


const Component = mongoose.model('Component', componentSchema);

export default Component;
