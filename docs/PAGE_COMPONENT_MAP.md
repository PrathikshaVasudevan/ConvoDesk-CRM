# ConvoDesk CRM – Page Component Map

## 1. Login Page
Route: /login

Components:
- Login form
- Email input
- Password input
- Submit button

---

## 2. Dashboard Page
Route: /dashboard

Components:
- KPI stats cards
- Lead stage chart
- Recent activity section
- Follow-up alerts section

---

## 3. Inbox Page
Route: /inbox

Layout:
- Left panel: Chat list
- Middle panel: Active chat window
- Right panel: Contact side panel

Components:
- ChatList
- ChatWindow
- ContactSidePanel
- AISummaryCard
- ReplySuggestionCard

---

## 4. Contacts Page
Route: /contacts

Components:
- ContactsTable
- Search/filter bar
- AddContactModal
- ContactProfileDrawer

---

## 5. Pipeline Page
Route: /pipeline

Components:
- PipelineBoard
- PipelineColumn
- LeadCard

Columns:
- New
- Contacted
- Qualified
- Interested
- Follow-up
- Converted
- Lost

---

## 6. Follow-ups Page
Route: /followups

Components:
- FollowupsTable
- CreateFollowupModal
- Status badges
- Due date indicators

---

## 7. Analytics Page
Route: /analytics

Components:
- Lead funnel chart
- Message volume chart
- Conversion chart
- Agent performance chart

---

## 8. Settings Page
Route: /settings

Components:
- Profile form
- Workspace settings
- Gemini settings placeholder