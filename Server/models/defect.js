import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
  error_num: {
    type: Number,
    required: true,
  },
  serial_num: { type: String, ref: 'Product' },
  personal_id: { type: String, ref: 'User' },
  description: String,
  action_type: String,
  category: String,
  error_type: String, // Added error_type field
  error_code: String, // Added error_code field
  date: { type: Date, default: Date.now }, // Added date field with default value of current date
  spots: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }], default: [] },
  component: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }], default: [] },
});

// Pre-save middleware to increment error_num by 1
defectSchema.pre('save', async function (next) {
  const defect = this;
  if (defect.isNew) {
    try {
      const count = await Defect.countDocuments({});
      defect.error_num = count + 1;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
const Defect = mongoose.model('Defect', defectSchema);

export default Defect;


