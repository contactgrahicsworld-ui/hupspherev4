# HUBSPHERE ENTERPRISE V4
## Complete Production-Ready AI-Powered Business Operating System

HubSphere Enterprise V4 is a commercial-grade, multi-tenant SaaS business operating system unifying **CRM**, **HRMS**, **ERP & Double-Entry Accounting**, **Physical SIM Telecalling Hub**, and an **Autonomous AI Workforce** with 5 specialized agents.

---

## 🌟 Key Architecture & Capabilities

### 1. Multi-Tenant Core & RBAC Security
- **Strict Server-Side Tenant Scoping:** Every record is partitioned by `tenantId`.
- **13 Enterprise Roles & Granular Permissions:** Full matrix enforcement across Super Admin, Platform Owner, Tenant Admin, Sales Reps, HR Directors, Accountants, and Telecallers.
- **Supabase PostgreSQL + Prisma ORM:** Enterprise schema with relational cascades, indexes, and transactional guarantees.

### 2. CRM & Sales Pipeline
- **Kanban Deal Pipeline:** Real-time stage progression (*New Inquiries → Proposal Sent → Negotiation → Closed Won*).
- **Lead Qualification & Scoring:** Automated lead scoring based on company profile, deal value, and SIM telecalling interactions.
- **Click-to-Call Queue:** Dispatches calls directly to physical Android SIM handsets.

### 3. HRMS & Workforce Intelligence
- **Biometric & Mobile Attendance:** On-time tracking, shift rosters, and leave approvals.
- **Automated Payroll Engine:** Statutory deductions (PF, ESI, TDS) and automated salary slip generation.

### 4. ERP, Inventory & Accounting Ledger
- **Catalog & Inventory Control:** Real-time stock movement tracking with reorder level alerts.
- **Double-Entry General Ledger:** Auditable debit/credit journal entries linked directly to tax invoices.

### 5. AI Workforce — Five Specialized Autonomous Agents
- **NOVA:** Executive Business Assistant & Data Synthesis
- **VOX:** Hindi & English Voice Intelligence & Inbound SIM Call Summarizer
- **SALESPRO:** Autonomous Lead Qualifier & Quotation Drafter
- **PEOPLEMIND:** HR Intelligence, Leave Approvals & Policy Enforcement
- **INSIGHT:** Financial Double-Entry Audit & Anomaly Detective

### 6. Physical SIM Telecalling Hub (Android Companion)
- **Zero Costly Telephony APIs:** Directly pairs physical Android dual-SIM handsets using `Android TelecomManager`.
- **Offline Call Queue:** Local SQLite queuing that syncs duration, timestamp, and disposition when connection is restored.
- **CRM Auto-Link:** Matches phone numbers to leads in real time.

---

## 🚀 Quick Start & Development

### 1. Installation
```bash
npm install
npx prisma generate
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Execute Smoke Test Suite
```bash
npm test
```

### 4. Production Build
```bash
npm run build
```

---

## ☁️ Deployment Guides

### Vercel Deployment
1. Import repository `hupspherev4` into Vercel.
2. Set Environment Variables:
   - `DATABASE_URL`: Your Supabase PostgreSQL transaction pooling connection string.
3. Deploy! Next.js 15 App Router is fully optimized for Vercel edge & serverless runtimes.

### Supabase Database Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Copy the Connection String from **Project Settings > Database > URI (Session Pooler)**.
3. Push the Prisma schema:
```bash
npx prisma db push
```

---

## 📱 Android Companion App
Located under `/android`:
```bash
cd android
./gradlew assembleRelease
```
Outputs release APK to `android/app/build/outputs/apk/release/app-release.apk`.
