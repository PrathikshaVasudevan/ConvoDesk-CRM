# 💬 ConvoDesk CRM

**A conversational CRM dashboard for managing leads, follow-ups, and customer conversations — all in one place.**

ConvoDesk CRM brings together contact management, follow-up scheduling, and an inbox-style conversation view into a single dashboard, with AI assistance layered on top to help agents summarize conversations and draft replies faster.

---

## 📖 Overview

ConvoDesk CRM is a full-stack CRM built to explore how conversational workflows (chat-first communication) can be combined with traditional CRM features like lead tracking and follow-ups. It's designed as an MVP / demo-ready prototype that demonstrates end-to-end product thinking — from database design to a polished dashboard UI — rather than a production-grade sales platform.

The core idea: instead of switching between a CRM tool and a messaging tool, agents can view a lead's details, conversation history, and follow-up tasks side by side, with AI helping to speed up the response process.

---

## ✨ Why This Project

CRMs are usually built around forms and pipelines, but most real customer interaction happens in chat. ConvoDesk CRM was built to explore what a CRM looks like when conversations are treated as a first-class citizen — alongside contacts, follow-ups, and analytics — with AI assistance reducing the manual effort of writing summaries and replies.

---

## 🚀 Features

| Module | Description |
|---|---|
| 📊 Dashboard | Overview cards for total leads, active chats, pending follow-ups, and conversion metrics |
| 👥 Contacts Management | Add, view, and manage leads with status, priority, email, and phone tracking |
| ⏰ Follow-up Scheduler | Create follow-up tasks, set due dates, and track pending/completed status |
| 📥 Inbox / Conversations | Chat-style inbox to view message history and send replies, with demo/fallback data support |
| 🤖 AI Assistance | AI-generated conversation summaries and reply suggestions |
| 📈 Analytics | Basic CRM performance and activity tracking |
| ⚙️ Settings | Profile settings, WhatsApp/webhook configuration, and AI prompt configuration |

---

## 🛠️ Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS
- React Query (data fetching & state)
- Lucide Icons

**Backend**
- FastAPI (Python)

**Database**
- Supabase (PostgreSQL)

**AI**
- Gemini/OpenAI-style AI integration for conversation summaries and reply suggestions

---

## 🏗️ Architecture / Project Structure

```
ConvoDesk-CRM/
│
├── frontend/                  # Next.js + TypeScript app
│   ├── app/                   # App router pages (dashboard, contacts, inbox, etc.)
│   ├── components/            # Reusable UI components
│   ├── lib/                   # API clients, utilities, React Query hooks
│   ├── styles/                # Tailwind/global styles
│   └── public/                # Static assets
│
├── backend/                   # FastAPI application
│   ├── app/
│   │   ├── routes/            # API route handlers (contacts, followups, inbox, ai, etc.)
│   │   ├── models/            # Pydantic models / DB schemas
│   │   ├── services/          # Business logic, AI integration
│   │   └── core/              # Config, DB connection, settings
│   └── requirements.txt
│
├── database/                  # Supabase schema / migrations (if applicable)
│
└── README.md
```

> Folder names above reflect a typical layout — update this section to match your exact repo structure if it differs.

---

## 🖥️ Screens / Modules

### Dashboard
Overview cards summarizing total leads, active chats, pending follow-ups, and conversion metrics, giving a quick snapshot of CRM activity.

### Contacts
A dedicated view to add, browse, and manage leads — including status, priority level, email, and phone number.

### Follow-ups
Create and manage follow-up tasks tied to contacts, with due dates and completion tracking (pending vs. completed).

### Inbox
An inbox-style conversation interface for viewing message history and replying to leads/customers directly from the CRM. Falls back to seeded demo data when live chat data isn't available.

### Analytics
A simple analytics view surfacing CRM performance metrics and activity trends.

### Settings
Profile management, along with configuration sections for WhatsApp/webhook integration and Gemini AI prompt settings.

---

## ⚙️ Installation / Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/PrathikshaVasudevan/ConvoDesk-CRM.git
cd ConvoDesk-CRM
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000` by default.

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend API will run on `http://localhost:8000` by default.

### 4. Environment Variables
Create `.env` files for both frontend and backend as described below before running the app.

### 5. Run the App
With both servers running:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

---

## 🔑 Environment Variables

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

**Backend (`backend/.env`)**
```env
DATABASE_URL=your_supabase_postgres_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_or_anon_key

# AI configuration (optional — required only for AI features)
AI_API_KEY=your_gemini_or_openai_style_api_key
AI_MODEL=your_model_name
```

> Replace placeholder values with your actual credentials. Never commit `.env` files to version control.

---

## 🔮 Future Improvements

- 📱 Full WhatsApp Business API integration (currently not fully implemented)
- 🧠 Improved AI classification for lead intent and conversation tagging
- 🔄 Real-time chat sync (WebSockets) instead of polling/demo data
- 🔔 Notification system for follow-up reminders and new messages
- 🔐 Role-based access control for multi-agent teams

---

## 👩‍💻 Author

**Prathiksha Vasudevan**
GitHub: [@PrathikshaVasudevan](https://github.com/PrathikshaVasudevan)

---

*ConvoDesk CRM is an MVP/demo-ready prototype built to showcase full-stack CRM and conversational workflow design. Some features (WhatsApp integration, live AI data) use fallback/demo data for presentation purposes.*
