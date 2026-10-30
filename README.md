# NurShop

Modern, premium e-commerce application for Uzbekistan market.

## Features
- Responsive storefront in Uzbek Latin
- Product catalog with search and category filtering
- Product detail pages
- Shopping cart and checkout
- Payment methods: bank card, cash, installment
- Admin dashboard for products and orders
- Secure admin login and role-based access
- Prisma + PostgreSQL-ready backend
- Telegram notifications support

## Stack
- Next.js 14+
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your local environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure PostgreSQL and update `DATABASE_URL` in `.env`.

4. Generate Prisma client and apply migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

## Admin login
Create an admin user in the database or use a seed script. Example admin fields:
- email: admin@nurshop.uz
- password: admin123

## Deployment
- Deploy to Vercel or another platform that supports Next.js.
- Add environment variables in the hosting dashboard.
- Run Prisma migrations in production:
  ```bash
  npx prisma migrate deploy
  ```

## Important notes
- Never store secrets in frontend JavaScript.
- Real payment processing must use an authorized payment provider and official API keys, configured on the server only.
- Telegram bot token and chat ID must remain on the server.
