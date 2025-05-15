
import dotenv from 'dotenv';
import app from './app';
import { initTables } from './config/db';

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  try {
    await initTables();
    app.listen(port, () => {
      console.log(` The server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
})();
