# Slide Solutions
This project hosts the client and server code necessary to run the demo app for Slide, LLC.

## Dependencies
- ```postgres``` (https://www.postgresql.org/download/)
- ```direnv``` (https://formulae.brew.sh/formula/direnv#default)
- ```node.js``` and ```npm``` installed via ```nvm``` (https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/)
- After installing the above, run ```nvm use``` in the project root and follow subsequent instructions for installing correct node versions.
- Ask a teammate to provide you with an .envrc file to access local environment variables.
- Run ```direnv allow``` to load environment variables.

## Optional Dependencies
### ```Localstack``` and ```Docker``` (https://github.com/localstack/localstack)
- This will provide you with a local instance of AWS S3 for free bucket creation/customization.
- Local bucket setup commands
  - Make bucket: `aws s3 mb s3://slide-solutions-demo --endpoint-url=http://localhost:4566`
  - Copy local song files to bucket: `aws s3 cp ./sample_music/hyu.mp3 s3://slide-solutions-demo --endpoint-url=http://localhost:4566`
- **Bucket item names must match DB title entries** until a better solution is created.
  
## Local Database Setup
- After installing Postgres and creating a local DB, create a DB structure following this diagram (https://dbdiagram.io/d/634082f4f0018a1c5fbbd14c).

## Auth0 Login Setup
- Login/account management is handled via Auth0's 3rd party OAuth2 management system. Learn how it's integrated into the react app and set up your own Auth0 application to talk to Slide (https://auth0.com/docs/quickstart/spa/react/interactive)
## Server Installation
### Server is built with Node/Express.
- Within the server folder, run ```npm install```.
- ```npm run dev``` will start the dev server on port 3001.

## Client Installation
### Client is built with create-react-app.
- Within the client folder, run ```npm install```.
- ```npm run dev``` will start the react client on port 3000.

## Deployment
- It's up to you how you'd like to deploy this app to production. Until now, we've used AWS for server deployments and Firebase for client hosting. We haven't achieved production-level coordination and setup.
- Missing variables in the `.envrc` will need to be filled in with the ones you generate from your own local development environment.
