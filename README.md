# Nuxt 3 Dashboard - Clean Architecture

A modern, production-ready Nuxt 3 dashboard application with clean architecture, featuring authentication, state management, charts, and dark mode support.

## 🚀 Features

- ✅ **Nuxt 3** - Latest version with best practices
- 🎨 **Tailwind CSS** - With dark mode support
- 🗃️ **Pinia** - State management
- 📊 **Chart.js** - Interactive charts and analytics
- 🔐 **Authentication** - Global middleware for route protection
- 📱 **Responsive** - Mobile-first design with sidebar and topbar
- 🌓 **Dark Mode** - System preference detection with manual toggle
- 🔧 **ESLint + Prettier** - Code quality and formatting
- 🧩 **Component-based** - Reusable UI components
- 🎯 **TypeScript** - Full type safety

## 📁 Project Structure

```
/home/sadeq/projects/Test/
├── app.vue                    # Main app component
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.js        # Tailwind configuration
├── .eslintrc.cjs             # ESLint configuration
├── .prettierrc               # Prettier configuration
│
├── assets/
│   └── css/
│       └── main.css          # Global styles and Tailwind directives
│
├── components/
│   ├── ThemeToggle.vue       # Dark mode toggle component
│   ├── StatCard.vue          # Dashboard statistics card
│   └── DashboardChart.vue    # Chart.js wrapper component
│
├── composables/
│   ├── useApi.ts             # Axios API wrapper with interceptors
│   └── useToast.ts           # Toast notifications utility
│
├── layouts/
│   └── default.vue           # Main layout with sidebar and topbar
│
├── middleware/
│   └── auth.global.ts        # Global authentication middleware
│
├── pages/
│   ├── index.vue             # Dashboard home page
│   ├── login.vue             # Login page
│   ├── analytics.vue         # Analytics page
│   ├── users.vue             # Users management page
│   └── settings.vue          # Settings page
│
├── stores/
│   ├── auth.ts               # Authentication store
│   ├── theme.ts              # Theme/dark mode store
│   └── dashboard.ts          # Dashboard data store
│
└── types/
    └── index.ts              # TypeScript type definitions
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## 🔑 Authentication

The app includes a mock authentication system. Use these credentials to login:

- **Email:** admin@example.com
- **Password:** (any password)

The authentication middleware (`middleware/auth.global.ts`) protects all routes except:
- `/login`
- `/register`
- `/forgot-password`

## 📊 Pages Overview

### Dashboard (`/`)
- Overview statistics cards
- Revenue, users, projects, and tasks metrics
- Multiple interactive charts (Line, Bar, Doughnut, Pie)
- Responsive grid layout

### Analytics (`/analytics`)
- Website traffic analysis
- Device distribution
- User engagement metrics
- Conversion rate tracking

### Users (`/users`)
- User management table
- Role-based badges
- CRUD operations UI
- Sortable and filterable data

### Settings (`/settings`)
- Profile management
- Theme preferences
- Security settings
- Notification preferences

## 🎨 Theme System

The app supports light and dark modes:

```typescript
// Use the theme store
const themeStore = useThemeStore()

// Toggle theme
themeStore.toggleTheme()

// Set specific theme
themeStore.setTheme(true)  // Dark mode
themeStore.setTheme(false) // Light mode
```

The theme preference is:
1. Saved to localStorage
2. Applied automatically on page load
3. Synced with system preferences (if no saved preference)

## 📦 State Management (Pinia)

### Auth Store (`stores/auth.ts`)
```typescript
const authStore = useAuthStore()

// Login
await authStore.login(email, password)

// Logout
await authStore.logout()

// Check auth status
await authStore.checkAuth()

// Update user
authStore.updateUser({ name: 'New Name' })
```

### Theme Store (`stores/theme.ts`)
```typescript
const themeStore = useThemeStore()

// Access state
themeStore.isDark
themeStore.theme  // 'dark' | 'light'

// Methods
themeStore.toggleTheme()
themeStore.setTheme(isDark)
themeStore.initTheme()
```

### Dashboard Store (`stores/dashboard.ts`)
```typescript
const dashboardStore = useDashboardStore()

// Fetch stats
await dashboardStore.fetchStats()

// Access data
dashboardStore.stats
dashboardStore.isLoading
```

## 🔧 API Integration

The `useApi` composable provides a configured Axios instance:

```typescript
const api = useApi()

// GET request
const data = await api.get('/endpoint')

// POST request
const result = await api.post('/endpoint', { data })

// PUT request
await api.put('/endpoint/:id', { data })

// DELETE request
await api.delete('/endpoint/:id')
```

Features:
- Automatic token injection
- Request/response interceptors
- Error handling
- 401 auto-logout

## 🎯 Components

### StatCard
```vue
<StatCard
  title="Total Users"
  :value="1234"
  :icon="UserGroupIcon"
  color="blue"
  :change="12.5"
/>
```

### DashboardChart
```vue
<DashboardChart
  title="Revenue Overview"
  :data="chartData"
  type="line"
/>
```

### ThemeToggle
```vue
<ThemeToggle />
```

## 🧪 Code Quality

### ESLint
```bash
npm run lint
```

### Prettier
```bash
npm run format
```

## 🚀 Deployment

### Static Hosting (Netlify, Vercel, etc.)
```bash
npm run generate
```

### Node.js Server
```bash
npm run build
npm run preview
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", ".output/server/index.mjs"]
```

## 📝 Environment Variables

Create a `.env` file:

```env
API_BASE_URL=https://api.example.com
API_SECRET=your-secret-key
NODE_ENV=development
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Layout
Modify `layouts/default.vue` to customize:
- Sidebar width
- Header height
- Navigation items
- Branding

## 📚 Tech Stack

- **Framework:** Nuxt 3
- **UI Framework:** Tailwind CSS
- **State Management:** Pinia
- **Charts:** Chart.js
- **HTTP Client:** Axios
- **Icons:** Heroicons Vue
- **Code Quality:** ESLint + Prettier
- **Language:** TypeScript

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

Built with ❤️ using Nuxt 3 and modern web technologies.
