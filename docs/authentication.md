# Authentication

Up until now, if you've implemented authentication, it will likely have been
done using sessions - this is a useful point of comparison but, if you haven't
implemented authentication yet, that's not going to impede you right now.

## Authentication Flow

1. A registered user submits their email address and password via the React
   front end.
2. The Express backend receives the data and tries to find a user in the DB with
   the same email address.
3. If a user is found, the password in the database is compared to the password
   that was submitted.
4. If the passwords match, a JSON Web Token is generated and returned, as part
   of the response.
5. The React frontend receives the token and holds on to it.
6. Every request to `"/posts"` must include a valid token (which is checked by
   the backend).
7. When the user logs out, the front end discards the token.

![diagram of the above authentication flow](./diagrams/auth_flow.png)

## What is a JSON Web Token?

A JSON Web Token, or JWT, is a token that comprises three parts

- A header, which contains information about how the token was generated.
- A signature, which is used to verify the token.
- A payload, which you can use to store some **non-sensitive data** like a user
  id. Note that the payload is not secure and can be decoded very easily.

The signature is created using a 'secret', which must be kept private (i.e. not
put on GitHub) otherwise nefarious internet users could start to issue tokens
for your application.

Here, we've used an environment variable called `JWT_SECRET`, which you'll see
used in the `.env` files used to run the application and the tests (see the
[environment variables][env-variables-docs] docs for more info).

You can change the value of that environment variable to anything you like, as
long as it's hard to guess. It should also _never_ be committed in your project
files.

[env-variables-docs]: ./environment_variables.md
