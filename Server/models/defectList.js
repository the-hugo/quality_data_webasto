import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
  error: { type: String, required: true },
  work_center: { type: String },
  error_code: { type: String },
  product_id: { type: String },
  group: { type: String },
  defect_type: { type: String },
  quality_issues: { type: String },
  need_location: { type: String },
});

const DefectList = mongoose.model('DefectList', defectSchema);

export default DefectList;