# BuildStack Frontend

A modern, responsive React application built with **Vite**, **Redux Toolkit**, and **Tailwind CSS** for sharing and discovering amazing projects.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Architecture](#-architecture)
- [Key Components](#-key-components)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling](#-styling)

---

## ✨ Features

### Authentication
- **User Registration** - Create account with avatar, bio, and email
- **User Login** - Secure login with token-based authentication
- **Session Persistence** - Automatically maintain login state across page reloads
- **Protected Routes** - Secure pages behind authentication guards

### Projects/Posts
- **Create Projects** - Beautiful modal for creating new projects with image upload
- **Explore Projects** - Discover projects from community with search/filter
- **User Profile** - View user's own projects with stats (followers, following)
- **Project Cards** - Rich cards with images, tags, author info, and interactions

### Interactions
- **Like Projects** - Mark projects as favorites with heart button
- **Comments** - Comment on projects (feature-ready)
- **Search & Filter** - Real-time search by project caption and tags
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Library |
| **Vite** | Build tool & dev server |
| **Redux Toolkit** | State management |
| **React Router** | Client-side routing |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **React DOM** | DOM manipulation |

---

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── App/
│   │   ├── App.jsx                 # Main app component
│   │   ├── app.routes.jsx          # Route definitions
│   │   ├── app.store.js            # Redux store setup
│   │   ├── Protected.jsx           # Route guard component
│   │   ├── RootLayout.jsx          # Auth initialization wrapper
│   │   ├── RootLayout.jsx          # Main layout wrapper
│   │   ├── index.css               # Global styles
│   │   └── **other app files**
│   │
│   ├── Features/
│   │   ├── Auth/
│   │   │   ├── Assets/
│   │   │   ├── Hooks/
│   │   │   │   └── useAuth.jsx     # Auth logic hook
│   │   │   ├── Pages/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Services/
│   │   │   │   └── auth.service.js # Auth API calls
│   │   │   └── Slices/
│   │   │       └── auth.slice.js   # Redux auth state
│   │   │
│   │   └── Home/
│   │       ├── Hooks/
│   │       │   └── useHome.jsx     # Post operations hook
│   │       ├── Pages/
│   │       │   ├── CreatePostModal.jsx  # Modal for creating posts
│   │       │   ├── Explore.jsx          # Explore page
│   │       │   ├── Home.jsx             # Home feed
│   │       │   ├── Layout.jsx           # Main layout
│   │       │   ├── Profile.jsx          # User profile
│   │       │   ├── Sidebar.jsx          # Navigation sidebar
│   │       │   └── Components/
│   │       │       ├── PostFeed.jsx     # Feed display
│   │       │       └── ProjectCard.jsx
│   │       ├── Services/
│   │       │   └── home.service.js  # Post API calls
│   │       └── Slices/
│   │           └── home.slice.js    # Redux post state
│   │
│   └── main.jsx                    # Entry point
│
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
└── tailwind.config.js              # Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Installation

1. **Navigate to Frontend directory**
```bash
cd Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (if needed)
Create a `.env` file with:
```
VITE_API_URL=http://localhost:3000/api/v1
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5174`

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🏗 Architecture

### Features-Based Structure
The app uses a **feature-based folder structure** for better organization:
- Each feature (Auth, Home) has its own folder
- Each feature contains: Hooks, Pages, Services, Slices
- Easy to locate and maintain feature-specific code

### Data Flow
```
Components → Hooks → Redux Store → Services → Backend API
```

### State Management (Redux)
- **auth.slice.js** - User authentication state
- **home.slice.js** - Posts and projects state

---

## 🎯 Key Components

### **RootLayout.jsx**
- Initializes authentication on app load
- Checks for saved token in localStorage
- Fetches user profile if token exists
- Shows loading spinner during initialization
- Prevents infinite re-renders with useRef

### **Protected.jsx**
- Guards routes from unauthorized access
- Redirects to login if token/user missing
- Shows loading state

### **Layout.jsx** & **Sidebar.jsx**
- Main application layout wrapper
- Navigation sidebar with Home, Explore, Profile
- "Create Project" button
- Mobile-responsive with hamburger menu

### **CreatePostModal.jsx**
- Beautiful form for creating projects
- Fields: Caption, Visibility, Tags, Media/Image
- Image preview before upload
- FormData handling for file uploads
- Loading states and validations

### **Explore.jsx**
- Beautiful project discovery page
- Real-time search by caption/tags
- Grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Project cards with hover effects
- Author info, tags, stats display

### **Profile.jsx**
- User profile page
- Shows user info (avatar, name, bio)
- Displays statistics (projects, followers, following)
- Lists only user's own projects (not global posts)
- Professional card design

### **Home.jsx**
- Main feed page
- Displays all projects in feed format
- Uses PostFeed component for rendering
- Handles loading and error states

### **PostFeed.jsx**
- Reusable feed component
- Renders individual posts
- Like/comment interactions
- Media display with hover effects
- Author information

---

## 📊 State Management

### Auth Store
```javascript
{
  user: { _id, userName, email, avatar, bio, followers, following },
  loading: boolean,
  error: string | null,
  token: string | null
}
```

### Post Store
```javascript
{
  posts: [],
  userPosts: [],
  singlePost: null,
  loading: boolean,
  error: string | null
}
```

---

## 🔗 API Integration

### Auth Service (`auth.service.js`)
- `register(userData)` - Create new user account
- `login(userData)` - User login
- `getProfile()` - Fetch current user profile
- `updateProfile(userData)` - Update user info
- `logoutUser()` - Logout user

### Post Service (`home.service.js`)
- `addPost(postData)` - Create new project
- `getAllPosts()` - Fetch all projects
- `getUserPosts(id)` - Fetch user's projects
- `getAProject(postId)` - Get single project
- `likeAProject(id)` - Like a project

Base URL: `http://localhost:3000/api/v1`

---

## 🎨 Styling

### Tailwind CSS
- **Color palette**: Violet, Purple, Pink gradients
- **Responsive breakpoints**: Mobile-first approach
- **Components**: Cards, buttons, modals with consistent styling

### Key Utilities
- `bg-linear-to-r/l/t/b` - Gradient backgrounds
- `hover:shadow-xl` - Smooth shadow transitions
- `group-hover` - Group-based hover effects
- `line-clamp-*` - Text truncation

---

## 🔐 Authentication Flow

1. **App Loads** → RootLayout checks localStorage for token
2. **Token Found** → Fetch user profile via `getProfile()`
3. **Profile Loaded** → User state updated in Redux
4. **Route Access** → Protected component checks user + token
5. **Unauthorized** → Redirect to login

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|-----------|--------|
| Mobile | < 640px | Single column, full width |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | > 1024px | 3 columns |

---

## 🐛 Common Issues & Solutions

### Issue: Infinite Re-rendering
**Solution**: Always use empty dependency arrays `[]` for initialization effects

### Issue: Posts showing across all profiles
**Solution**: Use `userPosts` instead of `posts` in Profile component

### Issue: Redirect loops on reload
**Solution**: Use RootLayout wrapper with `useRef` to prevent double initialization

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Commit changes: `git commit -m "Add YourFeature"`
3. Push to branch: `git push origin feature/YourFeature`
4. Open a Pull Request

---

## 📄 License

This project is part of the BuildStack platform.

---

**Last Updated**: April 2026
