from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import User
from schemas import UserCreate, UserResponse, UserLogin
from auth import (
    create_user,
    authenticate_user,
    create_access_token,
    get_current_user,
    require_role
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SafeBite Authentication API")


@app.get("/")
def root():
    return {"message": "SafeBite Auth API is running"}


@app.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    try:
        user = create_user(
            db,
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            role=user_data.role
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    return user

@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        username=form_data.username,
        password=form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(user.username, user.role)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@app.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
