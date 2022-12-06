# LIS frontend

## Setup and running locally
1. Create `.env` in `client` with `REACT_APP_BACKEND=some_url`
2. `npm i`
3. `npm start`

## Run with Docker
```
docker build -t lis_fe:latest .
```

```
docker run -it -p 3000:80 -e REACT_APP_BACKEND=http://localhost:8000 lis_fe:latest
```

## Run with Docker Compose
Create `.env` in `client` with `REACT_APP_BACKEND=someurl`. 
Then run with Docker Compose, by going to the `docker` folder and run:

For development:
```docker compose -f docker-compose.dev.yml up```

For production build:
```docker compose -f docker-compose.prod.yml up```

## Testing with Cypress
Open the test suite with the following command
```
npx cypress open
```
