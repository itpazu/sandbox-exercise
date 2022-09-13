# sandbox-exercise

The application consists of a server (Express Node.js) and a UI (React.js).

The user can upload a file for a malware scanning. The submitted file is sent to the the server, 
which in turn forwards the file to "Virus Total"'s api for a scanning. 

A counter starts ticking, to measure the duration of the request. When the server obtains the data send it sends it forward to the UI. 
On the screen, a general assessment is provided as to whether the file contains suspicious or malicious software. The results are presented in the UI in two layouts:
A "donought" pie chart summarizing the results from differnet engines, and a collapsible table elaborates on the different engines used to scan the file. 

The user can also request the results to be sent over by email. 

In the server, logs are kept in a file as well as forwarded to a syslog server. 

## Installation instructions

### step 1: 
clone the repo: https://github.com/itpazu/sandbox-exercise.git

### step 2: 
Install packages:

#### Frontend: 
    $cd frontend && npm install
#### Backend
    $cd backend && npm install

Provide environment variables by pasting .env file* in the corresponding directory - frontend and backend 
(as an alternative prvoide them when launcgin the application from the terminal).

--> Note that you can adjust the ports where you want each service to run. The default ports are defined inside each .env file. 
By default, the development server was set to run on localhost:5000 while the development frontend shall run on localhost:3000. 

### step 3: launch application
  
  Either, launch both application in one terminal:
  
    $ cd frontend && npm run start:with-server
  
  launch separately open two terminals:
    
    $ cd frontend && npm run start
    
    $ cd backend && npm run dev
      
   
  *provided by Email
