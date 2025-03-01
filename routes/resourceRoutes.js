import express from 'express';
import { getResources, getResourceById, createResource, updateResource } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', getResources);       // ✅ सभी Resources लाने के लिए
router.get('/:id', getResourceById); // ✅ एक Resource लाने के लिए
router.post('/create', createResource); // ✅ नया Resource बनाने के लिए
router.put('/:id', updateResource);  // ✅ Existing Resource Update करने के लिए

export default router;
