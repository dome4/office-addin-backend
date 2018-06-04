# Office Version Control Backend

API for the Office Version Control.

## Authentication
```sh
POST      /api/user/authenticate   - creates a new auth token
```

## Routes (auth token necessary)
```sh
GET       /api/requirements        - returns the list of all requirements
POST      /api/requirement         - creates a new requirement
GET       /api/requirement/{:id}   - returns the requirement with the given id
PUT       /api/requirement/{:id}   - updates the requirement with the given id
DELETE    /api/requirement/{:id}   - removes the requirement with the given id
```

```sh
GET       /api/users        	   - returns the list of all users
POST      /api/user                - creates a new user
GET       /api/user/{:id}          - returns the user with the given id
PUT       /api/user/{:id}          - updates the user with the given id
DELETE    /api/user/{:id}          - removes the user with the given id
```