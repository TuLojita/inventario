import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "@/interfaces";

const productSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
}, {
  timestamps: true
});

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;