use tonic::{transport::Server, Request, Response, Status};

pub mod auth {
    tonic::include_proto!("auth");
}

use auth::auth_service_server::{AuthService, AuthServiceServer};
use auth::*;
use uuid::Uuid;

#[derive(Debug, Default)]
pub struct MyAuthService {}

#[tonic::async_trait]
impl AuthService for MyAuthService {
    async fn check_availability(
        &self,
        request: Request<CheckAvailabilityRequest>,
    ) -> Result<Response<CheckAvailabilityResponse>, Status> {
        let req = request.into_inner();
        
        println!("Checking availability for field: {:?}, value: {}", req.field, req.value);
        
        // Mock implementation - in real world, check against database
        let is_available = match req.field() {
            AvailabilityField::FieldUsername => !req.value.eq_ignore_ascii_case("admin"),
            AvailabilityField::FieldEmail => !req.value.contains("taken"),
            _ => true,
        };
        
        let response = CheckAvailabilityResponse { is_available };
        
        Ok(Response::new(response))
    }

    async fn sign_up(
        &self,
        request: Request<SignUpRequest>,
    ) -> Result<Response<SignUpResponse>, Status> {
        let req = request.into_inner();
        
        println!("Sign up request for user: {}, email: {}", req.username, req.email);
        
        // Mock implementation - validate input
        if req.username.is_empty() || req.email.is_empty() || req.password.is_empty() {
            return Err(Status::invalid_argument("All fields are required"));
        }
        
        if !req.email.contains("@") {
            return Err(Status::invalid_argument("Invalid email format"));
        }
        
        // Generate a mock user ID
        let user_id = Uuid::new_v4().to_string();
        
        let response = SignUpResponse {
            user_id,
            message: "Sign up successful. Please check your email to verify.".to_string(),
        };
        
        Ok(Response::new(response))
    }

    async fn verify_email(
        &self,
        request: Request<VerifyEmailRequest>,
    ) -> Result<Response<VerifyEmailResponse>, Status> {
        let req = request.into_inner();
        
        println!("Email verification request with token: {}", req.verification_token);
        
        // Mock implementation - check token validity
        let success = !req.verification_token.is_empty() && req.verification_token.len() > 10;
        
        let response = VerifyEmailResponse {
            success,
            message: if success {
                "Email verified successfully.".to_string()
            } else {
                "Invalid verification token.".to_string()
            },
        };
        
        Ok(Response::new(response))
    }

    async fn sign_in(
        &self,
        request: Request<SignInRequest>,
    ) -> Result<Response<SignInResponse>, Status> {
        let req = request.into_inner();
        
        println!("Sign in request for email: {}", req.email);
        
        // Mock implementation - validate credentials
        if req.email.is_empty() || req.password.is_empty() {
            return Err(Status::unauthenticated("Invalid credentials"));
        }
        
        // Mock successful login
        if req.email == "user@example.com" && req.password == "password123" {
            let tokens = Some(Tokens {
                access_token: format!("access_token_{}", Uuid::new_v4()),
                refresh_token: format!("refresh_token_{}", Uuid::new_v4()),
            });
            
            let response = SignInResponse { tokens };
            Ok(Response::new(response))
        } else {
            Err(Status::unauthenticated("Invalid credentials"))
        }
    }

    async fn refresh_token(
        &self,
        request: Request<RefreshTokenRequest>,
    ) -> Result<Response<RefreshTokenResponse>, Status> {
        let req = request.into_inner();
        
        println!("Token refresh request with token: {}", req.refresh_token);
        
        // Mock implementation - validate refresh token
        if req.refresh_token.is_empty() || !req.refresh_token.starts_with("refresh_token_") {
            return Err(Status::unauthenticated("Invalid refresh token"));
        }
        
        let response = RefreshTokenResponse {
            access_token: format!("access_token_{}", Uuid::new_v4()),
        };
        
        Ok(Response::new(response))
    }

    async fn request_password_reset(
        &self,
        request: Request<RequestPasswordResetRequest>,
    ) -> Result<Response<RequestPasswordResetResponse>, Status> {
        let req = request.into_inner();
        
        println!("Password reset request for email: {}", req.email);
        
        // Mock implementation - always return success message for security
        let response = RequestPasswordResetResponse {
            message: "If an account with that email exists, a password reset link has been sent.".to_string(),
        };
        
        Ok(Response::new(response))
    }

    async fn reset_password(
        &self,
        request: Request<ResetPasswordRequest>,
    ) -> Result<Response<ResetPasswordResponse>, Status> {
        let req = request.into_inner();
        
        println!("Password reset with token: {}", req.reset_token);
        
        // Mock implementation - validate reset token and new password
        if req.reset_token.is_empty() || req.new_password.len() < 6 {
            return Err(Status::invalid_argument("Invalid token or password too short"));
        }
        
        let response = ResetPasswordResponse {
            success: true,
            message: "Password has been reset successfully.".to_string(),
        };
        
        Ok(Response::new(response))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:50051".parse()?;
    let auth_service = MyAuthService::default();

    println!("gRPC AuthService server listening on {}", addr);

    Server::builder()
        .add_service(AuthServiceServer::new(auth_service))
        .serve(addr)
        .await?;

    Ok(())
}