from typing import Optional
from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    role: str
    avatar_url: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse