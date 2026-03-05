# Email Setup Guide - EmailJS Integration

## Why Emails Aren't Working

The app needs to send emails to HODs when Excel files are uploaded. The Express backend has dependency issues, so we're using **EmailJS** - a free service that sends emails directly from your browser.

## Quick Setup (5 minutes)

### 1. **Sign up for FREE EmailJS account**
- Go to: https://emailjs.com/
- Click "Sign Up Free"
- Create account with your email

### 2. **Get Your Public Key**
- After login, go to **Account** → **API Keys**
- Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxx`)

### 3. **Paste into dataService.ts**
- Open: `src/services/dataService.ts`
- Find this line (around line 7):
  ```typescript
  const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
  ```
- Replace with your key:
  ```typescript
  const EMAILJS_PUBLIC_KEY = 'paste_your_public_key_here';
  ```

### 4. **Create Email Service**
- In EmailJS dashboard, go to **Email Services**
- Click **Add Service**
- Choose email provider (Gmail recommended for testing)
- Connect your email account
- Copy the Service ID (starts with `service_`)
- Replace this in dataService.ts:
  ```typescript
  const EMAILJS_SERVICE_ID = 'service_cttewc_nptel';
  ```

### 5. **Create Email Template**
- Go to **Email Templates**
- Click **Create New Template**
- Name: `template_nptel_upload`
- In template editor, use these variables:
  ```
  Subject: {{subject}}
  
  {{message}}
  ```
- Save template
- Copy Template ID from the template settings
- Replace this in dataService.ts:
  ```typescript
  const EMAILJS_TEMPLATE_ID = 'template_nptel_upload';
  ```

### 6. **Test It**
- Reload browser: http://localhost:5173/
- Go to **Upload Data** tab
- Upload an Excel file
- Check the HOD email address - you should get the email!

## Troubleshooting

**Q: I'm not getting emails after setup**
- Check browser console (F12 → Console tab) for error messages
- Verify email service is connected in EmailJS dashboard
- Make sure you re-pasted all 3 keys correctly

**Q: What's the free tier limit?**
- EmailJS allows 200 emails/month for free - plenty for testing!

**Q: Can I use another email provider?**
- Yes! EmailJS supports Gmail, Outlook, SendGrid, AWS SES, etc.
- Just follow their setup for the provider you choose

## Alternative: If You Want to Use Backend Later

Once you fix the backend (install build tools for `better-sqlite3`), emails will automatically use the backend `/api/send-email` endpoint as fallback. The frontend will try EmailJS first, then backend.

---

**Need help?** Check EmailJS docs: https://www.emailjs.com/docs/
