# emr-mern-app-frontend

### React/Tailwind frontend for a electronic management records MERN app. With a Node API serving the data.


# 🔑 Key Features & Implementation
## ✅ 1. Authentication (JWT, NextAuth.js, or Clerk)
Use NextAuth.js to manage authentication:
📂 app/layout.tsx


## ✅ 2. Role-Based Access Control (RBAC)
Use middleware.ts to restrict access:
📂 middleware.ts


## ✅ 3. Fetch & Display Patient Data
📂 app/patients/page.tsx


## ✅ 4. Real-Time Updates (Using WebSockets or Server Actions)
For real-time patient updates, Next.js Server Actions are useful.
📂 app/api/patients/update.ts


## ✅ 5. Appointment Booking & Calendar
For an appointment system, use a calendar UI like FullCalendar:


AWS / DigitalOcean	Docker + PostgreSQL for full control
Firebase	Good for Firestore-backed EMRs



/emr-app
│── app/                  # Next.js App Router (Pages & Layouts)
│   ├── layout.tsx        # Main layout (Navigation, Auth Providers)
│   ├── page.tsx         # Dashboard/Home
│   ├── login/page.tsx   # Login Page
│   ├── patients/        # Patient Management
│   │   ├── page.tsx     # List Patients
│   │   ├── [id]/page.tsx # Patient Details
│   ├── records/         # EMR Records
│   │   ├── page.tsx     # All Medical Records
│   │   ├── [id]/page.tsx # Single Record View
│   ├── appointments/    # Appointments
│   │   ├── page.tsx     # Appointments Dashboard
│── components/          # UI Components
│   ├── Navbar.tsx       # Top Navigation
│   ├── Sidebar.tsx      # Side Navigation
│   ├── PatientCard.tsx  # Patient Preview Component
│── lib/                 # Utility functions & API calls
│   ├── auth.ts          # Auth logic
│   ├── db.ts            # Database connections (if using Prisma)
│── middleware.ts        # Secure routes, role-based auth
│── prisma/              # Database schema (if using Prisma)
│── public/              # Static assets
│── styles/              # Global styles (Tailwind, CSS)
│── .env                 # Environment variables
│── next.config.js       # Next.js config



// app/layout.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
}

// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.username === "doctor" && credentials.password === "password") {
          return { id: "1", name: "Dr. John Doe", role: "doctor" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

; middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/patients/:path*", "/records/:path*"],
};

// Fetch & Display Patient Data
// app/patients/page.tsx
import { fetchPatients } from "@/lib/db";

export default async function PatientsPage() {
  const patients = await fetchPatients();

  return (
    <div>
      <h1>Patients</h1>
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
}
// 🔑 Key Features & Implementation
// ✅ 1. Authentication (JWT, NextAuth.js, or Clerk)
// Use NextAuth.js to manage authentication:

📂 app/layout.tsx


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
}
📂 lib/auth.ts


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.username === "doctor" && credentials.password === "password") {
          return { id: "1", name: "Dr. John Doe", role: "doctor" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
// ✅ 2. Role-Based Access Control (RBAC)
// Use middleware.ts to restrict access:

📂 middleware.ts


import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/patients/:path*", "/records/:path*"],
};
// ✅ 3. Fetch & Display Patient Data
// 📂 app/patients/page.tsx


import { fetchPatients } from "@/lib/db";

export default async function PatientsPage() {
  const patients = await fetchPatients();

  return (
    <div>
      <h1>Patients</h1>
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
}
📂 lib/db.ts

export async function fetchPatients() {
  return [
    { id: 1, name: "Alice Johnson", age: 45, condition: "Diabetes" },
    { id: 2, name: "Bob Smith", age: 60, condition: "Hypertension" },
  ];
}
// ✅ 4. Real-Time Updates (Using WebSockets or Server Actions)
// For real-time patient updates, Next.js Server Actions are useful.

📂 app/api/patients/update.ts


import { revalidatePath } from "next/cache";

export async function updatePatient(patientId, newData) {
  await db.patient.update({ where: { id: patientId }, data: newData });
  revalidatePath("/patients");
}
// ✅ 5. Appointment Booking & Calendar
// For an appointment system, use a calendar UI like FullCalendar:


npm install @fullcalendar/react @fullcalendar/daygrid
📂 components/Calendar.tsx


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}

| Feature                         | `react-query`  dependent  |
| ------------------------------- | ---------------------------- |
| **Patient dashboards**          | ✅ yes — fast cache & refetch |
| **Live lab result updates**     | ✅ yes — background updates   |
| **Forms with autosave**         | ✅ yes — optimistic updates   |
| **Appointment scheduling**      | ✅ yes — staleTime/cache      |
| **Background sync / polling**   | ✅ yes — out of the box       |
| **Pagination/search**           | ✅ yes — smooth client UI     |
| **Client-side tabs/navigation** | ✅ yes — avoid full reloads   |



| Layer                                    | Tool                                |
| ---------------------------------------- | ----------------------------------- |
| **Critical SSR Pages**                   | Server Components / fetch           |
| **Interactive Dashboards / Side Panels** | `react-query`                       |
| **Patient Data Forms**                   | `react-query` + optimistic mutation |
| **Background refresh (e.g., vitals)**    | `react-query` + polling             |
| **Admin or Audit Dashboards**            | SSR + hydration with `dehydrate()`  |


## Authentication
Attribute-Based Access Control (ABAC) system for your EMR application. Here's what has been created:

### Frontend Implementation

Zustand Auth Store - Manages authentication state and provides permission checking methods
Permission Guards - React components for conditional rendering based on permissions
Updated Login Form - Now stores user permissions in Zustand on login
Permission Display - Debug component showing current user permissions
Updated Visit Page - Demonstrates permission-based UI rendering

### Key Features

Role-based access with 6 predefined roles
Department restrictions limiting access to specific departments
Attribute-based conditions including patient status, visit type, data sensitivity
Time restrictions for certain operations
Emergency access controls for critical situations
Context-aware permissions that consider multiple factors
Frontend permission guards for UI-level access control
Backend middleware for route-level protection 