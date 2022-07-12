# Backend server
This backend server will handle the CRUD operation in the Database. We decided to make a REST API and connect it with a REACT front end server (we will use `next.js`). 

# Using the REST API
Perform the CRUD operation in the database with the REST API. The following are the endpoints.

![Screenshot from 2022-07-11 09-33-17](https://user-images.githubusercontent.com/53405133/178186444-5b7ffd67-b080-4171-a9ba-0a71cc99d25f.png)

#### 1. **GET** Endpoints
- **`GET /`**

    Returns status of the server.

- **`GET /users`**

    Returns a list of all users.

- **`GET /users/:id`**

    Returns a user with the given id.

#### 2. **POST** Endpoints

- **`POST /create/users`**

    Creates a new user.

#### 3. **PATCH** Endpoints

- **`PATCH /update/users/:id`**

    Updates a user with the given id.

#### 4. **DELETE** Endpoints

- **`DELETE /delete/users/:id`**

    Deletes a user with the given id.
