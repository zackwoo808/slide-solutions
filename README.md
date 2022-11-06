# Slide Solutions
This project hosts the client and server code necessary to run the demo app for Slide, LLC.

## Dependencies
- ```postgres``` (https://www.postgresql.org/download/)
- ```direnv``` (https://formulae.brew.sh/formula/direnv#default)
- ```node.js``` and ```npm``` installed via ```nvm``` (https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/)
- After installing the above, run ```nvm use``` in the project root and follow subsequent instructions for installing correct node versions.
- Ask a teammate to provide you with an .envrc file to access local environment variables.
- Run ```direnv allow``` to load environment variables.

## Local Database Setup
- After installing Postgres and creating a local DB, create a DB structure following this diagram (https://dbdiagram.io/d/634082f4f0018a1c5fbbd14c).

## Server Installation
### Server is built with Node/Express.
- Within the server folder, run ```npm install```.
- ```npm run dev``` will start the dev server on port 3001.

## Client Installation
### Client is built with create-react-app.
- Within the client folder, run ```npm install```.
- ```npm run dev``` will start the react client on port 3000.

## Optional Dependencies
### ```Localstack``` and ```Docker``` https://github.com/localstack/localstack)
- This will provide you with a local instance of AWS S3 for free bucket creation/customization.
