import express from 'express'
import { connectDB } from './lib/prisma.js';
import { authRouter } from './modules/auth/auth.routes.js';

const app = express();
app.use(express.json());
const port = 3000;

app.use(authRouter);
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => console.log(`server is running on port ${port}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();