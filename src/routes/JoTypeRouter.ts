import { Router } from 'express';
import { 
  addJoType, 
  getJoTypes, 
  updateJoType, 
  removeJoType 
} from '../controllers/JoTypeController';

const router = Router();

// Define routes
router.post('/job-types', addJoType);  // Route to create a JoType
router.get('/job-types', getJoTypes);  // Route to fetch JoTypes
router.put('/job-types/:id', updateJoType);  // Route to update a JoType
router.delete('/job-types/:id', removeJoType);  // Route to remove a JoType

export default router;
