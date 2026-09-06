import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, 'dist');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Qatar Domains',
    timestamp: new Date().toISOString(),
  });
});

// Serve static assets from the compiled Vite dist directory
app.use(express.static(distPath));
app.use(express.static('dist'));

// SPA wildcard fallback: Send dist/index.html for any client-side routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Direct fallback if dist folder is in cwd
    res.sendFile('index.html', { root: distPath });
  }
});

// General middleware fallback
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Qatar Domains] Server running on port ${PORT}`);
});


