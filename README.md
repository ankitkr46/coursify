# 🎓 Coursify - Modern Course Selling Platform

A full-stack educational platform where administrators can create and publish courses, and users can browse, purchase, and track their learning progress. Built with React, Node.js, Express, and MongoDB.

![Coursify](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## ✨ Features

### 🎯 For Users
- **Browse Courses** - Explore courses across Web Development, Blockchain, and DevOps
- **User Authentication** - Secure signup/login with JWT tokens
- **Shopping Cart** - Add courses to cart before purchase
- **Course Purchase** - Buy courses and track purchased content
- **Personal Dashboard** - View enrolled courses and progress
- **Profile & Heatmap** - Track learning streaks and activity
- **Wishlist** - Save courses for later
- **Community Forum** - Engage with other learners
- **Testimonials** - Read reviews from successful students

### 👨‍💼 For Administrators
- **Admin Panel** - Dedicated interface for course management
- **Create Courses** - Add new courses with title, description, price, and images
- **Edit Courses** - Update existing course information
- **Publish/Unpublish** - Control course visibility
- **View All Courses** - Manage entire course catalog

### 🎨 UI/UX Highlights
- **Modern Design** - Clean, responsive interface inspired by top ed-tech platforms
- **Animated Course Carousel** - Auto-scrolling horizontal course showcase
- **Conditional Navbar** - Dynamic navigation based on authentication status
- **Role-based Access** - Admin-only routes and features
- **Responsive Layout** - Mobile-first design approach

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with modern features

### Backend
- **Node.js & Express** - Server and API framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
week-7/
├── client/                 # React frontend (advanced)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── courses/
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── ...
│   │   ├── utils/         # Utilities
│   │   │   └── api.js     # Axios instance
│   │   └── main.jsx       # App entry point
│   └── package.json
│
├── client-easy/           # Simple client (for beginners)
│
└── server/                # Express backend
    ├── config/
    │   └── db.js          # MongoDB connection
    ├── controllers/
    │   ├── adminController.js
    │   └── userController.js
    ├── models/
    │   ├── Admin.js
    │   ├── User.js
    │   └── Course.js
    ├── routes/
    │   ├── admin.js
    │   └── user.js
    ├── middleware/
    │   └── auth.js        # JWT verification
    ├── server.js          # Express app
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd week-7
```

2. **Setup Backend**
```bash
cd server
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/coursify" > .env
echo "JWT_SECRET=your_secret_key_here" >> .env
echo "PORT=3000" >> .env

# Start server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../client
npm install

# Start development server
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🎯 Frontend Clients

**Two client options available:**
- **`client`** - Full-featured React app with advanced components (recommended if familiar with React)
- **`client-easy`** - Simplified version for beginners

**Two client options available:**
- **`client`** - Full-featured React app with advanced components (recommended if familiar with React)
- **`client-easy`** - Simplified version for beginners

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 🔐 Admin Routes

### POST `/admin/signup`
**Description**: Creates a new admin account.  

**Request Body**:
```json
{
  "username": "admin@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "message": "Admin created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/admin/login`
**Description**: Authenticates an admin. Requires username and password in headers.

**Headers**:
```json
{
  "username": "admin@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/admin/courses`
**Description**: Creates a new course.

**Headers**:
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Request Body**:
```json
{
  "title": "Full Stack Web Development",
  "description": "Master MERN stack development",
  "price": 9999,
  "imageLink": "https://example.com/course-image.jpg",
  "published": true,
  "category": "Web Development"
}
```

**Response**:
```json
{
  "message": "Course created successfully",
  "courseId": "507f1f77bcf86cd799439011"
}
```

---

### PUT `/admin/courses/:courseId`
**Description**: Updates an existing course.

**Headers**:
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Request Body**:
```json
{
  "title": "Updated Course Title",
  "description": "Updated description",
  "price": 12999,
  "imageLink": "https://example.com/new-image.jpg",
  "published": false
}
```

**Response**:
```json
{
  "message": "Course updated successfully"
}
```

---

### GET `/admin/courses`
**Description**: Retrieves all courses (including unpublished).

**Headers**:
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Response**:
```json
{
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Full Stack Web Development",
      "description": "Master MERN stack development",
      "price": 9999,
      "imageLink": "https://example.com/image.jpg",
      "published": true,
      "category": "Web Development"
    }
  ]
}
```

---

## 👤 User Routes

### POST `/users/signup`
**Description**: Creates a new user account.

**Request Body**:
```json
{
  "username": "user@example.com",
  "password": "userPassword123"
}
```

**Response**:
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/users/login`
**Description**: Authenticates a user. Requires username and password in headers.

**Headers**:
```json
{
  "username": "user@example.com",
  "password": "userPassword123"
}
```

**Response**:
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### GET `/users/courses`
**Description**: Lists all published courses.

**Headers**:
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Response**:
```json
{
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Full Stack Web Development",
      "description": "Master MERN stack development",
      "price": 9999,
      "imageLink": "https://example.com/image.jpg",
      "category": "Web Development",
      "published": true
    }
  ]
}
```

---

### POST `/users/courses/:courseId`
**Description**: Purchases a course.

**Headers**:
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Response**:
```json
{
  "message": "Course purchased successfully"
}
```

---

### GET `/users/purchasedCourses`
**Description**: Lists all courses purchased by the authenticated user.

**Headers**:
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Response**:
```json
{
  "purchasedCourses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Full Stack Web Development",
      "description": "Master MERN stack development",
      "price": 9999,
      "imageLink": "https://example.com/image.jpg",
      "category": "Web Development"
    }
  ]
}
```

---

## 🎨 Key Features Implementation

### Shopping Cart System
- Cart stored in `localStorage`
- Add/remove courses before purchase
- Persistent across sessions
- Duplicate prevention

### Authentication Flow
1. User/Admin registers → receives JWT token
2. Token stored in `localStorage`
3. Token sent with each authenticated request via Axios interceptor
4. Role-based UI rendering (user/admin)

### Responsive Navbar
- **Not Logged In**: Shows Login, Register
- **Logged In (User)**: Shows Dashboard, Profile, Wishlist, Forum, Logout
- **Logged In (Admin)**: Additional Admin Panel link

### Course Carousel
- Auto-scrolling horizontal slider
- Pause on hover/focus (accessibility)
- Respects `prefers-reduced-motion`
- Seamless infinite loop
- Responsive card sizing

## 🔧 Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/coursify
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
```

### Client
Base API URL configured in `src/utils/api.js`:
```javascript
baseURL: "http://localhost:3000"
```

## 🧪 Testing the Application

### Test Admin Flow
1. Navigate to `/admin`
2. Signup as admin
3. Create a course with title, description, price
4. View all courses in admin panel

### Test User Flow
1. Navigate to `/register`
2. Create user account
3. Browse courses on home page
4. Add course to cart
5. Purchase course
6. View purchased courses in dashboard

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, course carousel, testimonials |
| Courses | `/courses` | Browse all available courses by category |
| Login | `/login` | User/Admin authentication |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | User's enrolled courses |
| Profile | `/profile` | User profile with heatmap and streak tracking |
| Wishlist | `/wishlist` | Saved courses |
| Forum | `/forum` | Community discussion board |
| Admin Panel | `/admin` | Course management (admin only) |

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Video course content delivery
- [ ] Course progress tracking
- [ ] Student assignment submissions
- [ ] Live class scheduling
- [ ] Certificate generation
- [ ] Advanced search and filters
- [ ] Course reviews and ratings
- [ ] Instructor profiles
- [ ] Email notifications

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of a learning assignment. Feel free to use it for educational purposes.

## 👨‍💻 Author



## 🙏 Acknowledgments

- Inspired by [100xDevs](https://app.100xdevs.com)
- Built as part of a full-stack web development course
- UI/UX inspiration from leading ed-tech platforms

---
