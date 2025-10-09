# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

## 🔐 Login

The app will redirect you to the login page. Use these credentials:

- **Email:** `admin@example.com`
- **Password:** any password (e.g., `password`)

Click "Sign in" and you'll be redirected to the dashboard!

## 📱 Features to Try

### Dark Mode
- Click the moon/sun icon in the top right to toggle dark mode
- Your preference is saved automatically

### Navigation
- Use the sidebar to navigate between pages:
  - **Dashboard** - View statistics and charts
  - **Analytics** - Detailed analytics page
  - **Users** - User management table
  - **Settings** - Configure your preferences

### Mobile View
- Resize your browser or open on mobile
- Click the hamburger menu (☰) to open the sidebar
- Sidebar automatically collapses on mobile

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#YOUR_COLOR',
    // ... etc
  }
}
```

### Add New Page
1. Create file in `pages/` directory (e.g., `pages/products.vue`)
2. Add route to sidebar in `layouts/default.vue`
3. That's it! Nuxt auto-creates the route

### Add New API Endpoint
Use the `useApi` composable:
```typescript
const api = useApi()
const data = await api.get('/your-endpoint')
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Nuxt will automatically use 3001, 3002, etc.

### CSS Not Loading
Run:
```bash
rm -rf .nuxt node_modules
npm install
npm run dev
```

### Build Errors
Make sure you're using Node.js 18 or higher:
```bash
node --version
```

## 📚 Next Steps

1. Read the full [README.md](./README.md)
2. Explore the code in `components/`, `stores/`, and `composables/`
3. Check out the [Nuxt 3 documentation](https://nuxt.com)
4. Customize the app for your needs!

## 🎯 Key Files to Know

- `nuxt.config.ts` - App configuration
- `tailwind.config.js` - Styling configuration
- `layouts/default.vue` - Main layout with sidebar
- `stores/auth.ts` - Authentication logic
- `middleware/auth.global.ts` - Route protection
- `composables/useApi.ts` - API client

## 💡 Pro Tips

1. **Auto-imports**: Components, composables, and utils are auto-imported
2. **Type Safety**: Use TypeScript for better development experience
3. **Hot Reload**: Changes auto-reload in the browser
4. **DevTools**: Press Shift + Alt + D to open Nuxt DevTools

Happy coding! 🎉

