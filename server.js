import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Qatar Domains',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Serve static files from the dist directory if it exists
if (fs.existsSync(distPath)) {
  app.use(
    express.static(distPath, {
      maxAge: '1d',
      etag: true,
    })
  );
}

// SPA fallback: Send index.html for any unmatched requests
app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Qatar Domains - Initializing</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0B0F19; color: #fff;">
          <div style="text-align: center; max-width: 500px; padding: 2rem; border: 1px solid #334155; border-radius: 1rem; background: #1e293b;">
            <h2>Qatar Domains is Initializing</h2>
            <p style="color: #94a3b8;">The production build is being prepared. Please run <code>npm run build</code> or refresh the page in a few moments.</p>
          </div>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Qatar Domains] Server successfully running on port ${PORT}`);
});

