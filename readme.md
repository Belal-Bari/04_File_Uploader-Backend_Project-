# File Uploader Web Application

A simple web application built with **Express.js**, **EJS**, and **Prisma ORM** to create folders and upload files into them. Users can manage files and folders with functionalities like upload, download, rename, and delete.

---

## Features

- User registration and authentication (Sign Up / Sign In)
- Create, rename, and delete folders
- Upload files into folders using Multer middleware
- Download and delete files
- Confirmation prompts before deleting folders or files
- File storage handled on the server, with metadata saved in a Prisma-managed database
- Clean and simple UI using EJS templates

---

## Technologies Used

- **Node.js** and **Express.js** - backend framework  
- **EJS** - templating engine for rendering dynamic views  
- **Prisma ORM** - database ORM for managing data  
- **PostgreSQL** (choose your DB) - database  
- **Multer** - middleware for handling file uploads  
- **CSS** - styling the frontend UI  

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher recommended)
- A relational database supported by Prisma (PostgreSQL used by default for quick setup)
- npm or yarn package manager

### Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/file-uploader.git
   cd file-uploader

2. Install dependencies
    ```bash
    npm install

3. Configure your database connection in .env

4. Run Prisma migrations
    ```bash
    npx prisma migrate dev --name init

5. Start the server
    ```bash
    npm start

6. Open your browser at http://localhost:3000

## Project Structure
├── db/                     # Database and Prisma related files</br>
├── routes/                 # Express route handlers</br>
├── views/                  # EJS templates for frontend UI</br>
├── public/                 # Static files (CSS, JS, images)</br>
├── uploads/                # Folder for uploaded files</br>
├── app.js                  # Main Express app entry point</br>
├── package.json            # Project dependencies and scripts</br>
└── README.md               # </br>

## Usage
Sign up or sign in to create an account

Create folders to organize your files

Upload files into the folders

Download or delete files as needed

Rename folders when necessary

Use confirmation dialogs to avoid accidental deletion

## Contact
Created by Belal Bari - feel free to reach out!</br>
Email: tanvirj9@gmail.com</br>
GitHub: Belal-Bari
