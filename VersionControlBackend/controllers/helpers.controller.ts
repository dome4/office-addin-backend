/**
 * returns a function that will write the result as a JSON to the response
 * 
 * @param res Reponse
 */
export function createJSONResponse(response) {
    return (data) => {
        response.json(data);
    };
};

/**
 * returns a function that will write a 404 error to the reponse and log the error
 * 
 * @param res Reponse
 */
export function checkServerError(response) {
    return (error) => {
        console.log(error);
        response.sendStatus(404).end();
    };
};

