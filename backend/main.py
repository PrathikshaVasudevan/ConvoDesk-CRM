import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import api_router

app = FastAPI(
  title=settings.PROJECT_NAME,
  version=settings.VERSION,
  docs_url="/docs",
  redoc_url="/redoc"
)

# CORS configuration to allow local frontend connection
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],  # For development. Limit to specific origin in production.
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Include central router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
  return {
    "status": "online",
    "project": settings.PROJECT_NAME,
    "version": settings.VERSION,
    "api_docs": "/docs"
  }

if __name__ == "__main__":
  uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
