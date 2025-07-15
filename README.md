
## Project Description
This is a full-stack Issue Tracker application built with Next.js, Prisma, and NextAuth.js. It allows users to create, manage, and track issues, providing a comprehensive solution for project management and bug tracking.

## Features
- User authentication (Google OAuth)
- Create, view, edit, and delete issues
- Assign issues to users
- Filter and sort issues by status
- Pagination for issue lists
- Issue status badges
- Markdown support for issue descriptions
- Responsive design

## Flow Diagram
![Flow Diagram](./flow-diagram.png)


## Technologies Used
**Frontend:**
- Next.js
- React
- Radix UI Themes
- Recharts (for charts)
- React Hook Form (for forms)
- Zod (for validation)
- Axios (for API requests)
- Tailwind CSS

**Backend:**
- Next.js API Routes
- Prisma (ORM)
- PostgreSQL (Database)
- NextAuth.js (for authentication)


## Setup

### Prerequisites
- Node.js (v18 or later)
- PostgreSQL database
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd issue-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
   GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
   GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
   ```
   - Replace `DATABASE_URL` with your PostgreSQL connection string.
   - Generate a strong secret for `NEXTAUTH_SECRET` (e.g., using `openssl rand -base64 32`).
   - Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the Google Cloud Console.

4. Database Migrations:
   Apply Prisma migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
   ```

## Usage

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and visit `http://localhost:3000`

