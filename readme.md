# 📚 Tarvee – AI-Powered Book & Notes Marketplace  
*A modern marketplace for buying & selling new or preloved academic books and notes.*

Tarvee is a full-stack platform designed to simplify the process of discovering, buying, and selling academic resources.  
The platform initially focuses on **Computer Science** categories such as DSA, OS, DBMS, CN, OOP, AI/ML, etc., with plans to expand further.

This repository contains:
- A **React + TailwindCSS frontend**
- A **Django REST Framework backend**
- A scalable structure for future AI-powered features (OCR, NLP, recommendations)

---

## 🚀 Project Description

Tarvee enables students to upload, browse, and purchase academic books and study notes.  
While the current prototype focuses on a functional marketplace workflow, the long-term vision includes AI-based metadata extraction, semantic search, and personalized recommendations.

The goal is to create a **smart academic marketplace** where:
- Sellers can upload book details seamlessly
- Buyers can quickly find the most relevant books/notes
- AI improves discovery and user experience

---

## ⭐ Features (Prototype)

### 🔹 Core Features
- Browse books by category (DSA, OS, DBMS, CN, OOP, AI/ML, Misc)
- Upload books & notes with title, description, category, condition, price, and images
- User authentication (Sign up, Login)
- Book listing grid with price, condition, and thumbnails
- Search books by title or category
- REST APIs for all CRUD operations

### 🔹 Admin Features (Django Admin)
- Manage books
- Manage users
- Manage categories
- View uploads and reports

---

## 🧠 Planned AI Features (Future Versions)
- **OCR-based metadata extraction**  
  Automatically read book covers/pages to extract title, author, ISBN, and subject tags.

- **NLP-powered auto-categorization**  
  Classify uploaded notes into subjects using transformers/BERT.

- **Semantic search**  
  Use embeddings (FAISS / SentenceTransformers) to show relevant results beyond keyword matching.

- **Recommendation engine**  
  Personalized book suggestions based on browsing & purchase behavior.

- **Plagiarism scanning for notes**  
  Detect duplicate or low-quality uploads using similarity scoring.

---

## 🛠️ Tools & Technologies Used

### 🖥️ Frontend
- **React + Vite**
- **TailwindCSS**
- **React Router**
- **Axios** for API calls

### 🧰 Backend
- **Django**
- **Django REST Framework (DRF)**
- **Python 3.10+**

### 🗂️ Database & Storage
- SQLite (development) / PostgreSQL (production)
- Local media storage / AWS S3 (future)

### 🔐 Authentication
- Django session auth / JWT (optional)

---

## 🏗️ System Architecture

```
Frontend (React)
   ↓ REST API Calls
Backend (Django + DRF)
   ↓
Database (PostgreSQL / SQLite)
   ↓
Media Storage (Local)
   ↓
AI Services (OCR + NLP) [Future]
```

---

## 📁 Folder Structure

```
tarvee/
│
├── frontend/         # React app (UI)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/          # Django REST API
│   ├── users/
│   ├── books/
│   ├── tarvee_backend/
│   ├── media/
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Backend (Django)

#### 1. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate     # Linux/Mac
venv\Scripts\activate        # Windows
```

#### 2. Install dependencies
```bash
pip install -r requirements.txt
```

#### 3. Apply migrations
```bash
python manage.py migrate
```

#### 4. Run server
```bash
python manage.py runserver
```

API will be available at:  
👉 http://127.0.0.1:8000/api/

---

### 🎨 Frontend (React)

#### 1. Install dependencies
```bash
npm install
```

#### 2. Start development server
```bash
npm run dev
```

Frontend will be available at:  
👉 http://localhost:5173/

---

## 🔮 Future Implementations

### 🧩 Platform Features
- Wishlist & cart system  
- User profiles with past uploads/purchases  
- Chat between buyer & seller  
- Payment gateway integration (Razorpay/Stripe)  
- Order history and invoice generation  

### 🧠 AI Features
- Automatic extraction of metadata from book cover images  
- Smart ranking of search results using embeddings  
- Notes summarization / tag extraction  
- AI-driven pricing recommendations  

### 📈 Scalability Features
- Deploy backend with Docker  
- Switch to Postgres + Redis caching  
- CI/CD pipelines  
- Horizontal scaling with load balancers  

---

