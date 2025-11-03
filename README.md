🚀 **Fastor Node.js Assignment – CRM Lead Management Backend**

### 🧭 **Assignment Objective**
- Manage counselor accounts — register & login securely using JWT  
- Allow public lead submissions via an unauthenticated enquiry form  
- Implement claim logic — once claimed, leads become private  
- Secure all internal routes with JWT authentication  

---

### ⚙️ **Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** SQLite (via Sequelize ORM)  
- **Authentication:** JWT (jsonwebtoken), bcrypt  
- **Environment:** dotenv, nodemon  
- **Deployment:** Render  

---

### 📦 **Core APIs**
**Employee Routes**
- `POST /api/employees/register` → Register a new counselor  
- `POST /api/employees/login` → Login & get JWT token  

**Enquiry Routes**
- `POST /api/enquiries/public` → Submit a new enquiry (Public)  
- `GET /api/enquiries/public` → Fetch all unclaimed leads (JWT required)  
- `GET /api/enquiries/private` → Fetch all claimed leads (JWT required)  
- `PATCH /api/enquiries/:id/claim` → Claim an unclaimed lead (JWT required)  

---

### 🔐 **Security Implementation**
- Passwords are securely hashed with **bcrypt**  
- Authenticated routes are protected using **JWT middleware**  
- Tokens are verified from `Authorization: Bearer <token>` header  

---

### 🧠 **Business Logic**
- Public enquiries are visible to all counselors  
- When claimed, the enquiry becomes private (assigned to that counselor only)  
- Enforces proper access control and ownership  

---

### 🌍 **Deployment Details**
Deployed using **Render Web Service**  
- Build Command → `npm install`  
- Start Command → `npm start`  

🔗 **Live API:** [https://fastor-crm-backend-oqpn.onrender.com](https://fastor-crm-backend-oqpn.onrender.com)  

