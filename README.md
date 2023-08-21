## GIGNEY _ FRONTEND SETUP GUIDE ##

Version: A2
Submission date: 24/07/2023

## SETUP ##
1. Prerequisites
    a. NODE.JS. If not installed, download from here: https://nodejs.org/en/download
    b. npm packet manager. If not installed, install following this guide: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

2. Running the web app locally
    The frontend of Gigney relies heavily on API calls from our endpoints. If running the project locally follow these steps:
    a. Run the backend app (follow the backend setup guide provided in the backend folder)
    b. Make sure that the LOCALHOST baseURL variable is selected in the following files: 
        - services/EventAPI.js
        - components/user/Login.js
        - components/user/SignupGuest.js
        - components/user/SignupOrganiser.js

    c. Run the command 'npm install' to install any missing dependency
    d. Run the command 'npm start' to run the app
    e. The app will be running locally on port 3456
3. Recommended existing accounts
    To showcase certain features more easily (owned/favourited event pagination as an example), it is recommended to try out the following accounts:
        Attendee:
            Email: nick@email.com
            Password: abc123
        Organizer:
            Email: adam@email.com
            Password: abc123


!! if the backend is running live on our Amazon endpoints, steps a and b can be skipped. !!