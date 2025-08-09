import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    rate: { type: Number, min: 0, max: 5, default: 0 },
    description: { type: String, default: '' },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    clothType: { type: String, enum: ['men', 'women', 'kids', 'unisex', 'other'], default: 'other' },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;