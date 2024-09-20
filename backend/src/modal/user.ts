import { Schema, model, Document, Types } from 'mongoose';


interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  tasks: Types.ObjectId[];
}


const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }] 
});


export const User = model<IUser>('User', userSchema);
