import express from 'express';
import { json } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});