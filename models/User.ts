import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "@/interfaces";

const userSchema = new Schema({
  identity: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} no es un rol válido',
      default: 'user',
      required: true
    },
  },
}, {
  timestamps: true
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;