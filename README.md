# Office Version Control Backend

API for the Office Version Control.

## Installation
* rename `.env.example` to `.env` and fill out the variables
* run `npm install` in subfolder `VersionControlBackend` to install the dependencies
* compile typescript-files
* (optional) run `node seeder.js` to seed the database
* run `npm start` to start the API

## Authentication
```sh
POST      /api/user/authenticate             - creates a new auth token
```

## Routes (auth token necessary)
```sh
GET       /api/requirements                  - returns the list of all requirements
POST      /api/requirement                   - creates a new requirement
GET       /api/requirement/{:id}             - returns the requirement with the given id
PUT       /api/requirement/{:id}             - updates the requirement with the given id
DELETE    /api/requirement/{:id}             - removes the requirement with the given id
```

```sh
GET       /api/users                         - returns the list of all users
POST      /api/user                          - creates a new user
GET       /api/user/{:id}                    - returns the user with the given id
PUT       /api/user/{:id}                    - updates the user with the given id
DELETE    /api/user/{:id}                    - removes the user with the given id
```

```sh
GET       /api/requirement-parts             - returns the list of all requirement template parts
POST      /api/requirement-part              - creates a new requirement template part
GET       /api/requirement-part/{:id}        - returns the requirement template part with the given id
PUT       /api/requirement-part/{:id}        - updates the requirement template part with the given id
DELETE    /api/requirement-part/{:id}        - removes the requirement template part with the given id
```

```sh
GET       /api/requirement-relations         - returns the list of all requirement relations
POST      /api/requirement-relation          - creates a new requirement relation
GET       /api/requirement-relation/{:id}    - returns the requirement relation with the given id
PUT       /api/requirement-relation/{:id}    - updates the requirement relation with the given id
DELETE    /api/requirement-relation/{:id}    - removes the requirement relation with the given id
```

```sh
GET       /api/office/insert-new-requirement - inserts a given requirement template in the given xml document
```