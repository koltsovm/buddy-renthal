// TODO: Implement auth endpoints
import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../utils/error';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

router.post('/login', async (req, res) => {
  try {
    const data = validateRequest(loginSchema, req.body);
    // TODO: Implement actual authentication logic
    res.json({ data: { user: { id: '1', email: data.email } }, error: null });
  } catch (error) {
    res.status(400).json({ data: null, error: (error as Error).message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const data = validateRequest(registerSchema, req.body);
    // TODO: Implement actual registration logic
    res.json({ data: { user: { id: '1', email: data.email } }, error: null });
  } catch (error) {
    res.status(400).json({ data: null, error: (error as Error).message });
  }
});

router.get('/me', async (req, res) => {
  try {
    // TODO: Implement session validation
    res.json({ data: { user: { id: '1', email: 'test@example.com' } }, error: null });
  } catch (error) {
    res.status(401).json({ data: null, error: 'Unauthorized' });
  }
});

export default router;