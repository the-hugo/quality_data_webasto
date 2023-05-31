import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  serial_num: { type: String, unique: true },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
  product_id: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;