<div align="center">

# 🧺 বাজার দর | BazarDor

**প্রতিদিনের বাজারের দাম, এক নজরে।**
Track daily grocery prices in Bangladesh, see what went up or down, and compare against yesterday, last week and last month.

🔗 **Live Demo:** [b14-a07-next-authentication.vercel.app](https://b14-a07-next-authentication.vercel.app/)

</div>

---

## 📖 About

**BazarDor (বাজার দর)** is a Bengali-first web app that helps people keep an eye on everyday market prices. It shows today's price for each product, how it changed compared with earlier days, and which items got more expensive or cheaper today. Users can create an account, sign in and manage their profile.

## 🛠️ Technologies Used

| Area | Tech |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript, React |
| Styling | Tailwind CSS |
| Authentication | [Better Auth](https://www.better-auth.com/) |
| Database | MongoDB (Better Auth MongoDB adapter) |
| Notifications | react-toastify |
| Data source | Programming Hero BazarDor Open API |
| Deployment | Vercel |

## ✨ Key Features

1. **📈 Live price overview**: every product shows today's price along with yesterday, last week and last month for easy comparison.
2. **🔺🔻 Daily price movers**: dedicated "আজ দাম বেড়েছে" and "আজ দাম কমেছে" sections list the products with the biggest percentage change today.
3. **🗂️ Category browsing**: browse products by category (`/category/[slug]`) from a scrollable category bar with icons and Bengali names.
4. **🔐 Secure authentication**: sign up and sign in with email and password, powered by Better Auth and MongoDB, with session-aware navbar and a user dropdown menu.
5. **👤 Profile management**: a profile page where signed-in users can view their account details, update their name and sign out, with friendly toast notifications and a custom 404 page.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rafayelparvez/B14-A07-Next-Authentication.git
cd B14-A07-Next-Authentication
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root. Use the same variable names your `src/lib/auth.ts` and `src/lib/mongodb.ts` read:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=a_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```text
src/
├─ app/
│  ├─ api/auth/[...all]/   # Better Auth API handler
│  ├─ sign-in/             # Sign in page
│  ├─ sign-up/             # Sign up page
│  ├─ profile/             # User profile page
│  ├─ category/[slug]/     # Category product listing
│  ├─ products/            # Products pages
│  └─ not-found.tsx        # Custom 404 page
├─ components/
│  ├─ auth/                # Auth forms and layout
│  ├─ profile/             # ProfileHeader, ProfileForm, ProfileSkeleton
│  ├─ products/            # Price movement sections and product cards
│  ├─ Navbar.tsx
│  └─ UserMenu.tsx
├─ context/                # BazardorContext (shared product data)
└─ lib/                    # mongodb, auth, auth-client, toast helpers
```

## 🌐 Data Source

Product and category data comes from the Programming Hero BazarDor Open API:
`https://openapi.programming-hero.com/api/bazardor`

## 👤 Author

**Parvez Mosharaf**
GitHub: [@rafayelparvez](https://github.com/rafayelparvez)

---

<div align="center">

Made with 💚 in Bangladesh

</div>