from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, nullable=False)
    manufacturer = Column(String, nullable=True)
    mrp = Column(String, nullable=True)
    net_quantity = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships to child tables
    compliance = relationship("ComplianceResult", back_populates="product", uselist=False)
    violations = relationship("Violation", back_populates="product")
    ingredient_flags = relationship("IngredientFlag", back_populates="product")
    risk_score = relationship("RiskScore", back_populates="product", uselist=False)

class ComplianceResult(Base):
    __tablename__ = "compliance_results"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    status = Column(String, nullable=False)
    compliance_score = Column(Integer, nullable=False)

    product = relationship("Product", back_populates="compliance")

class Violation(Base):
    __tablename__ = "violations"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    severity = Column(String, nullable=False)
    message = Column(Text, nullable=False)

    product = relationship("Product", back_populates="violations")

class IngredientFlag(Base):
    __tablename__ = "ingredient_flags"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    ingredient_name = Column(String, nullable=False)
    reason = Column(Text, nullable=False)

    product = relationship("Product", back_populates="ingredient_flags")

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    overall_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)

    product = relationship("Product", back_populates="risk_score")