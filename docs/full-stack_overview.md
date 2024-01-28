# Full-Stack Overview

This is an overview of the app as a whole.

Contents:

- [Existing Features](#existing-features)
- [Technologies](#technologies)
  - [MongoDB](#m-is-for-mongodb)
  - [Express](#e-is-for-express)
  - [React](#r-is-for-react)
  - [NodeJS](#n-is-for-node)
- [Architecture](#architecture)

## Existing Features

It's already possible for a user to:

- Sign up
- Sign in
- Sign out
- View a list of posts

## Technologies

Here's an overview of the technologies used to build this template application.
You don't need to do a deep dive on each one right now. Instead, try to get a
feeling for the big picture and then dive into the details when a specific task
pushes you in that direction.

### **M** is for MongoDB

[MongoDB](https://www.mongodb.com/) is a _NoSQL_ database program that stores
data in collections of documents (in a format similar to JSON), rather than in
tables. The application interacts with MongoDB using a tool called Mongoose.

### **E** is for Express

[Express](https://expressjs.com/) is a Javascript equivalent of Flask (Python)
or Sinatra (Ruby). The structure of this application will feel quite different
to what you're used to but the principles are the same.

### **R** is for React

[React](https://reactjs.org/) is a hugely popular tool that is used to build
engaging front ends. The basic principle is that the front end is split up into
_components_, each of which _could_ include some logic, template structure
(HTML) and styling (CSS).

### **N** is for Node

JavaScript was originally designed to run exclusively in browsers, such as
Chrome. [Node](https://nodejs.org/en/) is a tool that allows you to run
Javascript outside the browser and its invention made it possible to build full
stack Javascript apps.

We also used...

- [Vite](https://vitejs.dev/guide/) to generate our React Project
- [Vitest](https://vitest.dev/guide/) for unit testing on the frontend
- [Jest](https://jestjs.io/) for unit testing on the backend
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB
- [ESLint](https://eslint.org) for linting
- [Nodemon](https://nodemon.io/) to reload the server automatically

## Architecture

This application is comprised of two distinct pieces:

- A backend API built with Express
- A frontend built with React

It's important to note that these are two completely different programs. They
don't share any code. They have their own `package.json` files and dependencies.
Imagine that they're always running on two different machines (though when you
are working locally, everything is running on your computer).

The **only way** the frontend can communicate with the API is through HTTP
requests over the network. The React front end sends HTTP requests to the
backend API and receives JSON responses, instead of a whole page of HTML.

For example, the React front end would send this request to retrieve the entire
`Post` collection.

```
GET "<BACKEND_URL_HERE>/posts"
```

And the body of the response would look like this.

```
{
    "posts": [
        {
            "_id": "62f8ef0e6c1ffcf74cbbb181",
            "message": "Hello, this is my first Acebook post!",
            "__v": 0
        },
        {
            "_id": "62f8ef366c1ffcf74cbbb188",
            "message": "Welcome to Acebook! Have an Acetime :)",
            "__v": 0
        },
        {
            "_id": "62f8f08af1cffef85a7426ae",
            "message": "Thank you :D",
            "__v": 0
        }
    ]
}
```

Here's a diagram of the above <br> <br>
![a diagram of the client/server application with the client making a request to the server and receiving a response](./diagrams/project_communication.png)
<br> <br>

Once received by the React FE, the JSON in the response body is used to render a
list of posts on the page.

![response body mapped onto a page with the message of each post being displayed on a new line](./diagrams/response_parsing.png)

This architectural pattern is has a number of advantages. For example, it allows
teams to build multiple front ends, all of which use the same backend API. You
could, for example, go on to build a mobile app without needing to create
another backend API.
