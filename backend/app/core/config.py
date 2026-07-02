import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
  PROJECT_NAME: str = "ConvoDesk CRM API"
  VERSION: str = "0.1.0"
  API_V1_STR: str = "/api"
  
  # Database configuration
  DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/convodesk")
  
  # JWT/Auth configuration (matching Supabase JWT expectations)
  JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-key-change-in-production-123456789")
  ALGORITHM: str = "HS256"
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
  
  # AI Engine
  GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

  class Config:
    case_sensitive = True

settings = Settings()
