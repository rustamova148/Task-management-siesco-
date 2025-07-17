# 📋 Task Management System

Bu layihə sadə bir **tapşırıq idarəetmə** sistemidir. İstifadəçi rolları əsasında (Admin və User) fərqli funksionallıqlara malikdir. Layihədə `json-server` istifadə olunduğu üçün datalar yalnız lokalda görünür.

---

## 🚀 Texnologiyalar

- React
- TypeScript
- Redux Toolkit
- React Router
- json-server
- CSS Modules

---

## 🛠️ Quraşdırma (Local Setup)

1. Layihəni klonlayın:
   ```bash
   git clone https://github.com/rustamova148/Task-management-siesco-.git
   ```

2. Əlavə olaraq `json-server`-i qlobal olaraq quraşdırın (əgər yoxdursa):
   ```bash
   npm install -g json-server
   ```

3. `json-server`-i işə salın:
   ```bash
   json-server --watch db.json --port 3001
   ```

4. Frontend-i işə salın:
   ```bash
   npm install
   npm run dev
   ```

---

## 👥 İstifadəçi Rolları

### 🔐 Admin
(burada Adminin hesabı - nezrinrustamova454@gmail.com, 123456hj)
- Qeydiyyatdan keçə bilər.
- Yeni user-lər əlavə edə bilər.
- Hər user üçün **task əlavə edə**, **edit edə**, **silə** bilər.
- User və task məlumatlarını ayrı-ayrı cədvəllərdə görə bilər.
- Tapşırıqların statuslarını izləyə bilər.

### 👤 User

- Öz hesabına daxil ola bilər.
- Ona təyin edilən task-ları görə bilər.
- Task-ları drag-and-drop ilə aşağıdakı statuslar arasında keçə bilər:
  - `To Do`
  - `In Progress`
  - `Review`
  - `Completed`
  - `Deferred`

---

## ❗Qeyd

Layihə `json-server` üzərindən işlədiyi üçün **deploy edildikdə datalar görünməyəcək**. Dataların işləməsi üçün lokalda aşağıdakı komandanı istifadə etməlisiniz:

```bash
json-server --watch db.json --port 3001
```

---

## 📂 Qovluq Strukturu (qısa)

```
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── App.tsx
│   └── main.tsx
├── db.json
└── README.md
```

---

## 🧑‍💻 Müəllif

- [@NezrinRustemova](https://github.com/rustamova148)

---

## 🌟 Əlavə

Pull request-lər açıqdır. Layihəni daha da inkişaf etdirmək istəsəniz, məmnuniyyətlə baxılar 😊
