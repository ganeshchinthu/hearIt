# HearIt Community Post Sharing Platform

## Overview

HearIt is a community post-sharing platform built using **React.js**, **React Router**, **React Query**, **React Hook Form**, and **Mirage JS** for backend simulation. This platform allows users to create, edit, and delete their posts, and includes a robust **Role-Based Access Control (RBAC)** system to manage user permissions and actions based on their roles.

## Features

- **User Authentication and Authorization**:
  - Users can sign up and log in securely.
  - Role-based login validation ensures users see only the paths they are authorized to access.
  - Separate admin login: Non-admin users attempting to log in as admin receive an error stating, "Only admins are allowed."
- **Post Management**:
  - Users can create, edit, and delete their own posts.
  - Moderators can manage posts created by users.
  - Admins can manage posts across user and moderator levels.
- **Role-Based Permissions**:
  - **Users**: Share, edit, and delete their posts only.
  - **Moderators**: Review and delete user posts but cannot delete posts by other moderators or admins.
  - **Admins**: Manage roles, statuses, and posts of users and moderators while adhering to admin-level restrictions.
- **Realistic Server Behavior**:
  - Backend operations are simulated with Mirage JS, ensuring smooth validation and realistic error handling.

## Role Descriptions

### 1. User

- **Permissions**:
  - Create, edit, and delete their own posts.
- **Restrictions**:
  - Cannot edit or delete posts by other users, moderators, or admins.

### 2. Moderator

- **Permissions**:
  - Review and delete posts created by users.
  - Create and edit their own posts.
- **Restrictions**:
  - Cannot delete posts by other moderators or admins.
  - Cannot modify user roles or statuses.

### 3. Admin

- **Permissions**:
  - Create, edit, and delete posts by users and moderators.
  - Promote or demote users and moderators to/from admin roles.
  - Set user and moderator statuses to active or inactive.
- **Restrictions**:
  - Cannot delete or modify the roles or statuses of other admins.
  - Loses access to content created by a user or moderator after promoting them to admin.

## Security Considerations

- **Hidden Routes**: Unauthorized roles cannot see admin paths in the UI, enhancing role segregation.
- **Authentication Validation**: Backend checks ensure no manual path access violations.
- **Audit Logging**: Future scope includes implementing logs for tracking role changes and sensitive actions.

## How It Works

1. **Authentication**:
   - Users sign up and authenticate securely.
   - Admin-specific login form restricts access to admin users only.
2. **Role and Access Control**:
   - Users manage their posts within their defined permissions.
   - Moderators oversee user posts but respect other moderators’ and admins’ boundaries.
   - Admins can manage users and moderators but maintain role-level restrictions.
3. **Realistic Validation**:
   - Role-specific error messages provide clarity during access violations.

## Technologies Used

- **Frontend**: React.js, React Router, React Query, React Hook Form, CSS
- **Backend Simulation**: Mirage JS

## Setting Up the Project

### Steps to Clone and Run the Project

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Vite**:

   - If you don’t already have Vite installed, run:
     ```bash
     npm create vite@latest
     ```

3. **Open the Project in VS Code**:

   ```bash
   code .
   ```

4. **Install Dependencies**:

   ```bash
   npm install
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

6. **Access the Application**:
   - Open your browser and navigate to the development server URL displayed in the terminal.

### Test Data

- **User 1**:
  - Email: alexdoe@gmail.com
  - Password: AlexSecure@2024
- **User 2**:
  - Email: sara.lee@website.org
  - Password: SaraL@2024
- **Moderator**:
  - Email: johnny.appleseed@domain.com
  - Password: Johnny@2021
- **Admin**:
  - Email: maria.smith@example.com
  - Password: MariaStrong@2023

### Admin Routes

- `/admin/form` -> Visible to all users
- `/admin/dashboard` -> For admins
- `/admin/userstatus/1` -> For admins

For more details, refer to the `App.jsx` file.

## Conclusion

The **HearIt platform** effectively balances functionality and security by leveraging **RBAC** to enforce strict role permissions. This ensures a clear separation of duties and provides a secure and scalable foundation for community-driven content sharing.
