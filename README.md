# Ecommerce (React) Coding Assessment

## Overview

This task is done according to the requirement of the Brine frontend internship task

## Features for the User

- login page and Sign Up Page, for the users to create an account
- Home page or Products page to browse all the available items
- Favourites page for the user to view all their favourite items in one place
- Product page where the user can see the product details and product image
- User can add or remove items from the cart
- User can add or remove favourite items
- cart page or checkout page for the user to modify the cart item quantity and place an order
- A responsive design for cross-device usage

## Features for Dev

  - Migrated the whole app to typescript, because of its obvious benefits in scalability and readability
  - The app uses TailwindCSS for styling
  - The cart and favourites are updated in real-time with the JSON server using Axios
  - Order history is saved
  - The app is built using React Context API for state management
  - Login info is saved in local storage to preserve Auth status
  - Guarded routes are implemented for the whole app
  
## Development Setup
  - Clone this repo
  - `npm install` to install all the dependencies
  - `npx json-server -p <portNumber> -w db.json` to start the JSON server
  - create .env.local file and add `REACT_APP_API_BASEURL = "http://localhost:<portNumber>/"` to expose the baseUrl
  - `npm start` to start the react app
 
## Tutorial
  - Once the server and the app are running and configured,
  - Go to the login page, create a user or login
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/9ac637a9-5cea-40fe-a558-20b67284de33)
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/4472a1de-2594-4e80-a455-3d31f60fa2b3)

  - Once logged in, the user will be redirected to the Home page
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/013652ce-98ec-4009-aa3b-c85626d10e3b)
  - When the user clicks on an item cart, the user will be redirected to the product page, where the user can add/remove the item from the cart, and or remove the item from the Favourites list
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/7f9f4bab-de8d-4b7a-b0c1-c5f9660e28b9)
  - On the favourites page, the user can view all their favourite items
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/4c4709d1-7e2e-4459-a744-242d0cf90313)
  - On the cart page, the user can modify the item quantity or remove the item from the cart, check their final price and place an order
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/dc8aceef-4473-4608-b8ea-be8b6c34267d)
  - Once the order is successfully placed, the order summary is created and saved on the server, and the cart is emptied, the user gets an order confirmation
  ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/da091481-6f77-4868-875d-92c2fda7c140)
  - The user can logOut, either by the nav link or from their profile
    ![image](https://github.com/RupaakSrinivas/brine_internship_task/assets/64322879/e5388986-fcad-4aeb-b286-b53535e1a8ab)
  
## Dependencies
  - react -v 18.2.0
  - react-router-dom -v 6.12.1
  - react-icons -v 4.12.0
  - axios -v 1.6.3
  - typescript -v 4.9.5
  - tailwindCSS -v 3.4.0

## Future updates
If there were more time, I would add
  - Order history page, where the user can check their previous order history
  - separate all the API calls ( handle cart update, favourite toggle etc.. ) from the frontend components, similar to the Auth API calls, to make it more scalable and easier to update
  - design and add a Favicon, add meta tags and OpenGraph items
  - Switch to a more attractive design, and add more animations
  
