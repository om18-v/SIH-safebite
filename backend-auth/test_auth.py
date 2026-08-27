from database import SessionLocal
from auth import create_user

db = SessionLocal()

user = create_user(
    db,
    username="demo_user",
    email="demo@example.com",
    password="test123"
)

print("User created successfully!")
print("ID:", user.id)
print("Username:", user.username)
print("Email:", user.email)
print("Stored password:", user.hashed_password)

db.close()