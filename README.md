# Tool Registry

A simple REST API built with **Node.js, TypeScript, Express.js, and MySQL** for managing and tracking the different tools and technologies used in a project or by an individual.

The main purpose of this project is to provide a centralized place to record:

* What tools are being used
* What each tool is used for
* Which category the tool belongs to
* Whether the tool is currently being learned or already familiar
* The difficulty level of the tool

This project was also built as a **learning project to understand Node.js backend development, REST APIs, CRUD operations, and database integration**.



# Why Tool Registry?

When working on multiple projects, developers often use many different technologies:

```text
Node.js
Docker
Redis
MySQL
Kafka
Postman
Git
MCP
ChromaDB
Ollama
```

After working with many tools, it can become difficult to remember:

* Why a particular tool was selected
* What the tool is used for
* Which tools are currently being learned
* Which tools are already familiar
* How difficult a technology is to learn

Tool Registry provides a simple way to maintain this information in one place.

---

## Features

### Create a Tool

Add a new tool to the registry.

```http
POST /api/tools
```

Example:

```json
{
  "name": "Redis",
  "category": "Database",
  "purpose": "Caching and fast in-memory data access",
  "status": "learning",
  "difficulty": "medium"
}
```

---

### Get All Tools

Retrieve all registered tools.

```http
GET /api/gettools
```

---

### Get a Tool

Retrieve a specific tool using its ID.

```http
GET /api/gettool/:id
```

Example:

```http
GET /api/gettool/1
```

---

### Update a Tool

Modify the information of an existing tool.

```http
PUT /api/modifytool/:id
```

Example:

```json
{
  "name": "Redis",
  "category": "Database",
  "purpose": "High performance caching",
  "status": "completed",
  "difficulty": "medium"
}
```

---

### Delete a Tool

Remove a tool from the registry.

```http
DELETE /api/deletetool/:id
```

Example:

```http
DELETE /api/deletetool/1
```

---

## 🏗️ Application Flow

The basic request flow is:

```text
Client / Postman
       │
       ▼
   Express.js
       │
       ▼
     Route
       │
       ▼
   API Handler
       │
       ▼
     MySQL
       │
       ▼
    Response
       │
       ▼
     Client
```

For example, when creating a tool:

```text
POST /api/tools
       │
       ▼
Express receives request
       │
       ▼
Read data from req.body
       │
       ▼
Execute INSERT query
       │
       ▼
MySQL stores the tool
       │
       ▼
Return JSON response
```

---

## 🗃️ Tool Information

Each tool contains the following information:

| Field        | Description                   |
| ------------ | ----------------------------- |
| `id`         | Unique identifier of the tool |
| `name`       | Name of the technology/tool   |
| `category`   | Category of the tool          |
| `purpose`    | What the tool is used for     |
| `status`     | Current learning/usage status |
| `difficulty` | Estimated difficulty level    |
| `created_at` | When the tool was added       |
| `updated_at` | Last modification time        |

Example:

```json
{
  "id": 1,
  "name": "Docker",
  "category": "DevOps",
  "purpose": "Containerizing applications",
  "status": "learning",
  "difficulty": "medium"
}
```

---

## 🧰 Technologies Used

* **Node.js** — Runtime environment
* **TypeScript** — Type-safe JavaScript
* **Express.js** — REST API framework
* **MySQL** — Relational database
* **mysql2** — Node.js MySQL driver
* **Postman** — API testing
* **dotenv** — Environment variable management

---

## 📚 What I Learned

This project was primarily created as a hands-on learning project.

Through this application, I learned:

### Node.js

* Creating a Node.js backend
* Working with modules
* Using `async/await`
* Handling asynchronous operations

### Express.js

* Creating an Express server
* Creating routes
* Handling `GET`, `POST`, `PUT`, and `DELETE`
* Working with `req.body`
* Working with `req.params`
* Returning HTTP status codes
* Returning JSON responses

### REST API

Implemented the basic CRUD operations:

```text
CREATE → POST
READ   → GET
UPDATE → PUT
DELETE → DELETE
```

### MySQL

* Connecting Node.js to MySQL
* Creating database tables
* Executing SQL queries
* Using parameterized queries
* Reading query results
* Handling database operations asynchronously

### API Testing

Used Postman to test:

* Successful requests
* Invalid IDs
* Creating resources
* Reading resources
* Updating resources
* Deleting resources

---

## 🔄 CRUD Architecture

The application started with an in-memory array to understand CRUD operations:

```text
POST
 ↓
tools.push()

GET
 ↓
tools.find()

PUT
 ↓
tools[index] = updatedTool

DELETE
 ↓
tools.splice()
```

After understanding the basic CRUD flow, the application was connected to MySQL:

```text
POST
 ↓
INSERT INTO tools

GET
 ↓
SELECT FROM tools

PUT
 ↓
UPDATE tools

DELETE
 ↓
DELETE FROM tools
```

This helped understand the transition from a simple Node.js application to a database-backed backend application.

---

## 💡 Use Cases

Tool Registry can be useful for:

### Individual Developers

Track technologies currently being learned or used.

Example:

```text
Node.js       → Learning
Docker        → Learning
Spring Boot   → Familiar
MySQL         → Familiar
Kafka         → Learning
```

### Development Teams

Maintain a shared list of technologies being used across projects.

### Project Documentation

Keep track of the technologies and tools associated with a particular project.

### Learning Management

Track which technologies are:

```text
Not Started
     ↓
Learning
     ↓
Familiar
     ↓
Completed
```

This makes the registry useful as a lightweight personal technology tracker.

---

## 🔮 Future Improvements

The current application focuses on learning the fundamentals. Possible future improvements include:

* Request validation
* Centralized error handling
* Authentication and authorization
* Search and filtering
* Pagination
* Tool usage statistics
* User-specific tool registries
* Tool relationships and dependencies
* Frontend dashboard
* Docker deployment
* API documentation with Swagger

---

## 🎓 Learning Objective

The primary goal of this project was not to create a complex production application.

The goal was to understand how a backend application works from end to end:

```text
HTTP Request
      ↓
Express
      ↓
Route
      ↓
Application Logic
      ↓
Database
      ↓
SQL
      ↓
Response
```

The project serves as a foundation for building larger Node.js applications.

---

## 👨‍💻 Project Status

**Completed as a Node.js CRUD learning project.**

The project can now serve as a foundation for moving into more advanced Node.js concepts such as:

* Authentication
* Middleware
* Validation
* Service/Controller architecture
* External API integration
* MCP
* AI-powered applications
* Scalable backend architecture
