# Instagram Clone - Next.js

## Overview

This project is an Instagram-like social media application built using Next.js. It includes features such as Google authentication, guest login, and interactive post functionalities like likes, comments, and bookmarks.

## Technologies Used

- **Next.js** (React framework for SSR & API routes)
- **TypeScript** (Static typing for better maintainability)
- **Tailwind CSS** (Utility-first styling framework)
- **React Hot Toast** (User-friendly notifications)
- **Lucide React** (Modern icons)
- **React Image Crop** (Image cropping for post creation)
- **Google OAuth** (Secure authentication)

## Installation & Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager

### Steps to Install

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**

   - Create a `.env.local` file in the root directory.
   - Add the required environment variables (Google OAuth credentials, etc.).

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

### Running the Application

- Open your browser and navigate to:
  ```sh
  http://localhost:3000
  ```
- Log in using Google authentication or continue as a guest.
- Browse the **Feed** to view, like, comment, and bookmark posts.
- Use the **Create Post** page to upload and crop images before posting.

## Deployment

To deploy the application, you can use platforms like **Vercel** or **Netlify**:

```sh
npm run build
npm start
```

## Features & Functionality

1. **User Authentication**

   - Sign in with Google OAuth
   - Guest login option (with limited functionality)

2. **Post Interactions**

   - Like, comment, and bookmark posts
   - Real-time updates on post engagement

3. **Content Creation**
   - Upload and crop images before posting
   - View uploaded content in the feed

## Contribution

Contributions are welcome! Fork the repository, make improvements, and submit a pull request.

## License

This project is licensed under the MIT License.
