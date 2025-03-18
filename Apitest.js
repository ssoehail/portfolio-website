const { test, expect } = require('@playwright/test');

test('API Test - GET Request', async ({ request }) => {
    // Make a GET request to the API endpoint
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Check if the response status is 200 OK
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const responseBody = await response.json();

    // Validate the response body
    expect(responseBody.userId).toBe(1);
    expect(responseBody.id).toBe(1);
    expect(responseBody.title).toBeDefined();
    expect(responseBody.body).toBeDefined();
});

test('API Test - POST Request', async ({ request }) => {
    // Define the request payload
    const postData = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    // Make a POST request to the API endpoint
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: postData,
    });

    // Check if the response status is 201 Created
    expect(response.status()).toBe(201);

    // Parse the response body as JSON
    const responseBody = await response.json();

    // Validate the response body
    expect(responseBody.id).toBeDefined();
    expect(responseBody.title).toBe(postData.title);
    expect(responseBody.body).toBe(postData.body);
    expect(responseBody.userId).toBe(postData.userId);
});