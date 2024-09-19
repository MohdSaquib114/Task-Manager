import { Schema, model, Document } from 'mongoose';


interface ITask extends Document {
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
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
});


export const Task = model<ITask>('Task', taskSchema);
