
# Project Setup and Deployment Guide

## Prerequisites

### Node.js Environment
- Ensure you have Node.js installed.
- Use `yarn` or `npm` as your package manager.

### Database Installation
- Install the latest version of **PostgreSQL**.
- Create a new database.
- Configure your database connection details (username, password, port) in the `.env.development` file.

---

## Installation

### Install Dependencies
From the root directory (where `package.json` is located), run the following command to install the required dependencies:
```bash
yarn install
```
or
```bash
npm install
```

### Environment Configuration
- Set the application port in the `.env` file or use the default port `4002`.
- Example `.env.development` file:
```env
PORT=4002
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name
```

---

## Running the Project

### Development Environment
To start the project in development mode, use the following command:
```bash
yarn start:dev
```
or
```bash
npm run start:dev
```
- The project will be available at: [http://localhost:4002](http://localhost:4002)

### Production Environment
To start the project in production mode, use the following command:
```bash
yarn start:prod
```
or
```bash
npm run start:prod
```

---

## Environment Variables
Below are the required environment variables to configure the project:

| Variable   | Description                      |
|------------|----------------------------------|
| `PORT`     | Port number to run the application |
| `DB_HOST`  | Database host address             |
| `DB_PORT`  | Database port number              |
| `DB_USER`  | Database username                 |
| `DB_PASS`  | Database password                 |
| `DB_NAME`  | Database name                     |
| `JKS_FILE` | Path to the JKS file              |

---

## Troubleshooting
- **Database Connection Issues**: Ensure your `.env.development` file has the correct database credentials.
- **Missing Dependencies**: Run `yarn install` or `npm install` to ensure all packages are installed.
- **Port Conflicts**: Change the `PORT` in your `.env.development` file if the default port `4002` is in use.

For further assistance, refer to the project documentation or contact the support team.
