# QuizBuzz

## What is it?
QuizBuzz is a full-stack application for online quizzing. Professors can use the web application as a pannel for creating classrooms and quizzes and adding 
their students. Codes are generated for each classroom. Every student gets a unique key in order to access the quiz. Professor panel offers the ability to 
view the results of each quiz and download them in a csv format. Students use the mobile app to access the quizzes. 

## Stack
* The web application is made using __ReactJS__. 
* The mobile application is developed with __React Native__. 
* QuizBuzz REST API is developed using __NodeJS__. 
* QuizBuzz uses __MongoDB__.
* Web application and server are deployed to __Heroku Platform__.
* Backend connects to the __MongoDB Atlas__ cloud database.

## Check out the application
* Web application is available [here](#).
* The API can be accessed via [this link](https://quiz-buzz-api.herokuapp.com)
* Mobile application can be tried out locally using the expo app on your phone

## Start the application locally

### Server
* Make sure you have Node and MongoDB installed on your machine
* Clone the github repository
* Navigate to the api folder and run __npm install__ to install the application dependencies
* In the api folder create a .env file with the following environment variables set: 

```javascript
QUIZ_BUZZ_MAIL=
QUIZ_BUZZ_PASS=
MONGODB_HOST=
MONGODB_LOCALHOST=
PORT=
```
* We change the port to 8080 because the web application runs on port 3000 which would also be the default port here
* Run __npm start__
* Experiment with the API!

### Web Application
* Navigate to the webapp folder and run __npm install__ to install the application dependencies
* Create a .env file with the following environment variables set:

```javascript
REACT_APP_BASE_URL=
REACT_APP_LOCALHOST=
```
* Run __npm start__ to start the application
* You may choose to run the application locally but connect to our deployed API in which case you should run the application with 
__NODE_ENV=PRODUCTION npm start__
* Experiment with the app!

### Mobile application
* Make sure you have yarn installed on your machine 
* Make sure you have expo app installed on your mobile phone
* Navigate to the mobileapp foler and run __yarn install__ to install the dependencies
* Create a .env file with the following environment variables set:

```javascript
BASE_URL=
```
* Run __npm start__ 
* Use the expo app to scan the QR code that pops up in your browser. 
* Experiment with the app!

## Contributors

* <a href="https://github.com/dselimovic1" target="_blank"><img width="25px" height="25px" src="https://github.com/dselimovic1.png"> Selimović Denis</a>
* <a href="https://github.com/lvrnjak1" target="_blank"><img width="25px" height="25px" src="https://github.com/lvrnjak1.png"> Vrnjak Lamija</a>
