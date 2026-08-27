from pydantic import BaseModel, EmailStr
from typing import Literal


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Literal["ADMIN", "INSPECTOR", "CONSUMER"] = "CONSUMER"


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True