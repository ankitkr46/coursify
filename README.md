# Coursify - Course Selling Platform

A full-stack web app for selling courses. Admins can create and manage courses; users can browse, add to cart, purchase, and track their learning.

## Quick Start

1. **Backend Setup**
  - `cd server && npm install`
  - Create `.env` with:
    - `MONGODB_URI=mongodb://localhost:27017/coursify`
    - `JWT_SECRET=your_secret_key_here`
    - `PORT=3000`
  - `npm run dev`

2. **Frontend Setup**
  - `cd ../client && npm install`
  - `npm run dev`

3. **Access**
  - Frontend: http://localhost:5173
  - Backend: http://localhost:3000

## API Overview

Base URL: `http://localhost:3000`

Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```
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
