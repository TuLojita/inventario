import mongoose, { Schema, model, Model } from "mongoose";
import { IEntry } from "@/interfaces";

const entrySchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    require: true,
  },
  products: [
    {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      },
    }
  ],
  bill: {
    type: String,
    require: true,
  },
}, {
  timestamps: true
});

const Entry: Model<IEntry> = mongoose.models.Entry || model('Entry', entrySchema);

export default Entry;