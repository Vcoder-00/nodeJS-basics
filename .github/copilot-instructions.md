# AI Coding Agent Instructions

## Project Overview
**Curso Node.js** is a Node.js learning project implementing a REST API with Express and MongoDB. It demonstrates CRUD operations on user resources with proper error handling and async/await patterns.

**Key Stack:**
- Express 5.1 for HTTP API routing
- Mongoose 8.19 for MongoDB ODM
- Dotenv for environment configuration
- Nodemon for development

## Architecture & Data Flow

### Entry Point: `index.js`
- Loads environment variables via dotenv (credentials from `.env`)
- Establishes MongoDB connection via `connectToDB()`
- Bootstraps Express server via `modules/express.js`

### Database Layer: `src/database/connect.js`
- Async Mongoose connection with error handling
- Calls `process.exit(1)` on connection failure (critical startup failure)
- MongoDB credentials: `MONGODB_USERNAME` and `MONGODB_PASSWORD` from `.env`

### API Layer: `modules/express.js`
Implements complete CRUD REST API on `/users` endpoint:

| Method | Route | Operation |
|--------|-------|-----------|
| GET | `/users` | List all users |
| GET | `/users/:id` | Fetch single user by MongoDB ObjectId |
| POST | `/users` | Create user (validates firstName, lastName, email, password≥7 chars) |
| PATCH | `/users/:id` | Partial update |
| DELETE | `/users/:id` | Remove user |

**Middleware:** `express.json()` enabled for JSON request parsing

### Data Model: `src/models/user.model.js`
Schema enforces:
- `firstName`, `lastName`, `email`: required strings
- `password`: required string with minimum 7 characters

Validation errors return 400 status; other errors return 500.

## Developer Workflows

### Development
```bash
npm run start:dev
```
Runs Express on port 8080 with nodemon auto-reload on file changes.

### Dependencies
- Install: `npm install`
- Add to devDeps: `npm install --save-dev <package>`

## Patterns & Conventions

### Error Handling
Use try-catch with specific error type checks:
```javascript
catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    res.status(500).send(error.message);
}
```
Validation errors (400), other errors (500). **Early returns on known errors.**

### Async/Await
All database operations are async promises. Use async/await consistently:
- Route handlers marked `async`
- Database calls awaited: `await UserModel.find()`, `await UserModel.create()`

### Response Patterns
- Success: `res.status(200 or 201).json(data)`
- Errors: `res.status(4xx or 5xx).send(message)` or `.json()`

## Key Files Structure
```
index.js                      # Entry, DB connection, server boot
modules/
  express.js                  # All REST endpoints (78 lines)
src/
  database/connect.js         # MongoDB connection logic
  models/user.model.js        # User schema definition
.env                          # MongoDB credentials (not in git)
```

## Integration Points
- **MongoDB Atlas:** Connection via `mongodb+srv://` URI in `.env`
- **Mongoose:** All database queries go through `UserModel` static methods
- **Express:** Single app instance listening on port 8080

## Common Tasks
- **Add new endpoint:** Add route handler to `modules/express.js` before `app.listen()`
- **Modify schema:** Update `src/models/user.model.js` and validate existing data
- **Change DB credentials:** Update `MONGODB_USERNAME` and `MONGODB_PASSWORD` in `.env`
- **Debug:** Nodemon preserves console.log output; check MongoDB ObjectId format in requests
