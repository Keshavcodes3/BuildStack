# BuildStack 🚀

**A social platform for developers to showcase, inspire, and collaborate on projects.**

BuildStack is a developer-focused social application where developers can share their projects, seek feedback, get inspired by others' work, and collaborate on ideas. It combines the social features of Instagram/Twitter with the technical focus of GitHub.

---

## 📋 Overview

BuildStack enables developers to:
- **Showcase Projects**: Share live projects with links, GitHub repositories, and descriptions
- **Discover & Inspire**: Browse projects from other developers and get inspired
- **Give & Receive Feedback**: Comment on projects to provide feature suggestions and scalability insights
- **Follow Developers**: Keep track of fellow developers' work
- **Engage**: Like projects and participate in the developer community

---

## ✨ Features

### Core Features
- ✅ **User Authentication** - Secure JWT-based login/registration
- ✅ **Project Management** - Create, read, and manage projects with media
- ✅ **Comments System** - Add, update, and delete comments on projects with authorization
- ✅ **Like Projects** - Show appreciation for interesting projects
- ✅ **Follow System** - Follow developers to see their latest work
- ✅ **User Profiles** - View developer profiles and their projects
- ✅ **Media Upload** - Upload project images/videos using Cloudinary
- ✅ **Feed Discovery** - Personalized feed of public projects and recommendations

### Project Features
- Project title and description
- Live project links
- GitHub repository links
- Media gallery (images/videos)
- Visibility control (public/private)
- Tags for easy discovery
- Comment count and like count

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **File Handling**: Multer

### Frontend
- React.js (Implied)
- Modern UI/UX

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Cloudinary Account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BuildStack/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   Create a `.env` file in the Backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login user
- `POST /api/v1/user/logout` - Logout user

### Projects
- `POST /api/v1/post/createProject` - Create a new project
- `GET /api/v1/post/getProjects` - Get public projects feed
- `GET /api/v1/post/projects/:id/projects` - Get user's projects
- `GET /api/v1/post/projects/:postId` - Get single project details
- `POST /api/v1/post/like/project/:id` - Like a project

### Comments
- `POST /api/v1/comments/add/:postId` - Add comment to project
- `GET /api/v1/comments/:postId` - Get comments for a project (pagination supported)
- `PUT /api/v1/comments/:commentId` - Update own comment
- `DELETE /api/v1/comments/:commentId` - Delete own comment or comment on own project

### User
- `GET /api/v1/user/profile/:userId` - Get user profile
- `PUT /api/v1/user/profile/:userId` - Update user profile
- `POST /api/v1/user/follow/:userId` - Follow a user
- `GET /api/v1/user/followers/:userId` - Get user followers

---

## 🔐 Authentication & Authorization

### Authentication
All protected endpoints require a valid JWT token passed via cookies. The `IdentifyUser` middleware validates the token and attaches user information to requests.

### Authorization
- **Comments**: Only comment authors can edit/delete their comments, or post authors can delete any comment on their post
- **Projects**: Only project creators can edit/delete their projects
- **Profiles**: Only users can edit their own profiles

---

## 📝 Project Structure

```
BuildStack/
├── Backend/
│   ├── src/
│   │   ├── Controllers/          # Business logic
│   │   │   ├── user.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── comment.controller.js
│   │   ├── Models/              # MongoDB schemas
│   │   │   ├── user.model.js
│   │   │   ├── post.model.js
│   │   │   ├── comment.model.js
│   │   │   └── ...
│   │   ├── Routes/              # API routes
│   │   │   ├── user.routes.js
│   │   │   ├── post.routes.js
│   │   │   └── comment.routes.js
│   │   ├── Middlewares/         # Express middlewares
│   │   │   └── user.middleware.js
│   │   ├── Utils/               # Utility functions
│   │   │   ├── multer.js
│   │   │   └── uploadToCloudinary.js
│   │   ├── Config/              # Configuration files
│   │   │   ├── cloudinary.js
│   │   │   └── Database.js
│   │   └── App.js               # Express app setup
│   ├── Server.js                # Server entry point
│   └── package.json
└── Frontend/
```

---

## 🚀 How It Works

### Project Creation Flow
1. Developer logs in to BuildStack
2. Creates a new project by uploading media, adding description, live link, and GitHub link
3. Project is saved to database with developer as author
4. Project appears on developer's profile and in public feed

### Feedback & Comments Flow
1. Other users browse the project feed and discover interesting projects
2. Users can comment with feature suggestions or scalability insights
3. Comments are stored with timestamps and user information
4. Project author can respond or acknowledge feedback
5. Comments can be edited or deleted by authors (or deleted by project author)

### Discovery Flow
1. Users see a feed of public projects sorted by newest first
2. Can filter by tags and search
3. Can like interesting projects
4. Can follow developers to stay updated

---

## 🔮 Future Features

### Phase 2
- 💬 **Real-time Messaging** - Direct messaging between developers
- 🔔 **Notifications** - Get notified for comments, likes, follows, and messages
- 🏆 **Project Ratings** - Detailed ratings and reviews for projects
- 📊 **Analytics** - View project engagement metrics

### Phase 3
- 🤝 **Collaboration** - Team projects with multiple contributors
- 🔍 **Advanced Search** - Search by technology, difficulty level, etc.
- 🎓 **Learning Paths** - Community-curated learning resources
- 💰 **Monetization** - Showcase and sell premium projects

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact & Support

For questions, suggestions, or bug reports:
- Open an issue on GitHub
- Contact the development team

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for developers, by developers
- Inspired by Instagram, Twitter, and GitHub
- Community feedback shapes our roadmap

---

**Happy Building! 🚀**
