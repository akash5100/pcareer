# Backend server
This backend server will handle the CRUD operation in the Database. We decided to make a REST API and connect it with a REACT front end server (we will use `next.js`). 

## Using the REST API
Perform the CRUD operation in the database with the REST API. The following are the endpoints.

![Screenshot from 2022-07-11 09-33-17](https://user-images.githubusercontent.com/53405133/178186444-5b7ffd67-b080-4171-a9ba-0a71cc99d25f.png)
----------------------------------
### USER TABLE

#### 1. **GET** Endpoints
- **`GET /users`**

    Returns status of the server.

- **`GET /users/getusers`**

    Returns a list of all users.

- **`GET /users/getuser/:id`**

    Returns a user with the given id.

#### 2. **POST** Endpoints

- **`POST /users/adduser`**

    Creates a new user.

#### 3. **PATCH** Endpoints

- **`PATCH /users/update/:id`**

    Updates a user with the given id.

#### 4. **DELETE** Endpoints

- **`DELETE /users/delete/:id`**

    Deletes a user with the given id.

-----------------------------------
### SCORES TABLE

Replace `<SUBJECT>` with short name of the subject.

| Operating System  | Database Management System  | Computer Network  | Programming language  | DataStructure and Algorithim  |
|-------------------|-----------------------------|-------------------|-----------------------|-------------------------------|
|         os        |            dbms             |         cn        |         plang         |              dsa              |


#### 1. **GET** Endpoints
- **`GET /scores`**

    Returns status of the server.

- **`GET /scores/<SUBJECT>`**

    Returns a list of all scores in `<SUBJECT>`.

- **`GET /scores/<SUBJECT>/:user_id`**

    Returns score in `<SUBJECT>` of student by user_id.

#### 2. **POST** Endpoints

- **`POST /scores/<SUBJECT>/:user_id`**

    Fill the score table for `<SUBJECT>`.
