from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# ─── Contact Form Models ─────────────────────────────────────────────
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, description="Sender's name")
    email: EmailStr = Field(..., description="Sender's email")
    subject: str = Field(..., min_length=1, description="Message subject")
    message: str = Field(..., min_length=1, description="Message body")

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

def send_email_notification(contact: ContactMessage):
    """Send email notification to Karim via Gmail SMTP."""
    gmail_user = os.environ.get('GMAIL_USER')
    gmail_password = os.environ.get('GMAIL_APP_PASSWORD')

    if not gmail_user or not gmail_password:
        logger.error("Gmail credentials not configured")
        return False

    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = gmail_user
        msg['To'] = gmail_user
        msg['Subject'] = f"Portfolio Contact: {contact.subject}"
        msg['Reply-To'] = contact.email

        # Plain text version
        text_body = (
            f"New contact form submission:\n\n"
            f"From: {contact.name}\n"
            f"Email: {contact.email}\n"
            f"Subject: {contact.subject}\n\n"
            f"Message:\n{contact.message}\n\n"
            f"Submitted: {contact.timestamp.strftime('%B %d, %Y at %I:%M %p UTC')}"
        )

        # HTML version
        html_body = f"""
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F1F5F9; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #C8A94E, #A08030); padding: 24px 32px;">
                <h2 style="margin: 0; color: #0B1120; font-size: 20px;">New Portfolio Inquiry</h2>
            </div>
            <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #94A3B8; width: 80px; vertical-align: top;">From:</td>
                        <td style="padding: 8px 0; color: #F1F5F9; font-weight: 600;">{contact.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;">Email:</td>
                        <td style="padding: 8px 0;"><a href="mailto:{contact.email}" style="color: #C8A94E;">{contact.email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;">Subject:</td>
                        <td style="padding: 8px 0; color: #F1F5F9;">{contact.subject}</td>
                    </tr>
                </table>
                <hr style="border: none; border-top: 1px solid #1E293B; margin: 20px 0;">
                <p style="color: #94A3B8; margin: 0 0 8px; font-size: 13px;">MESSAGE</p>
                <p style="color: #F1F5F9; line-height: 1.6; white-space: pre-wrap;">{contact.message}</p>
                <hr style="border: none; border-top: 1px solid #1E293B; margin: 20px 0;">
                <p style="color: #64748B; font-size: 12px; margin: 0;">
                    Received on {contact.timestamp.strftime('%B %d, %Y at %I:%M %p UTC')}
                </p>
            </div>
        </div>
        """

        msg.attach(MIMEText(text_body, 'plain'))
        msg.attach(MIMEText(html_body, 'html'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, gmail_user, msg.as_string())

        logger.info(f"Email notification sent for contact from {contact.email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False


@api_router.post("/contact", response_model=dict)
async def submit_contact(input: ContactMessageCreate):
    contact = ContactMessage(**input.model_dump())
    doc = contact.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_messages.insert_one(doc)

    email_sent = send_email_notification(contact)

    return {
        "success": True,
        "message": "Thank you for reaching out! Your message has been received.",
        "email_sent": email_sent,
    }


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for msg in messages:
        if isinstance(msg.get('timestamp'), str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    return messages


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()