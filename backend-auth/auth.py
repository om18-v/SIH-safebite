import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from sqlalchemy.orm import Session

from database import get_db
from models import User


# Load variables from .env
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not set")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def hash_password(password: str) -> str:
    """Hash a plain-text password using Argon2."""
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against its stored Argon2 hash."""
    return password_hash.verify(password, hashed_password)


def create_user(
    db: Session,
    username: str,
    email: str,
    password: str,
    role: str = "CONSUMER"
):
    """Create a new user."""
    existing_username = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if existing_username:
        raise ValueError("Username already exists")

    existing_email = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_email:
        raise ValueError("Email already exists")

    hashed_password = hash_password(password)

    user = User(
        username=username,
        email=email,
        hashed_password=hashed_password,
        role=role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    username: str,
    password: str
):
    """Authenticate a user by username and password."""
    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user


def create_access_token(username: str, role: str) -> str:
    """Create a JWT containing username, role, and expiration."""
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": username,
        "role": role,
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_access_token(token: str):
    """Verify a JWT and return the username."""
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

        if username is None:
            return None

        return username

    except jwt.PyJWTError:
        return None


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Get the currently authenticated user."""
    username = verify_access_token(token)

    if username is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user


def require_role(*allowed_roles):
    """Restrict access to users with allowed roles."""
    def role_checker(
        current_user: User = Depends(get_current_user)
    ):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this resource"
            )

        return current_user

    return role_checker