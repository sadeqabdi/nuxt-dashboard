# ⚡ Quick Start Guide

Get your Nuxt 3 Dashboard up and running in 5 minutes!

---

## 🚀 Installation (2 minutes)

```bash
# 1. Navigate to project directory
cd /home/sadeq/projects/Test

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 🌐 Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You'll be automatically redirected to the login page.

---

## 🔐 Login

Use **ANY** email and password (mock authentication):

```
Email: admin@example.com
Password: password
```

Or simply:
```
Email: test@test.com
Password: 123456
```

**Note**: This is a demo application with mock authentication. Any credentials will work!

---

## 🎯 First Steps After Login

### 1. Explore the Dashboard 📊
- Navigate to `/dashboard` (auto-redirected after login)
- View statistics cards
- Check the order trends chart

### 2. Manage Users 👥
- Click "Users" in the sidebar
- Try adding a new user
- Edit an existing user
- Search for users
- Delete a user (with confirmation)

### 3. Manage Orders 📦
- Click "Orders" in the sidebar
- Filter orders by status
- Click "View Details" to see order information
- Change order status inline or in the modal

### 4. Update Your Profile 👤
- Click "Profile" in the sidebar
- Update your name and email
- Try changing the password
- Click "Logout" to test logout functionality

### 5. Toggle Dark Mode 🌙
- Click the moon/sun icon in the top bar
- Watch the entire app switch themes
- Refresh the page - your preference is saved!

---

## 🎨 Key Features to Try

### Toast Notifications
Perform any action (add user, update order, etc.) and watch toast notifications appear in the bottom-right corner.

### Global Loader
Watch the loading spinner with backdrop during async operations.

### Search & Filter
- Search users by name or email
- Filter orders by status (pending, shipped, etc.)

### Pagination
- Navigate through pages of users and orders
- Try different page numbers

### Responsive Design
- Resize your browser window
- Check mobile view (< 768px width)
- Open/close the sidebar with hamburger menu

---

## 📁 Project Structure Overview

```
Test/
├── pages/               # Routes (auto-routing)
│   ├── auth/login.vue  # Login page
│   ├── dashboard.vue   # Main dashboard
│   ├── users.vue       # User management
│   ├── orders.vue      # Order management
│   └── profile.vue     # User profile
│
├── components/          # Reusable components
│   ├── ui/             # Toast, Loader
│   ├── orders/         # Order components
│   └── users/          # User components
│
├── stores/              # Pinia state management
│   ├── auth.ts         # Authentication
│   ├── users.ts        # Users CRUD
│   └── orders.ts       # Orders CRUD
│
└── composables/         # Reusable logic
    ├── useToast.ts     # Toast notifications
    ├── useLoader.ts    # Loading indicator
    └── useApi.ts       # API client
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run typecheck        # Run TypeScript checks

# Deployment
npm run generate         # Generate static site
```

---

## 🎓 Learning Path

### Beginner (1 hour)
1. ✅ Login and explore the dashboard
2. ✅ Add/edit/delete a user
3. ✅ Change order status
4. ✅ Toggle dark mode
5. ✅ Update your profile

### Intermediate (2 hours)
1. 📖 Read `ARCHITECTURE.md`
2. 🔍 Explore the codebase structure
3. 🎨 Customize Tailwind colors in `tailwind.config.js`
4. 🧩 Create a new component
5. 📊 Modify dashboard statistics

### Advanced (4+ hours)
1. 🔌 Connect a real API (replace mock data)
2. 🧪 Add unit tests with Vitest
3. 🚀 Deploy to Vercel or Netlify
4. 🔐 Implement real JWT authentication
5. 📱 Add new features (file upload, export, etc.)

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .nuxt
npm install
```

### Build Errors
```bash
# Clear Nuxt cache
rm -rf .nuxt .output

# Rebuild
npm run build
```

### Dark Mode Not Working
- Check localStorage in DevTools
- Key should be: `theme`
- Value: `dark` or `light`

---

## 📚 Documentation

For more detailed information:

- 📖 **README.md** - Complete project overview
- 🏗️ **ARCHITECTURE.md** - System architecture
- 🧪 **TESTING_GUIDE.md** - Manual testing scenarios
- 🚀 **DEPLOYMENT.md** - Deployment strategies
- 📊 **PROJECT_SUMMARY.md** - Feature summary
- ✅ **FINAL_REPORT.md** - Completion report

---

## 💡 Quick Tips

1. **Dark Mode**: Toggle with button in topbar (persists on refresh)
2. **Toast Notifications**: Bottom-right, auto-dismiss after 4s
3. **Loading Indicator**: Shows during all async operations
4. **Validation**: Try submitting forms with empty fields
5. **Responsive**: Resize browser to see mobile layout
6. **Pagination**: Each table shows 10 items per page
7. **Search**: Real-time search in users table
8. **Logout**: Profile page or user dropdown in topbar

---

## 🎯 Common Tasks

### Add a New User
1. Go to Users page
2. Click "Add User" button
3. Fill in the form
4. Click "Add User"
5. Watch the toast notification!

### Change Order Status
1. Go to Orders page
2. Click status dropdown in table
3. Select new status
4. Status updates immediately

### Update Your Profile
1. Go to Profile page
2. Edit name or email
3. (Optional) Change password
4. Click "Save Changes"

---

## 🌟 What Makes This Special?

- ✨ **Modern Stack**: Nuxt 3 + Vue 3 + TypeScript
- 🎨 **Beautiful UI**: Tailwind CSS + Dark Mode
- 🔐 **Secure**: Route protection + Authentication
- 📱 **Responsive**: Works on all devices
- ⚡ **Fast**: Optimized build + Code splitting
- 📚 **Well-Documented**: Extensive documentation
- 🧪 **Tested**: Manual test coverage
- 🚀 **Production-Ready**: Multiple deployment options

---

## 🤝 Need Help?

1. Check the documentation files
2. Review code comments
3. Use Vue DevTools for debugging
4. Check console for errors
5. Review `TESTING_GUIDE.md` for test scenarios

---

## 🎉 You're All Set!

The application is now running. Explore, experiment, and enjoy!

For deployment instructions, see `DEPLOYMENT.md`.

**Happy Coding! 🚀**
