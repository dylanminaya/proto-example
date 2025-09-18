# Use the official Rust image as base
FROM rust:latest as builder

# Install protobuf compiler
RUN apt-get update && apt-get install -y \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the Cargo files
COPY Cargo.toml ./

# Copy the proto files (needed for build.rs)
COPY proto/ ./proto/

# Copy the source code
COPY src/ ./src/

# Copy build.rs
COPY build.rs ./

# Build the application
RUN cargo build --release

# Use a minimal image for the runtime
FROM debian:bookworm-slim

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -r -s /bin/false appuser

# Copy the binary from the builder stage
COPY --from=builder /app/target/release/backend_test_one /usr/local/bin/backend_test_one

# Change ownership of the binary
RUN chown appuser:appuser /usr/local/bin/backend_test_one

# Switch to the non-root user
USER appuser

# Expose the gRPC port
EXPOSE 50051

# Run the application
CMD ["backend_test_one"]
