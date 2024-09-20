
import { User } from './modal/user'; 
declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
