# CareerOS AI — Enterprise AI SaaS Career Development Platform
<br>
Production level


[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java 21](https://img.shields.io/badge/Java-21-blue.svg)](https://www.oracle.com/java/)
[![React 18](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.0-red.svg)](https://redis.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**CareerOS AI** is an end-to-end, production-grade enterprise SaaS platform designed to accelerate career growth using advanced AI algorithms. It features a 100-point algorithmic ATS diagnostic engine, AI-powered Google XYZ bullet point rewriter, automated cover letter generator, STAR-method mock interview simulator, dynamic skill gap & milestone career roadmap analyzer, multi-gateway billing integration (Razorpay, Cashfree, PhonePe, Stripe), an executive administrative analytics panel, and Spring Security 6 JWT + Redis rate-limiting protection.

---

## 🚀 Key Modules & Architecture

1. **Authentication Module (Sprint 1)**: JWT auth, BCrypt password hashing, OTP email verification, and role-based access control (`ROLE_USER`, `ROLE_PREMIUM_USER`, `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`).
2. **Resume Upload & Parsing Engine (Sprint 2)**: Magic-byte PDF/DOCX parser, 10MB file limit enforcement, duplicate upload detection, and version control.
3. **ATS Scoring & Resume Intelligence (Sprint 3)**: Transparent 100-point weighted scoring engine across 10 categories (Skills Match, Action Verbs, ROI Metrics, Formatting, ATS Compatibility).
4. **AI Resume Rewriter & Bullet Optimizer (Sprint 4)**: 8 multi-style AI rewrite presets (ATS Optimized, Leadership, Technical, Concise) with Google XYZ metric formula.
5. **AI Cover Letter Generator (Sprint 5)**: Personalized cover letter generation with editable sections and PDF export engine.
6. **AI Interview Simulator (Sprint 6)**: STAR-method interactive mock interviewer supporting HR, Technical, System Design, and Behavioral sessions with score breakdown.
7. **AI Career Roadmap & Skill Gap Analyzer (Sprint 7)**: Dynamic readiness score index, 30/60/90-day milestone timeline, missing skill/tool cards, and weekly streak tracker.
8. **Production Billing & Subscriptions (Sprint 8)**: ₹49/month Premium Pass, payment gateway adapter architecture (Razorpay, Cashfree, PhonePe, Stripe), HMAC-SHA256 webhooks, promotional coupons (`PROMO50`), referral tracking, and PDF invoice engine.
9. **Admin Panel & Business Analytics (Sprint 9)**: Executive dashboard tracking MRR/ARR, user directory controls (block/unblock, plan elevation), system telemetry (CPU %, Memory, HikariCP DB pool), and security audit logs.
10. **Security Hardening (Sprint 10)**: Spring Security 6, JWT + single-use Refresh Token rotation, Redis token blacklist, algorithmic rate limiting, and HTTP security headers (CSP, FrameOptions DENY, HSTS).
11. **DevOps & Production Launch (Sprint 11)**: Multi-stage Docker containerization, `docker-compose.yml`, Railway/Render/Vercel deployment readiness, and production profile configs.

---

## 🛠️ Tech Stack

### Frontend
- **Core**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, Glassmorphism, Modern Dark Mode UI Tokens
- **Icons**: Lucide React

### Backend
- **Core**: Java 21, Spring Boot 3.3.0
- **Security**: Spring Security 6, JJWT 0.12.5, BCrypt
- **Database**: PostgreSQL 16, Flyway Migrations (V1 to V11)
- **Caching & Limits**: Redis 7
- **Build Tool**: Apache Maven 3.9

---

## 📦 Quick Start (Local Docker Compose)

### Prerequisites
- Docker & Docker Compose installed
- Java 21 & Maven 3.9 (for local manual builds)

### 1. Clone Repository
```bash
git clone https://github.com/careeros/careeros-ai.git
cd careeros-ai
```

### 2. Launch Stack via Docker Compose
```bash
docker-compose up --build -d
```
This command starts:
- **PostgreSQL 16**: `localhost:5432`
- **Redis 7**: `localhost:6379`
- **Spring Boot Backend**: `http://localhost:8080`

### 3. Launch Frontend Development Server
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 Production Deployment Guide

### Deploy Backend to Railway / Render
1. Connect your GitHub repository to Railway or Render.
2. Select root directory `/backend`.
3. Set Build Command: `mvn clean package -DskipTests`
4. Set Start Command: `java -jar target/careeros-backend-1.0.0.jar --spring.profiles.active=prod`
5. Configure Environment Variables:
   - `SPRING_DATASOURCE_URL`: PostgreSQL JDBC URL
   - `SPRING_DATASOURCE_USERNAME`: DB User
   - `SPRING_DATASOURCE_PASSWORD`: DB Password
   - `SPRING_REDIS_HOST`: Redis Hostname
   - `JWT_SECRET`: Secret key (min 256 bits)

### Deploy Frontend to Vercel
1. Import repository on Vercel.
2. Set Framework Preset: **Vite**.
3. Configure Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-railway-url.up.railway.app`
4. Click **Deploy**.

---

## 🔑 Environment Variables Reference

| Variable Name | Description | Default / Example |
| :--- | :--- | :--- |
| `SPRING_PROFILES_ACTIVE` | Active Spring Environment Profile | `prod` |
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC Connection URL | `jdbc:postgresql://localhost:5432/careeros_db` |
| `SPRING_DATASOURCE_USERNAME` | PostgreSQL User | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | PostgreSQL Password | `postgres` |
| `SPRING_REDIS_HOST` | Redis Server Host | `localhost` |
| `SPRING_REDIS_PORT` | Redis Server Port | `6379` |
| `JWT_SECRET` | Secret Key for Signing JWT Tokens | `min_256_bit_secret_string` |
| `RAZORPAY_KEY_ID` | Razorpay Gateway Live Public Key | `rzp_live_xxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay Gateway Live Secret Key | `rzp_live_secret_xxx` |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay HMAC Signature Secret | `whsec_xxx` |
| `VITE_API_BASE_URL` | Frontend API Proxy Target URL | `https://api.careeros.ai` |

---

## 📑 Flyway Database Migrations (V1 to V11)

- `V1__init_auth.sql` — Users table & Auth indices.
- `V2__resume_upload.sql` — Resumes & structured JSON versions tables.
- `V3__ats_scoring.sql` — ATS reports & keyword scores.
- `V4__ai_rewriter.sql` — AI bullet rewrites history.
- `V5__cover_letter.sql` — Cover letter templates & output.
- `V6__interview_simulator.sql` — Interview sessions & evaluations.
- `V8__career_roadmap.sql` — Skill gaps, roadmap milestones, and weekly tracker.
- `V9__billing_payments.sql` — Subscriptions, payments, coupons, invoices.
- `V10__admin_dashboard.sql` — Admin audit logs & system metrics telemetry.
- `V11__security_hardening.sql` — Refresh tokens, security audit logs, IP blocklist.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.
