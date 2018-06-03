# Office Version Control Backend

API for the Office Version Control.

## Routes

```sh
GET       /api/requirements        - returns the list of all requirements
POST      /api/requirements        - creates a new requirement
GET       /api/requirement/{:id}   - returns a requirement with the given id
PUT       /api/requirement/{:id}   - updates a requirement by id 
DELETE    /api/requirement/{:id}   - removes a requirement
```