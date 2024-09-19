import { Router, Request, Response } from "express";
import { authenticate } from "../../middleware/authentication";
import { validate } from "../../middleware/validation";
import { taskSchema } from "../../schemas/taskSchema";
import { Task } from "../../modal/task";

const route = Router()

route.post('/', authenticate, validate(taskSchema), async (req:Request, res:Response) => {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      return res.status(200).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  route.get('/', authenticate, async (req, res) => {
    try {
      const tasks = await Task.find();
      return res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  route.put('/:id', authenticate, validate(taskSchema), async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  route.delete('/:id', authenticate, async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  

export default route