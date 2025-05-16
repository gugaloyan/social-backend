import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';
import friendRoutes from './routes/friend-request-routes';
import friendshipRoutes from './routes/friendship-routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import helmet from 'helmet';


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friend-requests', friendRoutes);
app.use('/api/friends', friendshipRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('HI!');
});


export default app;
