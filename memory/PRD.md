# Karim Chaouki Portfolio Website - PRD

## Original Problem Statement
Build a professional portfolio website for Karim Chaouki, a Senior Project & Program Manager specializing in HCM software implementation.

## Target Audience
- Recruiters
- Talent Acquisition Managers
- Peer consultants

## Core Requirements

### Required Sections
1. **Hero:** Bold headline, sub-headline, CTAs (Hire Me, View My Work), animated stat counters
2. **Value Proposition:** Short pitch with key differentiators
3. **Core Expertise:** Icon-based grid of skills
4. **Experience Timeline:** Animated vertical timeline of work history
5. **Certifications:** Badge-style cards for PMP, RMP, CSM, etc.
6. **Key Metrics:** Grid highlighting impactful numbers
7. **Testimonials:** Curated recommendations from LinkedIn
8. **Contact:** Form with email, LinkedIn, and language info

### Design Direction
- Light professional blue corporate theme (changed from initial dark navy/gold)
- Must be responsive
- Include animations and 3D effects

### Privacy & Legal
- Hide personal contact info (phone, location)
- Permanent profile picture
- Resume download button
- Functional contact form (Gmail SMTP)
- Privacy Policy and Terms & Conditions pages
- Cookie consent banner

## What's Been Implemented

### Completed (December 2025)
- [x] All portfolio sections created (Hero, ValueProposition, Expertise, Timeline, Certifications, ImpactMetrics, Testimonials, Contact)
- [x] Light corporate blue theme with city skyline hero background
- [x] Functional contact form with Gmail SMTP integration
- [x] Privacy Policy and Terms & Conditions pages
- [x] Cookie consent banner
- [x] Permanent profile picture embedded
- [x] Resume download button
- [x] 3D tilt effects on ValueProposition and Expertise cards
- [x] 3D scroll-reveal animations on Timeline
- [x] Dynamic copyright year in footer (auto-updates to current year)

### In Progress
- [ ] 3D tilt animations on Certifications, ImpactMetrics, and Testimonials cards

## Code Architecture
```
/app
├── backend
│   ├── .env (Gmail SMTP credentials)
│   ├── requirements.txt
│   └── server.py
└── frontend
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    ├── public
    │   ├── KC_PM_Resume.pdf
    │   └── profile-pic.png
    └── src
        ├── components/
        ├── data/mockData.js (single source of truth for content)
        ├── hooks/
        │   ├── useIntersectionObserver.js
        │   └── useTilt.js
        └── App.js
```

## Key Technical Details
- **Frontend:** React, TailwindCSS, react-router-dom
- **Backend:** FastAPI (Python)
- **Database:** MongoDB (contact form messages)
- **Integrations:** Gmail SMTP for email notifications

## API Endpoints
- `POST /api/contact` - Submit contact form, save to MongoDB, send email notification

## DB Schema
- `messages`: `{ name, email, subject, message, created_at }`

## Prioritized Backlog

### P0 (High Priority)
- Complete 3D tilt animations on remaining card sections

### P1 (Medium Priority)
- None currently

### P2 (Low Priority/Future)
- None currently requested
