import { Router } from 'express';
import { addClient, getClient, updateClient, removeClient } from '../controllers/ClientController'

const router = Router();

router.post('/addClient',addClient)
router.post('/getClient',getClient)
router.post('/editClient',updateClient)
router.post('/removeClient',removeClient)


export default router;