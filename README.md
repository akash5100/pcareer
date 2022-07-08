# Using the REST API

You can use the REST API to access the data in the database.

#### **GET**

    ```
    GET /
    ```

    Returns status of the server.

    ```
    GET /users
    ```

    Returns a list of all users.

    ```
    GET /users/:id
    ```

    Returns a user with the given id.

#### **POST**

    ```
    POST /create/users
    ```

    Creates a new user.

#### **PATCH**

    ```
    PATCH /update/users/:id
    ```

    Updates a user with the given id.

#### **DELETE**

    ```
    DELETE /delete/users/:id
    ```

    Deletes a user with the given id.
