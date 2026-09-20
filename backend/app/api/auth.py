from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/auth", tags=["Authentication"])


class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    token: str
    token_type: str = "bearer"
    user: dict


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest):
    """Register a new user account."""
    user = {
        "id": "user-registered-1",
        "email": payload.email,
        "full_name": payload.full_name or payload.email.split("@")[0],
        "role": "user",
    }
    return {
        "token": "jwt-token-registered-sample",
        "token_type": "bearer",
        "user": user,
    }


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    """Authenticate user credentials and return JWT token."""
    user = {
        "id": "user-auth-1",
        "email": payload.email,
        "full_name": payload.email.split("@")[0],
        "role": "researcher",
    }
    return {
        "token": "jwt-token-authenticated-sample",
        "token_type": "bearer",
        "user": user,
    }


@router.get("/me")
def get_current_user():
    """Retrieve profile of authenticated user."""
    return {
        "id": "user-auth-1",
        "email": "demo@docuintel.ai",
        "full_name": "Dr. Alex Chen",
        "role": "Principal AI Scientist",
    }
