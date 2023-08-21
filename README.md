# MediaWebApp-Public
Follow these steps to run a local version of this web application designed for showcasing work published on YouTube and Soundcloud:


## Prerequisites
Docker must be installed on your system.


## Instructions
### Clone Repository:
Clone this repository to your local machine.


### Navigate to Backend Directory:
Open your terminal/command prompt and navigate to the MediaWebApp-Public/backend/ directory.


### Build Backend Docker Image:
Execute the following docker command to build the backend Docker image:
docker build -t backend:latest .


### Start Docker Compose:
Start the Docker Compose services using the following command:
docker-compose up -d


### Access the Application:
Open your preferred web browser and navigate to http://localhost/.

## Note:
Unfortunately, the admin portal won't be accessible unless you create your own Firebase account, create your Firebase auth user account, and then copy your Firebase web project configuration into the MediaWebApp-Frontend/src/firebase.js file. Then rebuild with npm run build and replace the build in the root directory with this new build. This can be done pretty easily; however, for demonstration purposes of this component, you can alternatively watch the following video: https://www.youtube.com/watch?v=S98x9OiXmnA
