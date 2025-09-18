import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { SignInRequest, SignInResponse } from './generated/auth';

interface AuthServiceClient extends grpc.Client {
  SignIn(
    request: SignInRequest,
    callback: (error: grpc.ServiceError | null, response?: SignInResponse) => void
  ): grpc.ClientUnaryCall;
}

// Load the proto file
const PROTO_PATH = path.join(__dirname, '..', '..', 'backend_test_one', 'proto', 'auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Create gRPC client
// Adjust this URL to match your Docker container's gRPC endpoint
const GRPC_SERVER_URL = process.env.GRPC_SERVER_URL || 'localhost:50051';

const client: AuthServiceClient = new authProto.auth.AuthService(
  GRPC_SERVER_URL,
  grpc.credentials.createInsecure()
) as AuthServiceClient;

// Promisify gRPC calls for easier async/await usage
const promisifyCall = <TRequest, TResponse>(method: string) => {
  return (request: TRequest): Promise<TResponse> => {
    return new Promise((resolve, reject) => {
      (client as any)[method](request, (error: grpc.ServiceError | null, response?: TResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(response as TResponse);
        }
      });
    });
  };
};

// Export promisified methods
export const signIn = promisifyCall<SignInRequest, SignInResponse>('SignIn');
