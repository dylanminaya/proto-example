import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

interface ErrorResponse {
  error: string;
  message: string;
}

// Middleware
app.use(morgan('combined')); // Logging
app.use(cors()); // Enable CORS for React Native
app.use(express.json()); // Parse JSON bodies

// Health check endpoint
app.get('/health', (req: Request, res: Response<HealthResponse>) => {
  res.json({
    status: 'ok',
    message: 'Auth proxy server is running',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use('*', (req: Request, res: Response<ErrorResponse>) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth proxy server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth/*`);
  console.log(`🔗 gRPC backend: ${process.env.GRPC_SERVER_URL || 'localhost:50051'}`);
});
