# Storefront Backend Project

___Table of Contents___

- [Storefront Backend Project](#storefront-backend-project)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Setup environment](#setup-environment)
  - [Running the application](#running-the-application)
  - [Running the unit tests](#running-the-unit-tests)
  - [Built With](#built-with)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Endpoints](#endpoints)
  - [Database Schema](#database-schema)


A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
docker-compose   # To run the Postgres database on Docker
node 12          # To run the application
yarn             # For dependency management
```

### Installing

Simply, run the following command to install the project dependencies:

```bash
yarn
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
NODE_ENV=development
PORT=3000
# Set your database connection information here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=database_dev
DB_DATABASE_TEST=database_test
DB_USER=databaseuser
DB_PASS=password
# user
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token
```

Next, start the Postgres server on Docker:

```bash
docker-compose up
```

Now, check if Postgres has the database `store`, if not create it:

```bash
# Connect to Postgres container
docker exec -it <postgres_container_id> bash

# Login to Postgres
psql -U postgres

# Postgres shell
# This will list out all the databases
\l

# If "store" database is not present
create database store; 
```

Next, you need to run the database migrations:

```bash
yarn migrations up
```

## Running the application

Use the following command to run the application in watch mode:

```bash
yarn run watch
```

Use the following command to run the application in using node:

```bash
yarn start
```

The application will run on <http://localhost:3000/>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
yarn test
```

You may also use the Postman collection present in the repository for testing.

## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [Yarn](https://yarnpkg.com/) - The dependency manager
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework

## Authors

```javascript

const life: MZanatyLife = {
  greet: "Hi 👋, I'm Mohammed Elzanaty, working as ND Frontend Lead @udacity & Senior SE @ Vodafone",
  bio: 'A passionate teaching-lover, developer, writer, and autodidact. from Egypt',
  currentlyLearning: 'Cloud [AWS, GCP]',
  askMeAbout: 'Frontend Technologies',
  reachMeAt: 'mohammedelzanaty129@gmail.com',
  funFact: 'I learned programming by chance 😭',
};
```

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohammedelzanaty129/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://twitter.com/mohammdelzanaty)

## License

This project is licensed under the ISC License - see the [LICENSE.txt](LICENSE.txt) file for details

## Acknowledgments

* The official documentation of `db-migrate`
* The official Documentation of `Jasmine`
## Endpoints

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file

## Database Schema

 - See [REQUIREMENTS.md](./REQUIREMENTS.md) file