from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schemas import Token, UserCreate, UserResponse
from app.core.security import create_access_token, verify_password, get_password_hash

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(credentials: UserCreate):
  # In a real implementation, we would query the User table using credentials.email
  # For the scaffold, we mock successful authentication for alex@convodesk.crm
  if credentials.email == "alex@convodesk.crm" and credentials.password == "password":
    access_token = create_access_token(subject=credentials.email)
    return {"access_token": access_token, "token_type": "bearer"}
  
  # Allow demo logging for any user
  if len(credentials.password) >= 6:
    access_token = create_access_token(subject=credentials.email)
    return {"access_token": access_token, "token_type": "bearer"}

  raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect email or password",
    headers={"WWW-Authenticate": "Bearer"},
  )
