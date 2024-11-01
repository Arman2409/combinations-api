<p align="center" style="font-size: 30px">
  Combinations API
</p>

## Installation

```bash 
 git clone https://github.com/Arman2409/combinations-api.git
```

```bash
 cd combinations-api
```

```bash
 npm install
```
## Environment Variables

This project requires the following environment variables to be set in a `.env` file at the root of your project:

- **`DATABASE_URL`**: This variable specifies the connection URL for your database.
- **`PORT`**: This variable defines the port on which the server will run.

## Migrating the databse

To run the project properly, you will need to have your MySQL database (or another if you know how to change the configuration) set up correctly. After you have your database URL set up in the environment variables as described above, you can run the following command to migrate the database:
```bash
 npm run migrate
``` 

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test
