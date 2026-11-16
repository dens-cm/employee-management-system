# Employee Management System (Template)
A starter template built with **React**, **TypeScript**, **Vite**, **Chakra UI v3**, **React Router DOM**, and **Supabase** (`@/*` path alias preconfigured).
---
Feel free to redesign the entire interface.
---

## Available Paths

| Path | Page / Behavior | File |
| --- | --- | --- |
| `/login` | Login page (standalone) | `src/pages/Authentication/Login.tsx` |
| `/dashboard` | Dashboard page (with navbar) | `src/pages/Protected/Dashboard.tsx` |
| `/employees` | Employees list & CRUD (with navbar) | `src/pages/Protected/Employees.tsx` |
| `/users` | Users list & Add User (with navbar) | `src/pages/Protected/Users.tsx` |
| `/` & `*` | Redirects to `/dashboard` | `src/routes/Router.tsx` |

---

## 1. Clone & Install

```bash
git clone <repository-url>
cd "Employee Management System"
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 2. Set Up Supabase & Get Your API Keys

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. In your project dashboard, open **Project Settings** (gear icon) → **API**.
3. Copy the following values (you'll paste this on ".env" file):
   - **Project URL** → used for `VITE_SUPABASE_URL`
   - **anon / public** API key → used for `VITE_SUPABASE_ANON_KEY`

## 3. Configure `.env`

Create a `.env` file in the project root (never commit `.env` to GitHub — it is already listed in `.gitignore`):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

---

### Create the `ems-employees` Table

Open the **SQL Editor** in Supabase and run:

```sql
create table if not exists public."ems-employees" (
    id uuid primary key default gen_random_uuid(),
    f_name text not null,
    m_name text default '',
    l_name text not null,
    ext_name text default '',
    email text not null,
    phone text not null,
    created_at timestamptz not null default now()
);

alter table public."ems-employees" enable row level security;

create policy "Allow public read on ems-employees"
    on public."ems-employees" for select
    to anon, authenticated
    using (true);

create policy "Allow public insert on ems-employees"
    on public."ems-employees" for insert
    to anon, authenticated
    with check (true);

create policy "Allow public update on ems-employees"
    on public."ems-employees" for update
    to anon, authenticated
    using (true)
    with check (true);

create policy "Allow public delete on ems-employees"
    on public."ems-employees" for delete
    to anon, authenticated
    using (true);

notify pgrst, 'reload schema';
```

### Create the `ems-users` Table

```sql
create table if not exists public."ems-users" (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null unique,
    is_admin boolean not null default false,
    created_at timestamptz not null default now()
);

alter table public."ems-users" enable row level security;

create policy "Allow public read on ems-users"
    on public."ems-users" for select
    to anon, authenticated
    using (true);

create policy "Allow public insert on ems-users"
    on public."ems-users" for insert
    to anon, authenticated
    with check (true);

create policy "Allow public update on ems-users"
    on public."ems-users" for update
    to anon, authenticated
    using (true)
    with check (true);

create policy "Allow public delete on ems-users"
    on public."ems-users" for delete
    to anon, authenticated
    using (true);

notify pgrst, 'reload schema';
```

### Seed Sample Data (Optional)

```sql
insert into public."ems-employees" (f_name, m_name, l_name, ext_name, email, phone) values
    ('Juan', 'Santos', 'Dela Cruz', 'Jr.', 'juan.delacruz@company.com', '09171234567'),
    ('Maria', 'Luna', 'Reyes', '', 'maria.reyes@company.com', '09182345678'),
    ('Carlos', '', 'Mendoza', '', 'carlos.mendoza@company.com', '09193456789'),
    ('Angela', 'Villanueva', 'Bautista', 'III', 'angela.bautista@company.com', '09204567890'),
    ('Mark Anthony', 'Ramos', 'Garcia', '', 'mark.garcia@company.com', '09215678901');
```

---

## 4. Push to Your Own GitHub Account

1. Create a new empty repository on [GitHub](https://github.com/new) (do **not** initialize with a README).
2. In your project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## 5. Tasks

### Part 1: Technical Implementation (20%)

- **1. Setup Authentication** — Implement user authentication (login/logout and protected routes).
- **2. Role-Based Access** — Allow `admin` users to view all columns on the Employees page (hide `email` and `phone` for non-admin users), and restrict the **Users** page so only `admin` users can see and access it.
- **3. Encrypt `phone` Field** — Encrypt the `phone` value before saving or updating it in the database.
- **4. Employee Form Input Validation** — Apply proper input validation on the employee Add/Update form if needed.

### Part 2: Qualitative Risk Assessment Plan (20%)

- **1. Qualitative Risk Assessment Plan (5×5 Likelihood–Impact Matrix)** — Document a Qualitative Risk Assessment Plan for the Employee Management System (in a `RISK_ASSESSMENT.md` file or report) covering:
  > **Note:** You are free to add new columns to `ems-employees` (e.g., `department`, `position`, `salary`, `address`), as long as every added column is also included and assessed in your Qualitative Risk Assessment Plan.
  1. **Context & Asset Identification:** Inventory key assets (`ems-employees` table, `email` and `phone` SPI fields, any custom columns you added, Login/Authentication flow, Supabase REST API).
  2. **Threat & Vulnerability Analysis:** Pair each asset with realistic threats and vulnerabilities (e.g., unauthorized access to `email`/`phone`, unencrypted `phone` stored in DB, unvalidated form inputs, missing API rate limiting).
  3. **5×5 Risk Scoring & Prioritization:** Score each scenario using **Likelihood (1–5)** × **Impact (1–5)** = **Score (1–25)** and classify by **Rating & Action Threshold** (`Low: 1–4`, `Medium: 5–9`, `High: 10–15`, `Critical: 16–25`).
  4. **Justification & Defense:** Provide a brief explanation of *why* you created this Qualitative Risk Assessment Plan and *why* you assigned those Likelihood and Impact ratings—be ready to defend your scoring, prioritization, and chosen controls for the Employee Management System.

  | Asset & Threat Scenario | Likelihood (1–5) | Impact (1–5) | Score (L × I) | Rating & Action | Justification / Rationale |
  | --- | --- | --- | --- | --- | --- |
  | Example: `ems-employees` — Unencrypted `phone` exposed | 3 (Possible) | 4 (Major) | 12 | High — Fix within 30 days | Phone numbers are SPI; exposure risks privacy breach, so encrypting `phone` and restricting non-admin access is prioritized. |

---

## 6. Deploy on Render (Static Site)

1. Go to [Render](https://render.com/) (create account using your github if you don't have account) and click **New +** → **Static Site**.
2. Connect your GitHub repository.
3. Configure the build settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Open **Environment** (under Manage) and add your `.env` variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy Static Site**.

### Add Redirect / Rewrite Rule (Required for React Router)

Because this is a Single Page Application (SPA), direct visits or page refreshes on routes like `/dashboard` or `/employees` need to be rewritten to `/index.html`:

1. In your Render Static Site dashboard, go to **Manage → Redirects/Rewrites**.
2. Click **+ Add Rule** and set:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
3. Click **Save Changes**.

---

## 7. Grading Rubric (40 Points Total)

### Part 1: Technical Implementation (Tasks 1–4) — 20 Points

| Criteria | Max | Excellent | Satisfactory | Needs Improvement | Missing |
| --- | --- | --- | --- | --- | --- |
| **1. Setup Authentication** | 5 pts | **5** — Login/logout and protected routes work cleanly without bypasses. | **3** — Login/logout works, but protected route redirects have minor gaps. | **1** — Partial login UI only or broken session handling. | **0** — Not implemented. |
| **2. Role-Based Access** | 5 pts | **5** — `admin` sees all columns and **Users** page; non-admin hides `email`/`phone` and cannot access **Users**. | **3** — Works on Employees or Users page, but not both. | **1** — UI hides elements inconsistently or routes remain accessible. | **0** — Not implemented. |
| **3. Encrypt `phone` Field** | 5 pts | **5** — `phone` is encrypted before both insert and update in the database. | **3** — Encrypted on insert or update, but not both. | **1** — Weak/incomplete encoding or not persisted to DB. | **0** — Stored in plaintext. |
| **4. Employee Form Input Validation** | 5 pts | **5** — Form validates required fields and formats cleanly with clear user feedback. | **3** — Basic validation works, but edge cases or feedback are incomplete. | **1** — Minimal HTML/browser validation only. | **0** — No validation. |

### Part 2: Qualitative Risk Assessment Plan (Task 1) — 20 Points

| Criteria | Max | Excellent | Satisfactory | Needs Improvement | Missing |
| --- | --- | --- | --- | --- | --- |
| **1. 5×5 Matrix, Assets & Threats** | 10 pts | **10** — Complete asset inventory (including any custom columns added), realistic threats/vulnerabilities, accurate `L × I` scores, and proper action thresholds. | **6** — Most assets and threats covered, but some custom columns, scores, or thresholds are incomplete. | **3** — Incomplete matrix, missing assets/custom columns, or incorrect `L × I` scoring. | **0** — Not submitted. |
| **2. Justification & Defense** | 10 pts | **10** — Clear, well-reasoned explanation of *why* the plan and ratings were chosen; confidently defends prioritization and controls. | **6** — Basic explanation provided, but reasoning for specific scores or priorities is surface-level. | **3** — Minimal explanation or unable to defend Likelihood/Impact ratings. | **0** — Missing or no defense. |