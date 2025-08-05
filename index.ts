import express from 'express';
import path from 'path';
import { chunkPrompt } from './promptProcessor';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));

app.post('/process', (req, res) => {
  const { prompt } = req.body as { prompt?: string };
  if (typeof prompt !== 'string') {
    res.status(400).json({ error: 'Prompt must be provided as a string' });
    return;
  }

  const chunks = chunkPrompt(prompt);
  res.json({ chunks });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
