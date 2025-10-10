# 🚀 Nuxt 3 Dashboard - Full-Stack Admin Panel

A modern, feature-rich admin dashboard built with **Nuxt 3**, **Vue 3**, **Pinia**, **Tailwind CSS**, and **TypeScript**. This project demonstrates best practices in state management, authentication, CRUD operations, and responsive design.

![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Login system with email/password validation
- ✅ JWT-like token-based authentication (mock)
- ✅ Global route protection middleware
- ✅ Automatic token persistence in localStorage
- ✅ Auto-redirect based on auth state
- ✅ Logout functionality with state cleanup

### 📊 Dashboard & Analytics
- ✅ Real-time statistics cards (Users, Revenue, Orders)
- ✅ Interactive Chart.js line charts for trends
- ✅ Responsive grid layouts
- ✅ Loading states and error handling
- ✅ Data refresh functionality

### 👥 User Management (CRUD)
- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ User table with pagination (10 items/page)
- ✅ Search/filter users by name, email, or role
- ✅ User modal for Add/Edit operations
- ✅ Delete confirmation dialog
- ✅ Role-based badges (Admin, User, Guest)
- ✅ Avatar integration with UI Avatars API

### 📦 Order Management (CRUD)
- ✅ Full CRUD for orders
- ✅ Order status management (Pending, Processing, Shipped, Delivered, Cancelled)
- ✅ Order detail modal with complete information
- ✅ Inline status updates from table
- ✅ Filter orders by status
- ✅ Pagination support
- ✅ Order items breakdown with pricing
- ✅ Shipping address and notes

### 👤 Profile Management
- ✅ Edit user information (Name, Email)
- ✅ Change password functionality
- ✅ Client-side form validation
- ✅ Profile avatar display
- ✅ User statistics
- ✅ Logout button

### 🎨 UI/UX Features
- ✅ **Dark Mode**: Full dark mode support with localStorage persistence
- ✅ **Toast Notifications**: Global toast system for success/error messages
- ✅ **Loading Indicators**: Global loader with backdrop blur
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Smooth Animations**: Transitions and micro-interactions
- ✅ **Accessible**: Keyboard navigation and ARIA labels

### 🏗️ Architecture
- ✅ **Pinia State Management**: 5 stores (auth, theme, users, orders, dashboard)
- ✅ **Composables**: Reusable logic (useToast, useLoader, useDashboard, useTheme, useApi)
- ✅ **Components**: Modular and reusable Vue components
- ✅ **TypeScript**: Full type safety
- ✅ **Middleware**: Global authentication guard
- ✅ **Layouts**: Default layout with sidebar and topbar

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (recommended: 20.x)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Login Credentials
Since this is a demo with mock authentication, **any email and password will work**. For example:
- Email: `admin@example.com`
- Password: `password`

---

## 📁 Project Structure

```
Test/
├── app.vue                      # Root component with Toast & Loader
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
│
├── assets/
│   └── css/
│       └── main.css            # Global styles and Tailwind imports
│
├── components/
│   ├── ui/
│   │   ├── Toast.vue           # Global toast notification component
│   │   └── Loader.vue          # Global loading spinner
│   ├── orders/
│   │   ├── OrderTable.vue      # Orders table component
│   │   └── OrderDetailModal.vue # Order details modal
│   ├── users/
│   │   ├── UserTable.vue       # Users table component
│   │   └── UserModal.vue       # User add/edit modal
│   ├── DashboardChart.vue      # Generic chart wrapper
│   ├── OrderTrendsChart.vue    # Order trends line chart
│   ├── StatCard.vue            # Dashboard statistics card
│   └── ThemeToggle.vue         # Dark mode toggle button
│
├── composables/
│   ├── useApi.ts               # API request wrapper (future use)
│   ├── useToast.ts             # Toast notification composable
│   ├── useLoader.ts            # Global loader composable
│   ├── useDashboard.ts         # Dashboard data fetching logic
│   └── useTheme.ts             # Theme management logic
│
├── layouts/
│   └── default.vue             # Main layout with sidebar & topbar
│
├── middleware/
│   └── auth.global.ts          # Global authentication middleware
│
├── pages/
│   ├── auth/
│   │   └── login.vue           # Login page
│   ├── dashboard.vue           # Main dashboard
│   ├── users.vue               # User management page
│   ├── orders.vue              # Order management page
│   ├── profile.vue             # User profile page
│   ├── analytics.vue           # Analytics page (placeholder)
│   └── settings.vue            # Settings page (placeholder)
│
├── stores/
│   ├── auth.ts                 # Authentication state & actions
│   ├── theme.ts                # Theme (dark/light mode) state
│   ├── users.ts                # Users CRUD state & actions
│   ├── orders.ts               # Orders CRUD state & actions
│   └── dashboard.ts            # Dashboard statistics state
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
└── public/
    ├── favicon.ico
    └── robots.txt
```

---

## 🏛️ Architecture & Design Decisions

### State Management (Pinia)
We chose **Pinia** over Vuex for several reasons:
- ✅ Better TypeScript support
- ✅ Simpler API (no mutations)
- ✅ Built-in DevTools support
- ✅ Modular store structure

**Stores:**
1. **auth.ts**: Manages authentication state, login/logout actions
2. **theme.ts**: Handles dark/light mode with localStorage sync
3. **users.ts**: Complete CRUD operations for users with pagination/search
4. **orders.ts**: Full order management with status updates and filtering
5. **dashboard.ts**: Dashboard statistics and data fetching

### Composables Pattern
Composables encapsulate reusable logic and keep components clean:
- **useToast**: Global notification system
- **useLoader**: Global loading indicator
- **useDashboard**: Dashboard data fetching with error handling
- **useTheme**: Theme switching logic
- **useApi**: Centralized API calls (extendable for real APIs)

### Component Architecture
- **Atomic Design**: Small, reusable components
- **Smart/Dumb Pattern**: Pages are smart (contain logic), components are dumb (presentational)
- **Single Responsibility**: Each component has one clear purpose

### Middleware
- **auth.global.ts**: Runs on every route change
  - Checks authentication state
  - Redirects unauthenticated users to login
  - Prevents authenticated users from accessing login
  - Handles root path (`/`) based on auth state

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Class-based dark mode (`dark:` prefix)
- **Responsive**: Mobile-first design with breakpoints
- **Custom Theme**: Extended color palette in `tailwind.config.js`

### Type Safety
- **TypeScript**: Used throughout for type safety
- **Type Definitions**: Centralized in `types/index.ts`
- **Interface-First**: Define interfaces before implementation

---

## 🎯 Key Features Explained

### 🔐 Authentication Flow
1. User enters email/password on `/auth/login`
2. Mock API validates (any credentials accepted)
3. Token and user data saved to localStorage
4. User redirected to `/dashboard`
5. Middleware checks token on every route
6. Logout clears localStorage and redirects to login

### 📊 CRUD Operations

#### Users CRUD
- **Create**: Open modal, fill form, click "Add User"
- **Read**: View users in table with pagination
- **Update**: Click "Edit", modify fields, click "Save"
- **Delete**: Click "Delete", confirm in dialog

#### Orders CRUD
- **Create**: Not implemented (would be done by customers)
- **Read**: View orders with filtering and pagination
- **Update**: Change order status from dropdown or modal
- **Delete**: Not implemented (orders typically archived, not deleted)

### 🎨 Toast System
Global notification system with 4 types:
```typescript
const toast = useToast()

toast.success('User created successfully')
toast.error('Failed to load data')
toast.warning('Please save your changes')
toast.info('New feature available')
```

### 🔄 Loading States
Global loader shows during async operations:
```typescript
const loader = useLoader()

loader.show('Loading users...')
// ... async operation
loader.hide()
```

---

## 🧪 Testing

### Manual Testing Checklist

#### ✅ Route Protection
- [ ] Access `/dashboard` without login → Redirected to `/auth/login`
- [ ] Login → Redirected to `/dashboard`
- [ ] Access `/auth/login` when logged in → Redirected to `/dashboard`
- [ ] Logout → Redirected to `/auth/login`

#### ✅ User CRUD
- [ ] View users list
- [ ] Search users by name
- [ ] Add new user
- [ ] Edit existing user
- [ ] Delete user with confirmation
- [ ] Pagination works correctly

#### ✅ Order Management
- [ ] View all orders
- [ ] Filter orders by status
- [ ] Change order status inline
- [ ] View order details in modal
- [ ] Update status from modal
- [ ] Pagination works

#### ✅ Profile
- [ ] Update name and email
- [ ] Change password (with confirmation)
- [ ] Validation errors display
- [ ] Logout button works

#### ✅ Dark Mode
- [ ] Toggle dark mode
- [ ] Preference persists on refresh
- [ ] All pages support dark mode

---

## 🚀 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates a `.output` directory with:
- Server files (for SSR)
- Static assets
- Optimized and minified code

### Preview Production Build

```bash
npm run preview
```

### Deploy Options

#### 1. **Vercel** (Recommended for Nuxt)
```bash
npm install -g vercel
vercel
```

#### 2. **Netlify**
```bash
npm run build
# Upload .output/public to Netlify
```

#### 3. **Node.js Server**
```bash
npm run build
node .output/server/index.mjs
```

#### 4. **Docker**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate` - Generate static site
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Environment Variables
Create a `.env` file in the root:
```env
# API Base URL (for future real API integration)
NUXT_PUBLIC_API_BASE_URL=https://api.example.com

# Enable debug mode
NUXT_PUBLIC_DEBUG=false
```

---

## 📚 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Nuxt 3 | 3.x | Vue meta-framework with SSR |
| Vue 3 | 3.x | Progressive JavaScript framework |
| TypeScript | 5.x | Type-safe JavaScript |
| Pinia | 2.x | State management |
| Tailwind CSS | 3.x | Utility-first CSS |
| Chart.js | 4.x | Data visualization |
| Heroicons | 2.x | Beautiful SVG icons |

---

## 🔮 Future Enhancements

- [ ] Real API integration (replace mock data)
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Multi-language support (i18n)
- [ ] Email notifications
- [ ] File upload for avatars
- [ ] Export data to CSV/PDF
- [ ] Advanced search and filters
- [ ] Real-time updates with WebSocket
- [ ] Role-based permissions
- [ ] Audit logs
- [ ] Two-factor authentication

---

## 📝 Notes

### Mock Data
- All API calls are currently mocked with `setTimeout`
- Real API integration can be added by implementing `composables/useApi.ts`
- Mock delays are set to 800-1500ms to simulate real network latency

### Authentication
- Current implementation uses localStorage (suitable for demo)
- For production, consider:
  - HTTP-only cookies for tokens
  - Refresh token mechanism
  - Token expiration handling
  - CSRF protection

### Styling Conventions
- Use Tailwind utility classes
- Dark mode classes: `dark:bg-gray-800`
- Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Custom colors defined in `tailwind.config.js`

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ using Nuxt 3 and Vue 3

---

## 🙏 Acknowledgments

- [Nuxt Documentation](https://nuxt.com)
- [Vue.js Documentation](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Chart.js](https://www.chartjs.org)
- [Heroicons](https://heroicons.com)

---

**Happy Coding! 🚀**
