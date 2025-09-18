# Auth System Mono-Repository

A complete authentication system consisting of a gRPC backend, REST proxy, and mobile application, all working together through Protocol Buffers (protobuf).

## 🏗️ Architecture Overview

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   React Native      │    │   TypeScript        │    │   Rust gRPC         │
│   Mobile App        │◄──►│   REST Proxy        │◄──►│   Backend           │
│   (simple-proto)    │    │   (proxy)           │    │   (backend_test_one) │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
    HTTP/REST API              gRPC Protocol              Protocol Buffers
```

## 📁 Project Structure

```
proto-example/
├── backend_test_one/          # Rust gRPC Authentication Server
│   ├── src/main.rs           # Server implementation
│   ├── proto/auth.proto      # Protocol buffer definitions
│   ├── Cargo.toml           # Rust dependencies
│   └── build.rs             # Build script for protobuf
│
├── proxy/                    # TypeScript REST-to-gRPC Proxy
│   ├── src/
│   │   ├── server.ts         # Express server
│   │   ├── grpc-client.ts    # gRPC client
│   │   └── routes/auth.ts    # Authentication routes
│   ├── proto/auth.proto      # Protocol buffer definitions
│   └── package.json          # Node.js dependencies
│
├── simple-proto/             # React Native Mobile Application
│   ├── src/
│   │   ├── App.tsx           # Main app component
│   │   └── LoggedInScreen.tsx # Post-authentication UI
│   ├── assets/              # App icons and images
│   └── package.json          # React Native dependencies
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- **Rust** (latest stable version)
- **Node.js** (v18 or later)
- **npm** or **pnpm**
- **Expo CLI** (for mobile development)

### 1. Backend Setup (Rust gRPC Server)
```bash
cd backend_test_one
cargo build
cargo run
```
The gRPC server will start on `localhost:50051`

### 2. Proxy Setup (TypeScript REST API)
```bash
cd proxy
npm install
npm run dev
```
The REST API will be available on `http://localhost:3001`

### 3. Mobile App Setup (React Native)
```bash
cd simple-proto
npm install
npm start
```
Follow the Expo CLI instructions to run on iOS/Android simulator or physical device.

## 🔄 Development Workflow

### Running All Services
You can run all services simultaneously:

1. **Terminal 1**: `cd backend_test_one && cargo run`
2. **Terminal 2**: `cd proxy && npm run dev`
3. **Terminal 3**: `cd simple-proto && npm start`

### Making Changes to Protocol Buffers
If you modify the `auth.proto` file:
1. Update the file in both `backend_test_one/proto/` and `proxy/proto/`
2. Rebuild the Rust backend: `cd backend_test_one && cargo build`
3. The TypeScript proxy will automatically pick up changes

## 📱 Services Overview

### Backend (Rust gRPC Server)
- **Technology**: Rust with Tonic/Prost
- **Port**: 50051
- **Features**:
  - High-performance gRPC server
  - Protocol buffer message handling
  - JWT token generation
  - User authentication logic

### Proxy (TypeScript REST Server)
- **Technology**: Node.js, Express, TypeScript
- **Port**: 3001
- **Features**:
  - Converts HTTP REST requests to gRPC calls
  - Type-safe TypeScript interfaces
  - CORS handling for mobile app
  - Error handling and logging

### Mobile App (React Native)
- **Technology**: React Native with Expo
- **Features**:
  - Cross-platform iOS/Android support
  - Authentication UI
  - REST API integration
  - Modern React hooks patterns

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign-in
  ```typescript
  Request: { email: string, password: string }
  Response: { success: boolean, tokens?: { access_token: string, refresh_token: string } }
  ```

## 🛠️ Development Commands

### Backend (Rust)
```bash
cd backend_test_one
cargo build          # Build the project
cargo run             # Run the server
cargo test            # Run tests
```

### Proxy (TypeScript)
```bash
cd proxy
npm install           # Install dependencies
npm run dev           # Development with hot reload
npm run build         # Build for production
npm start             # Run production build
```

### Mobile App (React Native)
```bash
cd simple-proto
npm install           # Install dependencies
npm start             # Start Expo development server
npm run android       # Run on Android
npm run ios           # Run on iOS
npm run web           # Run on web
```

## 🔧 Configuration

### Environment Variables

**Proxy Server** (`proxy/.env`):
```env
PORT=3001
GRPC_SERVER_URL=localhost:50051
NODE_ENV=development
```

## 📋 Prerequisites for Contributors

1. **Rust**: Install from [rustup.rs](https://rustup.rs/)
2. **Node.js**: Install from [nodejs.org](https://nodejs.org/)
3. **Expo CLI**: `npm install -g expo-cli`
4. **Protocol Buffers Compiler**: Install `protoc` for your system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test across all three services
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 Notes

- All three services must be running for the complete system to work
- The mobile app communicates with the proxy, which then calls the gRPC backend
- Protocol buffer definitions should be kept in sync across services
- The system uses JWT tokens for authentication

## 🐛 Troubleshooting

**gRPC Connection Issues:**
- Ensure the Rust backend is running on port 50051
- Check firewall settings
- Verify protocol buffer definitions match

**Mobile App Can't Connect:**
- Make sure the proxy server is running on port 3001
- Check that CORS is properly configured
- Verify the API endpoint URLs in the mobile app

**Build Errors:**
- Run `cargo clean` in the backend directory
- Delete `node_modules` and reinstall in proxy/mobile directories
- Ensure all prerequisites are installed
