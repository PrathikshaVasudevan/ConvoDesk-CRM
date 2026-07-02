from fastapi import APIRouter, HTTPException
from app.schemas.user import LoginRequest, LoginResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    if payload.email != "admin@convodesk.com" or payload.password != "password123":
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = UserResponse(
        id="u1",
        full_name="Admin User",
        email="admin@convodesk.com",
        role="admin",
        avatar_url=None,
        created_at="2026-07-02T00:00:00",
    )

    return LoginResponse(
        access_token="mock-jwt-token",
        token_type="bearer",
        user=user,
    )