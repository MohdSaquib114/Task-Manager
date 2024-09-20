import { Schema, model, Document , Types} from 'mongoose';


interface ITask extends Document {
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  user: Types.ObjectId; 
}


const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  dueDate: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
});


export const Task = model<ITask>('Task', taskSchema);
