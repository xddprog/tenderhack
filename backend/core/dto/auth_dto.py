from pydantic import BaseModel, EmailStr


class RegisterForm(BaseModel):
    password: str
    email: EmailStr


class LoginForm(BaseModel):
    email: EmailStr
    password: str
