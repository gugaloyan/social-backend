import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';
import friendRoutes from './routes/friend-request-routes';
import friendshipRoutes from './routes/friendship-routes';


const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friend-requests', friendRoutes);
app.use('/api/friends', friendshipRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('HI !');
});


export default app;
