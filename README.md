# Finance Goal Visualization

## 🛠️ Technologies Used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


## 📝 Table Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)


## 🚀 Features
- User Authentication (Login, Register), also link bank account
- Create Finance Goals
- Visualize Finance Goals with interactive cards
- Verify funds with bank account, verifying if you actually have the funds you claim to have ( dummy bank - [Bank App](https://github.com/Soham908/Banking-Service) )
- Update goals fund status with bank in real time after goal verification done
- Articles about finance, recommended articles
- Responsive UI, mobile responsive UI


## Screenshots
Register Page
![RegisterPage](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/a95c0a7c-dae2-4ea1-8c27-915a6c00e42a)

Home Page
![HomePage](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/2f56960e-a648-4edb-a410-f1dfc7bfb7f5)

Finance Goals Page
![FinanceGoalsPage](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/4b11d8b6-7980-4828-b7b5-46cb6e3f6037)

Create Finance Goals
![CreateGoal](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/cdbf76ec-6063-4a91-98fd-c18ac0639bf2)

When create goal and bank verification clicked, need to verify and accept from the [Bank App](https://github.com/Soham908/Banking-Service)
![BankNotification](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/f8a82350-022c-4b94-93e7-498a70ee0362)

Articles Page
![ArticlePage](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/495f62b0-6eb1-4cae-83bb-cddb702ec275)

Read an Article
![ReadArticle](https://github.com/Soham908/Finance-Goal-Visualization/assets/111056496/b1b09458-6eb5-4876-a0ad-6fa58a4e539b)


## Getting Started

### Prerequisites
- Node.js
- MongoDB installed or ensure that you have [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) set up. Obtain your connection string.

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/yourusername/banking-service.git
   ```
2. Install NPM packages for backend:
   ```sh
   cd backend
   npm install
   ```
3. Install NPM packages for frontend:
   ```sh
   cd backend
   npm install
   ```

### Creating .env files
You can use any port number you want.

In the fronted directory create a .env file and add these 2 variables
- REACT_APP_URL="http://localhost:7000"
- REACT_APP_BANK_API="http://localhost:7001"

In the backend directory create another .env file and add these
- MONGO_URL="mongodb://localhost:27017"
- PORT=7000
- BANK_URL="http://localhost:7001"

### Running the app
Open 2 terminals, in the root folder of the project enter these commands
1. Start the backend server
   ```sh
   cd backend
   npm start
   ```
2. Start the frontend server
   ```sh
   cd frontend
   npm start
   ```


## API Documentation















