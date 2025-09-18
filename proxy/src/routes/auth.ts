import express, { Request, Response, Router } from 'express';
import { signIn } from '../grpc-client';

const router: Router = express.Router();

// Sign In endpoint
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        message: 'Both email and password fields are required'
      });
    }

    console.log(`Sign-in attempt for email: ${email}`);
    
    const response = await signIn({
      email,
      password
    });

    console.log('gRPC response:', JSON.stringify(response, null, 2));
    console.log('Tokens object:', response.tokens);
    console.log('Access token:', response.tokens?.accessToken);
    console.log('Refresh token:', response.tokens?.refreshToken);

    return res.json({
      success: true,
      tokens: {
        access_token: response.tokens?.accessToken,
        refresh_token: response.tokens?.refreshToken
      }
    });

  } catch (error: any) {
    console.error('Sign-in error:', error);
    return res.status(401).json({
      error: 'Authentication failed',
      message: error.details || 'Invalid credentials'
    });
  }
});

export default router;
