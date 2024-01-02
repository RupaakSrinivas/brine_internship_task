# Ecommerce (React) Coding Assessment

## Overview

This task is done according to the requirement of the Brine frontend internship task

##Features for the User

- login page and Sign Up Page, for the users to create an account
- Home page or Products page to browse all the available items
- Favourites page for the user to view all their favourite items in one place
- Product page where the user can see the product details and product image
- User can add or remove items from the cart
- User can add or remove favourite items
- cart page or checkout page for the user to modify the cart item quantity and place an order
- A responsive design for cross-device usage

  ##Features for Dev

  - Migrated the whole app to typescript, because of its obvious benefits in scalability and readability
  - The app uses TailwindCSS for styling
  - The cart and favourites are updated in real-time with the JSON server using Axios
  - Order history is saved
  - The app is built using React Context API for state management
  - Login info is saved in local storage to preserve Auth status
  - Guarded routes are implemented for the whole app
  
  ##Development Setup
  - Clone this repo
  - `npm install` to install all the dependencies
  - `npx json-server -p <portNumber> -w db.json` to start the json server
  - create .env.local file and add `REACT_APP_API_BASEURL = "http://localhost:<portNumber>/"` to expose the baseUrl
  - `npm start` to start the react app
 
  ##Tutorial
  - Once the server and the app is running and configured,
  - Go to login page, create a user or login

  
  ##Dependencies
  - react -v 18.2.0
  - react-router-dom -v 6.12.1
  - react-icons -v 4.12.0
  - axios -v 1.6.3
  - typescript -v 4.9.5
  - tailwindCSS -v 3.4.0

  
