# Using the REST API

You can use the REST API to access the data in the database.

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
