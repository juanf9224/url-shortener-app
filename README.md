# Shortener Client App

This project was created with NodeJS 10.13.0, HapiJS as the framework, Cheerio for web scrapping, 
mongoose to handle mongodb connection and operations, dotenv to be able to use a .env file to hold enviroment variables.

The server is hosted on Amazon ec2: [Here](http://ec2-18-223-112-101.us-east-2.compute.amazonaws.com)

#How to setup
if not in the project structure navigate to it, in the command line run `npm install` to install all dependencies.

#Run the server
to start the server in development mode, run `npm run start-dev` which will execute the bot to populate the database with
the json file with 150 records of different urls.

#Endpoints
Curl could be used to test the endpoints with the following commands:

 - Replace `localhost:5000` with `http://ec2-18-223-112-101.us-east-2.compute.amazonaws.com` to test the server on the cloud.
  
 - Should return JSON with a short URL or errors:
 
` curl -X POST -d "url=https://google.com" http://localhost:5000/api/v1/url/`

 - Should return JSON with the top 100 URLs:
 
` curl http://localhost:5000/url/findTop`

 - Should show the URL that the app is redirecting you to:
 
` curl -I http://localhost:5000/api/v1/abc `

#Algorithm for shortening the urls

Base64 encoding was implemented for this purpose which converts every character of the url to its binary counterpart in an ASCII format by translating it into a radix64,
this allows the short code generated to be unique to its origin, there cant be two equal codes for different inputs, this makes it perfect for the purpose of this app,
after some research on how the url shortening services do it, i decided to take this approach.

#Author
- Juan Fernandez 
- [Profile](https://github.com/juanf9224)

#Acknowledgments
This project is for demonstration purposes only.