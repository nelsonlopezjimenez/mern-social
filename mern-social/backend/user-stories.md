# User Stories
The app functionalities are related to the user stories: what the user want, how does the user want it, when the user does want it.

## The app should allow users to:
1. register by creating a new account using an email address
1. list all the registered users
1. A registered user should be able to sign-in and sign-out from the app
1. Only registered users can view individual user details after signing in
1. Only registered and authenticated users can edit or remove their own user account details.
1. See page 54 from the textbook.

## User Model
The user model will define the user details to be stored in the MongoDB database. The model will have the following attributes:
1. name
1. email
1. password
1. date created
1. date updated

## API Endpoints for User CRUD

1. create user: /api/users POST
1. list all users: /api/users GET
1. fetch one user: /api/users/:userId GET
1. update one user: /api/users/:userId PUT
1. delete one user: /api/users/:userId DElETE
1. user sign-in: /auth/signin POST
1. user signout: /auth/signout GET

## Auth with JSON Web Tokens
It is a stateless authentication mechanism that does not require storing user state on the server (or no need on session tracking).