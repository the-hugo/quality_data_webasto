import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  serial_num: { type: String, unique: true },
  product_id: { type: String, ref: 'DefectList' },
  image: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
