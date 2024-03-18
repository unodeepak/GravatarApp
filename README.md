## Running with Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t your-image-name .
    ```
    

2. Run the Docker container:
    ```bash
    docker run -p 5001:5001 -d your-image-name
    ```

3. The application should now be accessible at [http://localhost:5001](http://localhost:5001)

## What did I learn
I learned about how to get **profile** and **website** image from third party ***API*** and how we can implement ***text spinner*** function to change sentence of `words
`.