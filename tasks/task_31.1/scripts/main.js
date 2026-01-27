const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * #1 GET
 */
async function getData(segment) {
    try {
        const response = await fetch(`${BASE_URL}${segment}`);

        if (!response.ok) {
            return response.status;
        }

        const data = await response.json();
        console.log('GET data >', data);
        return data;
    } catch (error) {
        console.error('GET error >', error);
        return error.message;
    }
}

/**
 * #2 POST
 */
async function postData(segment, data) {
    try {
        const response = await fetch(`${BASE_URL}${segment}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const message = `POST request failed. Status: ${response.status}`;
            console.log(message);
            return message;
        }

        const result = await response.json();
        console.log('POST result >', result);
        return result;
    } catch (error) {
        console.error('POST error >', error);
        return error.message;
    }
}

/**
 * #3 PUT
 */
async function putData(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const message = `PUT request failed. Status: ${response.status}`;
            console.log(message);
            return message;
        }

        const result = await response.json();
        console.log('PUT result >', result);
        return result;
    } catch (error) {
        console.error('PUT error >', error);
        return error.message;
    }
}

/**
 * #4 PATCH
 */
async function patchData(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const message = `PATCH request failed. Status: ${response.status}`;
            console.log(message);
            return message;
        }

        const result = await response.json();
        console.log('PATCH result >', result);
        return result;
    } catch (error) {
        console.error('PATCH error >', error);
        return error.message;
    }
}

/**
 * #5 DELETE
 */
async function deleteData(id) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Post with id ${id} has been successfully deleted.`);
            return true;
        }

        console.log(`Failed to delete post with id ${id}. Status: ${response.status}`);
        return response.status;
    } catch (error) {
        console.error(`Error during deletion: ${error.message}`);
        return error.message;
    }
}

// GET
getData('/posts/1').then(console.log);

// POST
postData('/posts', { title: 'Hello', body: 'World', userId: 1 }).then(console.log);

// PUT
putData(1, { id: 1, title: 'New', body: 'Text', userId: 1 }).then(console.log);

// PATCH
patchData(1, { body: 'Only body changed' }).then(console.log);

// DELETE
deleteData(1).then(console.log);