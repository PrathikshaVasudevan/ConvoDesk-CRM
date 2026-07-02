# ConvoDesk CRM – AI Features

## 1. Conversation Summary
Purpose:
Summarize the selected WhatsApp conversation for the CRM user.

Input:
- conversation_id

Output:
- short summary of customer need
- follow-up context
- important discussion points

---

## 2. Lead Classification
Purpose:
Classify the current conversation into a business intent.

Possible intents:
- pricing inquiry
- product inquiry
- support issue
- complaint
- demo request
- purchase intent

Input:
- conversation_id

Output:
- intent
- priority
- suggested lead stage

---

## 3. Reply Suggestion
Purpose:
Generate a suggested reply for the current conversation.

Input:
- conversation_id

Output:
- one suggested reply text

---

## Initial AI Features to Implement First
1. Conversation Summary
2. Lead Classification
3. Reply Suggestion