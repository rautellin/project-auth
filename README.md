# Project auth 

A backend API, and a React frontend.
Sign in form using an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once you're logged in.

## View it live



## What I learned 🧠

* How to build a registration flow
* How to handle authentication using tokens, both in the frontend and in the backend
* How to build a frontend and backend at the same time
* How to securely store passwords in databases
* How to think about security and defensive design when building frontend and backend code

## Requirements I reached 🧪

* The API have routes to register and login, and finally an authenticated endpoint
* The authenticated endpoint return a 403 with an error message whenever an user try to access it without an `Authentication` access token, or with an invalid token
* The frontend have a registration form which POSTs to the API to create a new user
* The passwords in the database are encrypted with bcrypt
* The API validates the user input when creating a new user, and return error messages which could be shown by the frontend 
* The API is deployed to Heroku 

## Stretch-goals I reached 🧘

* Improve validations in the backend to ensure unique email addresses, or validate the email address format using a regular expression.
* When registering, display error messages from the API next to the field which has the error. For example, if the email address is invalid, show an error message next to the email input.
* Store data in the database for your authenticated data routes.
* Add more routes, perhaps even a `POST` route to create new objects in your database as a logged-in user.
