# Qode

Share infos & files with a code.

[www.qode.be](http://www.qode.be/)

***

## What's this ?

This is a project made for the Coursera's full stack web development capstone's project which requires to use the courses viewed material. This project is fully functionnal and allowed me to get the specialization certification from Coursera on may 17, 2017. 

## Project features

This project allows a user to register/login and create a simple page filled with text content organized in the forms of cards. The user can upload some small files too.

Once created, the Qode page is accessible to anybody who get the 5-digit code associated.

More details about primary features :

- The user password is hashed with BCrypt before stored in MongoDB database.
- Once logged, the user can like or favorite others Qode pages.
- The user can reset his password through this mechanism :

1. The user submit his e-mail address.
2. If the e-mail address is registered, an encrypted token (with 1 hour of validity) is generated, stored in the mongoDB and sent by e-mail to the user.
3. When the recovery link sent by e-mail is clicked, the server check if the token is valid and exists in the database.
4. If the token is valid, the user is automaticcaly logged in to reset his password and the token is removed from the database.

## Used technologies

- JQuery
- Bootstrap
- Gulp
- Less
- AngularJS
- Ionic 1
- NodeJS
- Express
- Mongoose (MongoDB)

## Tools & Providers

- Sketch
- Atom
- Cloud9
- Github
- BCrypt
- JWT 
- Heroku
- mLab
- AWS S3
- Sendgrid


