from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Creates a local SQLite database file in your backend directory
SQLALCHEMY_DATABASE_URL = "sqlite:///./safebite.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to open and close database sessions cleanly
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()