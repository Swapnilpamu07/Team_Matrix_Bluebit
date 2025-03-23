 # Unified Job & Internship Aggregator

This project is a **web platform** that scrapes job postings from multiple sources and presents them in a unified interface. The backend is built with **Flask **, and the frontend is developed using **React**. Currently, the login/signup system is **partially implemented**, and the backend is successfully connected to the frontend.

## 🚀 Features
- Job scraping from multiple sources
- Display job listings dynamically
- Backend with Flask  
- Frontend with React (Connected to Backend)
- **Login/Signup system (Partially Implemented)**

---

## 🛠️ Setup and Installation

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/unified-job-aggregator.git
cd unified-job-aggregator
```

### **2. Backend Setup (Flask & MongoDB)**
#### **📌 Prerequisites:**
- Python (3.8 or later)
- MongoDB (Cloud or Local)
- Pip

#### **🔹 Install Dependencies**
```sh
cd backend
pip install -r requirements.txt
```

  
#### **🔹 Run the Backend Server**
```sh
python app.py
```
By default, the backend runs on: `http://127.0.0.1:5000/`

---

### **3. Frontend Setup (React)**
#### **📌 Prerequisites:**
- Node.js (16+ recommended)
- npm or yarn

#### **🔹 Install Dependencies**
```sh
cd frontend
npm install
```

#### **🔹 Start the Frontend Server**
```sh
npm start
```
By default, the frontend runs on: `http://localhost:3000/`

#### **🔹 Configuration (Connect Frontend to Backend)**
In `frontend/src/config.js`, update the API URL:
```js
export const API_BASE_URL = "http://127.0.0.1:5000";  // Flask Backend URL
```

---

## 🏗️ Current Progress
✅ **Backend** is running and connected to the frontend.  
✅ **Frontend** can display job listings dynamically.  
⚠️ **Login/Signup system is partially implemented** (MongoDB connection established but authentication logic needs completion).  

---

## ❓ Troubleshooting
### **Common Errors & Fixes**
- **MongoDB Connection Error** → Ensure MongoDB is running or check your `MONGO_URI`.
- **CORS Issues** → Make sure Flask has `flask_cors` installed and enabled.
- **Frontend Not Updating?** → Try restarting the React server (`CTRL + C`, then `npm start`).

---

## 💡 Next Steps
- ✅ Complete authentication system (Login/Signup/Logout with MongoDB)
- ✅ Improve UI/UX for better user experience
- ✅ Add filtering and search functionality for jobs

---

## 📜 License
This project is open-source. Feel free to contribute!

