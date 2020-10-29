# Pillow Place

E-commerce shop that sells pillows for all sleeper types.

![Demo](pillow_demo.gif)

## Disclaimer

This is not a real website and there are no actual products being sold.

If you decide to test this project using the 
[live website](https://ijv-pillow-place.netlify.app/), please note that user 
and order data is saved to the database. An account is not needed in order to 
make a fake purchase. If you create an account, please use a fake email and 
throwaway password. If you order something, address and credit card input is 
not read or saved - only the items in the cart. You can leave the dummy data 
on the purchase form as is.

## Installation and Setup

Clone down this repository. You will need node and npm installed globally on 
your machine.

Navigate to the frontend and backend folders in your terminal and install the
packages

`npm install`

To run the app and the server locally

`npm start`

To visit app in browser

`localhost:3000`

To visit the server in browser

`localhost:5000`

**You will need to set up your own MongoDB database and connect to it at the 
bottom of the server.js backend file.**

## Built With

Frontend
* [React](https://reactjs.org/)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)

Backend
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

## Key Features

* Multiple routes in a single page application
* Users can sign up for a new account and log in. The usual sign up and log in
checks are made on both client side and server side
* Passwords are hashed so that they are not visible in the database
* An account page that shows order history is accessible only to logged in users
* Both guests and registered users can make purchases

## Motivation

This project is a remake of a [previous one](https://github.com/ianvillazana/pillow-place-old). I was not satisfied with how it looked, so I ditched 
Material-UI and instead used regular CSS and came up with my own designs for 
pages and components. I also removed Google Firebase for the backend and 
developed my own using Node.js, Express, MongoDB, and Mongoose. Redux was
removed as well in favor of React's useContext hook. Overall, I believe that
this final version looks much better and is far more impressive in terms of 
coding.

## Author

**Ian Villazana**
