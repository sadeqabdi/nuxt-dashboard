# 🧪 Testing Guide

## Manual Testing Checklist

This document provides a comprehensive manual testing checklist for the Nuxt 3 Dashboard application.

---

## 🔐 Authentication & Route Protection

### Test Scenario 1: Unauthenticated Access
**Steps:**
1. Open browser in incognito mode
2. Navigate to `http://localhost:3000`

**Expected Result:**
- ✅ Automatically redirected to `/auth/login`

**Steps:**
1. Try to access `http://localhost:3000/dashboard`
2. Try to access `http://localhost:3000/users`
3. Try to access `http://localhost:3000/orders`
4. Try to access `http://localhost:3000/profile`

**Expected Result:**
- ✅ All attempts redirect to `/auth/login`
- ✅ Toast shows: "Please login to continue" or similar

---

### Test Scenario 2: Login Flow
**Steps:**
1. Navigate to `/auth/login`
2. Enter email: `test@example.com`
3. Enter password: `password`
4. Click "Sign In"

**Expected Result:**
- ✅ Loading state shows on button
- ✅ Global loader appears with "Logging in..." text
- ✅ After 1 second, success toast appears: "Login successful! Redirecting..."
- ✅ Redirected to `/dashboard`
- ✅ Token saved in localStorage (`auth_token`)
- ✅ User data saved in localStorage (`user`)

---

### Test Scenario 3: Authenticated Access to Login
**Steps:**
1. Already logged in
2. Try to navigate to `/auth/login`

**Expected Result:**
- ✅ Automatically redirected to `/dashboard`
- ✅ Cannot access login page while authenticated

---

### Test Scenario 4: Logout Flow
**Steps:**
1. While logged in, navigate to `/profile`
2. Click red "Logout" button

**Expected Result:**
- ✅ Toast appears: "Logging out..."
- ✅ Global loader shows with "Logging out..." text
- ✅ Redirected to `/auth/login`
- ✅ localStorage cleared (`auth_token` and `user` removed)
- ✅ Cannot access protected routes anymore

---

### Test Scenario 5: Token Persistence
**Steps:**
1. Login to the application
2. Refresh the page (F5)

**Expected Result:**
- ✅ User remains logged in
- ✅ State restored from localStorage
- ✅ No redirect to login

**Steps:**
1. Close browser tab
2. Reopen browser
3. Navigate to `http://localhost:3000`

**Expected Result:**
- ✅ User remains logged in if localStorage not cleared
- ✅ Redirected to dashboard

---

## 👥 User Management (CRUD)

### Test Scenario 6: View Users List
**Steps:**
1. Login and navigate to `/users`

**Expected Result:**
- ✅ Global loader shows: "Loading users..."
- ✅ After 1 second, users table displays
- ✅ Shows 8 default users
- ✅ Each user has: ID, Avatar, Name, Email, Role, Actions
- ✅ Pagination shows "Page 1 of 1"

---

### Test Scenario 7: Search Users
**Steps:**
1. On `/users`, type "John" in search box

**Expected Result:**
- ✅ Table filters to show only "John Doe"
- ✅ Pagination updates: "Showing 1 of 1 users"

**Steps:**
1. Clear search box

**Expected Result:**
- ✅ All users displayed again

---

### Test Scenario 8: Add New User
**Steps:**
1. On `/users`, click "Add User" button
2. Modal opens
3. Fill in:
   - Name: "Test User"
   - Email: "test@test.com"
   - Role: "user"
4. Click "Add User"

**Expected Result:**
- ✅ Global loader shows: "Loading users..."
- ✅ After 800ms, modal closes
- ✅ Success toast: "User Test User added successfully!"
- ✅ New user appears in table
- ✅ Total users count increases

---

### Test Scenario 9: Edit User
**Steps:**
1. On `/users`, find "John Doe"
2. Click "Edit" button
3. Modal opens with pre-filled data
4. Change name to "John Smith"
5. Click "Update User"

**Expected Result:**
- ✅ Global loader shows
- ✅ After 800ms, modal closes
- ✅ Success toast: "User John Smith updated successfully!"
- ✅ User name updated in table

---

### Test Scenario 10: Delete User
**Steps:**
1. On `/users`, find a user
2. Click "Delete" button
3. Confirmation dialog appears
4. Click "Delete" in dialog

**Expected Result:**
- ✅ Global loader shows
- ✅ After 600ms, dialog closes
- ✅ Success toast: "User [name] deleted successfully!"
- ✅ User removed from table
- ✅ Total users count decreases

**Steps:**
1. Click "Delete" on a user
2. Click "Cancel" in dialog

**Expected Result:**
- ✅ Dialog closes
- ✅ No changes made
- ✅ User still in table

---

### Test Scenario 11: User Validation
**Steps:**
1. Click "Add User"
2. Try to submit with empty name
3. Fill name with "A" (1 character)
4. Try invalid email: "notanemail"

**Expected Result:**
- ✅ Error toast: "Please fix the validation errors"
- ✅ "Name is required" error shows
- ✅ "Name must be at least 2 characters" error shows
- ✅ "Please enter a valid email" error shows
- ✅ Form cannot be submitted

---

### Test Scenario 12: User Pagination
**Steps:**
1. On `/users` (need 10+ users for this)
2. If less than 10 users, add more
3. Check pagination controls

**Expected Result:**
- ✅ Shows 10 users per page
- ✅ "Next" button works
- ✅ "Previous" button works
- ✅ Page numbers clickable
- ✅ Current page highlighted

---

## 📦 Order Management

### Test Scenario 13: View Orders List
**Steps:**
1. Navigate to `/orders`

**Expected Result:**
- ✅ Global loader: "Loading orders..."
- ✅ After 1 second, orders table displays
- ✅ Shows 8 default orders
- ✅ Each order has: Order ID, User (with avatar), Amount, Date, Status, Actions
- ✅ Status badges have correct colors

---

### Test Scenario 14: Filter Orders by Status
**Steps:**
1. On `/orders`, note the stats cards at top
2. Click on "pending" card

**Expected Result:**
- ✅ Table filters to show only pending orders
- ✅ Status filter dropdown updates to "Pending"
- ✅ Page resets to 1
- ✅ Stats card has blue ring around it

**Steps:**
1. Try each status: processing, shipped, delivered, cancelled

**Expected Result:**
- ✅ Each filter works correctly
- ✅ Only orders with that status show

**Steps:**
1. Select "All Orders" from dropdown

**Expected Result:**
- ✅ All orders displayed again

---

### Test Scenario 15: Change Order Status (Inline)
**Steps:**
1. On `/orders`, find a pending order
2. Click the status dropdown in the table row
3. Select "processing"

**Expected Result:**
- ✅ Global loader shows briefly
- ✅ After 800ms, status updates in table
- ✅ Success toast: "Order #[id] status updated to processing"
- ✅ Status badge color changes

---

### Test Scenario 16: View Order Details
**Steps:**
1. On `/orders`, click "View Details" for any order
2. Modal opens

**Expected Result:**
- ✅ Modal shows:
  - Customer info with avatar
  - Order date and last updated
  - Current status (changeable)
  - Total amount
  - Shipping address (if available)
  - List of order items with prices
  - Total calculation
  - Notes (if available)
- ✅ All information formatted correctly

---

### Test Scenario 17: Change Order Status (Modal)
**Steps:**
1. Open order detail modal
2. Change status dropdown to "shipped"

**Expected Result:**
- ✅ Global loader shows
- ✅ After 800ms, status updates
- ✅ Success toast: "Order #[id] status updated to shipped"
- ✅ Status badge in modal updates
- ✅ Status in table also updates

**Steps:**
1. Close modal
2. Check table

**Expected Result:**
- ✅ Status persisted in table

---

### Test Scenario 18: Order Status Colors
**Steps:**
1. View orders with different statuses

**Expected Result:**
- ✅ Pending: Yellow/amber badge
- ✅ Processing: Blue badge
- ✅ Shipped: Purple badge
- ✅ Delivered: Green badge
- ✅ Cancelled: Red badge
- ✅ Colors work in both light and dark mode

---

### Test Scenario 19: Order Pagination
**Steps:**
1. On `/orders`, check pagination
2. If needed, change items per page (currently 10)

**Expected Result:**
- ✅ Pagination controls work
- ✅ Page navigation updates table
- ✅ Filtered results also paginate correctly

---

## 👤 Profile Management

### Test Scenario 20: View Profile
**Steps:**
1. Navigate to `/profile`

**Expected Result:**
- ✅ Left card shows:
  - User avatar
  - User name
  - User email
  - Role badge
  - Mock stats (Orders: 24, Reviews: 48)
  - Logout button
- ✅ Right card shows edit form with current user data

---

### Test Scenario 21: Update Profile Info
**Steps:**
1. On `/profile`, change name to "New Name"
2. Change email to "newemail@example.com"
3. Click "Save Changes"

**Expected Result:**
- ✅ Global loader: "Updating profile..."
- ✅ After 1.5 seconds, form updates
- ✅ Success toast: "Profile updated successfully!"
- ✅ Left card updates with new name/email
- ✅ Sidebar user info updates
- ✅ localStorage updated

---

### Test Scenario 22: Change Password
**Steps:**
1. On `/profile`, fill:
   - Current Password: "oldpass"
   - New Password: "newpass123"
   - Confirm Password: "newpass123"
2. Click "Save Changes"

**Expected Result:**
- ✅ Global loader shows
- ✅ Success toast appears
- ✅ Password fields cleared after success

**Steps:**
1. Fill passwords but make them not match
2. Try to save

**Expected Result:**
- ✅ Error: "Passwords do not match"
- ✅ Cannot submit

**Steps:**
1. Try password less than 6 characters

**Expected Result:**
- ✅ Error: "New password must be at least 6 characters"

---

### Test Scenario 23: Profile Validation
**Steps:**
1. Clear name field
2. Try to save

**Expected Result:**
- ✅ Error: "Name is required"

**Steps:**
1. Enter invalid email

**Expected Result:**
- ✅ Error: "Please enter a valid email"

---

### Test Scenario 24: Cancel Changes
**Steps:**
1. Change name and email
2. Click "Cancel"

**Expected Result:**
- ✅ Form resets to original values
- ✅ No API call made
- ✅ No toast shown

---

## 📊 Dashboard

### Test Scenario 25: Dashboard Load
**Steps:**
1. Navigate to `/dashboard`

**Expected Result:**
- ✅ Global loader: "Loading dashboard data..."
- ✅ Stats cards show:
  - Total Users: 1,234
  - Total Revenue: $45,678
  - Total Orders: [number]
- ✅ Line chart displays order trends
- ✅ All data loads after ~1 second

---

### Test Scenario 26: Dashboard Refresh
**Steps:**
1. On `/dashboard`, look for refresh button
2. Click refresh (if available)

**Expected Result:**
- ✅ Global loader shows
- ✅ Data reloads
- ✅ Success toast: "Dashboard refreshed successfully"

---

## 🎨 UI/UX Features

### Test Scenario 27: Dark Mode Toggle
**Steps:**
1. Click dark mode toggle in topbar

**Expected Result:**
- ✅ Entire app switches to dark theme
- ✅ All pages support dark mode
- ✅ Charts update colors
- ✅ Preference saved to localStorage

**Steps:**
1. Refresh page

**Expected Result:**
- ✅ Dark mode persists

**Steps:**
1. Toggle back to light mode

**Expected Result:**
- ✅ Smooth transition to light theme

---

### Test Scenario 28: Responsive Design
**Steps:**
1. Resize browser to mobile width (< 768px)

**Expected Result:**
- ✅ Sidebar becomes hidden
- ✅ Hamburger menu appears
- ✅ Tables scroll horizontally
- ✅ Cards stack vertically
- ✅ Modals fit screen

**Steps:**
1. Click hamburger menu

**Expected Result:**
- ✅ Sidebar slides in from left
- ✅ Backdrop appears
- ✅ Click backdrop to close

---

### Test Scenario 29: Toast Notifications
**Steps:**
1. Trigger various actions (add user, update order, etc.)

**Expected Result:**
- ✅ Toasts appear in bottom-right
- ✅ Success toasts are green
- ✅ Error toasts are red
- ✅ Info toasts are blue
- ✅ Toasts auto-dismiss after 4 seconds
- ✅ Multiple toasts stack vertically
- ✅ Can manually close with X button
- ✅ Smooth slide-in animation

---

### Test Scenario 30: Global Loader
**Steps:**
1. Perform any async operation

**Expected Result:**
- ✅ Loader appears with backdrop
- ✅ Shows spinner animation
- ✅ Shows contextual text
- ✅ Blocks interaction during loading
- ✅ Smooth fade in/out

---

### Test Scenario 31: Sidebar Navigation
**Steps:**
1. Click each sidebar link:
   - Dashboard
   - Users
   - Orders
   - Profile
   - Analytics
   - Settings

**Expected Result:**
- ✅ Each link navigates correctly
- ✅ Active link highlighted
- ✅ Icon and text visible
- ✅ Smooth transitions

---

### Test Scenario 32: User Dropdown (Topbar)
**Steps:**
1. Click user avatar in topbar

**Expected Result:**
- ✅ Dropdown menu opens
- ✅ Shows:
  - User name and email
  - Profile link
  - Settings link
  - Logout button
- ✅ Click outside to close
- ✅ Links work correctly

---

## 🔍 Error Handling

### Test Scenario 33: Network Errors (Simulated)
**Steps:**
1. Modify a store action to throw an error
2. Trigger that action

**Expected Result:**
- ✅ Error toast appears
- ✅ User-friendly error message
- ✅ Loader hides
- ✅ App doesn't crash

---

### Test Scenario 34: Empty States
**Steps:**
1. Filter users with search that returns no results

**Expected Result:**
- ✅ Empty state message appears
- ✅ Helpful icon shown
- ✅ Suggestion to adjust filters

**Steps:**
1. Filter orders by status with no results

**Expected Result:**
- ✅ Empty state: "No [status] orders"

---

## ⚡ Performance

### Test Scenario 35: Page Load Speed
**Steps:**
1. Open DevTools Network tab
2. Navigate between pages

**Expected Result:**
- ✅ Pages load < 1 second (excluding mock delays)
- ✅ Smooth transitions
- ✅ No layout shifts

---

### Test Scenario 36: Memory Leaks
**Steps:**
1. Open DevTools Memory tab
2. Navigate between pages multiple times
3. Take heap snapshots

**Expected Result:**
- ✅ Memory doesn't grow unbounded
- ✅ Components properly cleaned up

---

## 🌐 Browser Compatibility

Test in the following browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 📝 Summary

### Critical Paths to Test:
1. ✅ Login → Dashboard → Logout
2. ✅ Users: Add → Edit → Delete
3. ✅ Orders: View → Filter → Update Status
4. ✅ Profile: Update Info → Change Password
5. ✅ Dark Mode: Toggle → Persist → Reload

### Known Limitations:
- Mock API (all data resets on refresh except auth)
- No real server validation
- No file upload for avatars
- Pagination currently fixed at 10 items/page

---

**Happy Testing! 🧪**

