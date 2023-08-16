# Environment Variables

Environment variables are values that relate to the _environment_ that our
application is running in, such as your local machine vs being deployed in the
cloud. They also provide a way to include data in our programs that we don't
want to commit, such as passwords, api keys, and secrets.

Contents:

- [Setting Environment Variables](#setting-environment-variables)
- [Reading Environment Variables](#reading-environment-variables)
- [Frontend Environment Variables](#frontend-environment-variables)
- [Backend Environment Variables](#backend-environment-variables)
- [Testing](#testing-environment-variables)

## Setting Environment Variables

There are two common ways to set environment variables when running an app.

1. The simplest way is to include it at the beginning of the command you type in
   to your terminal:

   ```
   MY_ENVIRONMENT_VARIABLE=some_value node my_app.js
   ```

2. The other is to load a file with your environment variables in it. This file
   is often named `.env`, and it is loaded by your application using a library
   called `dotenv`.

   ```
   MY_ENVIRONMENT_VARIABLE=some_value
   PORT=4000
   ```

This app uses `.env` files to load environment variables.

Because these variables are specific to the environment in which the app is
running, and often contain secrets, `.env` files **should NEVER be committed**.
For this reason, we have included them in the `.gitignore` lists.

## Reading Environment Variables

When a Node.js program (like our api) is running, its environment variables can
be read from the built-in `process.env` object, e.g. `process.env.PORT`.

In the frontend, Vite loads our environment variables, and they can be read from
the built-in `import.meta.env` object e.g. `import.meta.env.VITE_BACKEND_URL`

As a security measure, any variables which will be visible to the client need to
be prefixed with `VITE_`. You can read more about this here:
https://vitejs.dev/guide/env-and-mode.html

## Frontend Environment Variables

In this template there is only one environment variable used by the frontend:

- **VITE_BACKEND_URL**

  This environment variable tells the frontend the address of the api server, so
  that it can make requests to the right place. You would change this if the api
  server address changes. For example if you were to deploy your app, or change
  the backend port.

## Backend Environment Variables

The backend api currently uses four environment variables:

- **MONGODB_URL**

  This is the URL that describes the location of the mongodb database, also
  known as a _connection string_. The default value is
  `mongodb://0.0.0.0/acebook`. It consists of three parts:

  - `mongodb://` is the _protocol_ of the url, similar to `http://` for http
    requests.
  - `0.0.0.0` is the _host ip_. All 0s means localhost, your local machine.
  - `acebook` is the database name

  You might change this environment variable if you were using a cloud database
  to store your data, such as MongoDB Atlas, instead of a local mongodb
  instance.

- **JWT_SECRET**

  This is the password that is used for encrypting the app's authentication
  tokens, known as JSON Web Tokens, or JWTs. These are used to make sure that
  users are who they say they are.

  It's important to encrypt these tokens so that they can't be altered by the
  client, and we use a secret so that a malicious user doesn't know how to
  decrypt them, but we do. Like a password, it doesn't matter what this value
  is, as long as it remains secret to the public. In development, this value
  could be something short such as "secret", but in a production app you would
  want a longer, more secure value.

- **NODE_ENV**

  This is a commonly used environment variable which typically has the value
  `development` or `production`. It tells our app whether it's running in a
  development environment or a deployed environment. This is useful for enabling
  and disabling features that might be helpful in development, but that you
  wouldn't want a real user to see, such as sending detailed error messages or
  skipping authentication.

- **PORT**

  This environment variable tells the backend which port to run the server on.
  It is important that this matches up with the frontend's VITE_BACKEND_URL

  You might change this variable if you had some other program running on the
  default port, and wanted to avoid clashes.

## Testing

When we run our tests, the `.env.test` file is loaded, instead of the regular
`.env` file. This allows us to set different values for our environment
variables, such as updating the `MONGODB_URL` to point to a test database
instead of the main acebook database.
