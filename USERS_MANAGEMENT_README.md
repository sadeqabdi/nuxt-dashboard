# 👥 Users Management System

## Overview

A complete user management system with CRUD operations, search, pagination, and toast notifications.

## ✅ Features Implemented

### **1. Pinia Store** (`/stores/users.ts`)
- ✅ **State Management**
  - users array
  - loading states
  - error handling
  - search query
  - pagination (currentPage, itemsPerPage, totalUsers)

- ✅ **Getters**
  - `filteredUsers` - Filter by search query
  - `paginatedUsers` - Paginated results
  - `totalPages` - Calculate total pages
  - `hasUsers` - Check if users exist
  - `getUserById` - Find user by ID

- ✅ **Actions**
  - `fetchUsers()` - Load all users (mock API with 8 users)
  - `addUser(userData)` - Create new user
  - `updateUser(id, userData)` - Update existing user
  - `deleteUser(id)` - Remove user
  - `setSearchQuery(query)` - Update search
  - `setPage(page)` - Navigate pages
  - `resetPagination()` - Reset to defaults

### **2. Reusable Components**

#### **UserTable.vue** (`components/users/`)
- ✅ Responsive data table
- ✅ Columns: ID, Name (with avatar), Email, Role, Actions
- ✅ Color-coded role badges (Admin, User, Guest)
- ✅ Edit and Delete action buttons
- ✅ Hover effects and transitions
- ✅ Dark mode support

#### **UserModal.vue** (`components/users/`)
- ✅ Modal for Add & Edit operations
- ✅ Form fields: Name, Email, Role
- ✅ Form validation (required fields)
- ✅ Auto-generate avatar from name
- ✅ Loading states on submit
- ✅ Smooth animations (fade & scale)
- ✅ Backdrop click to close
- ✅ Dark mode support

### **3. Users Page** (`/pages/users.vue`)
- ✅ **Search Functionality**
  - Real-time search by name, email, or role
  - Clear search button
  - Auto-reset to page 1 on search

- ✅ **Pagination**
  - Client-side pagination (10 items per page)
  - Previous/Next buttons
  - Page indicator
  - Results counter
  - Auto-adjust when deleting last item on page

- ✅ **CRUD Operations**
  - Add new user (opens modal)
  - Edit user (opens modal with pre-filled data)
  - Delete user (shows confirmation dialog)
  - Refresh users list

- ✅ **Loading States**
  - Animated spinner while fetching
  - Loading text feedback
  - Disabled buttons during operations

- ✅ **Empty States**
  - No users yet - call to action
  - No search results - helpful message
  - Beautiful icons and messaging

- ✅ **Toast Notifications**
  - Success: User added/updated/deleted
  - Error: Failed operations
  - Info: Users refreshed

- ✅ **Delete Confirmation**
  - Modal with warning icon
  - Shows user name
  - Cancel and Delete options
  - Prevents accidental deletions

## 📁 File Structure

```
stores/
  └── users.ts              # Pinia store for user management

components/
  └── users/
      ├── UserTable.vue     # Data table component
      └── UserModal.vue     # Add/Edit modal component

pages/
  └── users.vue             # Main users page
```

## 🎯 Usage

### **Accessing the Page**

Visit: `/users` or click "Users" in the sidebar

### **Adding a User**

1. Click "Add New User" button
2. Fill in the form (Name, Email, Role)
3. Click "Create"
4. Toast notification confirms success

### **Editing a User**

1. Click the Edit icon (✏️) on any user row
2. Update the form fields
3. Click "Update"
4. Toast notification confirms success

### **Deleting a User**

1. Click the Delete icon (🗑️) on any user row
2. Confirm in the dialog
3. Click "Delete"
4. Toast notification confirms success

### **Searching Users**

1. Type in the search box
2. Results filter in real-time
3. Search by name, email, or role
4. Click X to clear search

### **Pagination**

1. View 10 users per page
2. Use Previous/Next buttons
3. See current page and total pages
4. View results counter

## 🔧 API Reference

### **Pinia Store**

```typescript
// Import
import { useUsersStore } from '~/stores/users'

// Usage
const usersStore = useUsersStore()

// Fetch users
await usersStore.fetchUsers()

// Add user
await usersStore.addUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  avatar: 'https://...'
})

// Update user
await usersStore.updateUser(1, {
  name: 'John Updated',
  email: 'john.new@example.com'
})

// Delete user
await usersStore.deleteUser(1)

// Search
usersStore.setSearchQuery('john')

// Pagination
usersStore.setPage(2)

// Access data
usersStore.users              // All users
usersStore.filteredUsers      // Filtered by search
usersStore.paginatedUsers     // Current page users
usersStore.loading            // Loading state
usersStore.totalPages         // Total pages
```

### **Components**

#### UserTable
```vue
<UserTable
  :users="users"
  @edit="handleEdit"
  @delete="handleDelete"
/>
```

#### UserModal
```vue
<UserModal
  :is-open="isOpen"
  :user="selectedUser"
  :loading="loading"
  @close="handleClose"
  @submit="handleSubmit"
/>
```

## 💾 Mock Data

The store includes 8 sample users with different roles:
- 2 Admins
- 4 Users
- 2 Guests

Each user has:
- Unique ID
- Name and Email
- Role (admin/user/guest)
- Avatar (generated from UI Avatars API)

## 🎨 Styling

### Role Badges
- **Admin**: Purple
- **User**: Blue
- **Guest**: Gray

### Components
- Clean card design
- Rounded corners
- Shadow effects
- Hover states
- Smooth transitions
- Full dark mode support

## 🔄 State Flow

1. **Page Load** → `fetchUsers()` → Display table
2. **Search** → `setSearchQuery()` → Filter → Reset to page 1
3. **Add User** → Open modal → Submit → `addUser()` → Toast → Refresh table
4. **Edit User** → Open modal → Submit → `updateUser()` → Toast → Refresh table
5. **Delete User** → Confirm → `deleteUser()` → Toast → Refresh table → Adjust pagination

## ✨ Features Highlights

### Search
- Real-time filtering
- Multi-field search (name, email, role)
- Case-insensitive
- Clear button when active

### Pagination
- 10 items per page (configurable)
- Previous/Next navigation
- Page indicator
- Results counter
- Smart page adjustment after delete

### Toast Notifications
- Success messages (green)
- Error messages (red)
- Auto-dismiss (3 seconds)
- Stacked notifications
- Smooth animations

### Loading States
- Spinner during fetch
- Disabled buttons during operations
- Loading text feedback
- Skeleton screens (optional)

### Empty States
- No users: Call to action
- No search results: Helpful message
- Beautiful illustrations
- Action buttons

### Validation
- Required fields
- Email format
- Role selection (dropdown)
- Form submission protection

## 🐛 Error Handling

- Try/catch blocks in all async operations
- User-friendly error messages
- Toast notifications for errors
- Console logging for debugging
- Graceful degradation

## 📱 Responsive Design

- Mobile-first approach
- Horizontal scroll on small screens
- Stacked layout on mobile
- Touch-friendly buttons
- Optimized for all devices

## 🌙 Dark Mode

- Full dark mode support
- Theme-aware colors
- Proper contrast
- Smooth transitions
- Consistent styling

## 🚀 Performance

- Client-side pagination (fast)
- Efficient filtering with computed
- Minimal re-renders
- Lazy loading modals
- Optimized components

## 💡 Best Practices

- ✅ Component reusability
- ✅ Pinia for state management
- ✅ TypeScript for type safety
- ✅ Composition API
- ✅ Proper error handling
- ✅ Loading states
- ✅ User feedback (toasts)
- ✅ Confirmation dialogs
- ✅ Accessibility (ARIA labels)
- ✅ Clean code structure

## 🔮 Future Enhancements

- Server-side pagination
- Advanced filters (by role, status)
- Bulk operations
- CSV export
- User details page
- Activity logs
- Profile pictures upload
- Email validation
- Password management
- User permissions
- Search history
- Sorting columns

## 📊 Statistics

- **8 mock users** included
- **10 users per page**
- **3 user roles** (Admin, User, Guest)
- **2 reusable components**
- **1 Pinia store**
- **CRUD operations** fully implemented
- **100% TypeScript** typed

---

**Everything is ready to use! Visit `/users` to see it in action.** 🎉

