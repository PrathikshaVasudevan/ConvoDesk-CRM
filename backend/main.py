from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api_router import api_router
from app.db.session import Base, engine
from app.models import *

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ConvoDesk CRM API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "ConvoDesk CRM API running"}