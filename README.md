# LAB - Class 08

## Project: Auth-Api

### Author: Seth Pierce

### Problem Domain

  Combine basic API server and Auth Server

### Links and Resources

- [ci/cd](https://github.com/sethppierce/auth-api/actions) (GitHub Actions)
- [prod deployment](https://auth-api-class8.onrender.com) (when applicable)

### Setup

#### `.env` requirements (where applicable)

PORT=3001
DATABASE_URL=postgres://localhost:5432/auth-api?sslmode=disable
SECRET

#### How to initialize/run your application (where applicable)

- nodemon

#### Features / Routes

- Feature One - Add a Record
- POST - path `/food and /clothes`
- Feature Two - Get all Records
- GET - path `/food and /clothes`
- Feature Three - Get One Record
- GET - path `/food/:id and /clothes/:id`
- Feature Four - Update a Record
- PUT - path `/food and /clothes`
- Feature Five - Delete a Record
- DELETE - path `/food/:id and /clothes/:id`
- feature Six - Create a User
- POST - path `/signup`
- feature Six - User signin
- POST - path `/signin`

#### Tests

- How do you run tests?
  - npm test "filename"
  - tests only work individually
- Any tests of note?
  - tests signup function
  - tests signin function
  - tests all CRUD functionality for `/:model`
  - tests all CRUD functionality for `/:model` for signed in users

#### UML

![UML](/class08-uml.png)
