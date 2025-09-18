# Auth Proxy Server (TypeScript)

A gRPC to REST proxy server written in TypeScript that converts HTTP requests from your React Native app to gRPC calls to your protobuf backend. Proto files are sourced from ../backend_test_one/proto/.

## 🚀 Quick Start

### Development (with TypeScript hot reload)
```bash
npm install
npm run dev
```

### Production Build
```bash
npm install
npm run build
npm start
```

## 📁 Project Structure

```
proxy/
├── src/
│   ├── generated/         # Auto-generated TypeScript types from proto
│   │   └── auth.ts        # Generated types from ../backend_test_one/proto/auth.proto
│   ├── grpc-client.ts     # gRPC client with generated types
│   ├── server.ts          # Main Express server
│   └── routes/
│       └── auth.ts        # Authentication endpoints
├── dist/                  # Compiled JavaScript (auto-generated)
├── package.json
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## 🔧 TypeScript Features

- **Full type safety** for requests, responses, and gRPC calls
- **Interface definitions** for all API endpoints
- **Strict TypeScript configuration** with comprehensive error checking
- **Source maps** for debugging
- **Hot reload** with ts-node for development

## 🌐 API Endpoints

### POST `/api/auth/signin`
**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Success Response:**
```typescript
{
  success: true;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
```

**Error Response:**
```typescript
{
  error: string;
  message: string;
}
```

## ⚙️ Configuration

Environment variables:
- `PORT` - Server port (default: 3001)
- `GRPC_SERVER_URL` - Your gRPC backend URL (default: localhost:50051)
- `NODE_ENV` - Environment mode (development/production)

## 🔗 gRPC Backend Connection

The proxy connects to your Rust gRPC backend. Make sure your backend is running and accessible on the configured URL.

## 📝 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server (requires build first)
- `npm run proto:generate` - Generate TypeScript types from ../backend_test_one/proto/auth.proto

## 🐛 Debugging

TypeScript source maps are enabled, so you can debug the original .ts files even when running compiled code.
