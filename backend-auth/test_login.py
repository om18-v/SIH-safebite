from database import SessionLocal
from auth import authenticate_user

db = SessionLocal()

user = authenticate_user(
    db,
    username="demo_user",
    password="test123"
)

if user:
    print("Login successful!")
    print("User:", user.username)
    print("Email:", user.email)
else:
    print("Login failed!")

db.close()