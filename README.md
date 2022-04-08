# Node JS and React Single Page Application

This application can be used building an single page application with **Node JS** and **React JS**. 


## Technologies

### Frontend

* React JS
* Bootstrap 4

### Backend

* Node JS
* Express JS
* MYSQL

## Features

* CRUD (create / read / update / delete) .

## Getting Started

* Clone the project from Gitlab

        $ git clone https://gitlab.intergy.com.au/php/fresh-cooking.git
        $ cd fresh-cooking
          
### Server

* Install the packages for node js :

        fresh-cooking $ cd backend
        fresh-cooking/backend $ npm install
          
* Create the .env file :

        fresh-cooking/backend $ copy .env.example .env
        
* Configure Database Name in your local server :

        fresh_cooking

        * Or Customize your .env file
            DB_DATABASE="fresh_cooking"
            DB_USERNAME="root"
            DB_PASSWORD=""

* Generate the JWT Secret key :
        Run: fresh-cooking/backend $ npm run jwt:secret

        Copy key from command prompt & paste inside .env file:
        JWT_SECRET="<your jwt secret>"

* Sync database tables (like migration, create table automatically):
        fresh-cooking/backend $ npm run db:sync

* Migrate and Seed datas:
        fresh-cooking/backend $ npm run db:migrate
        fresh-cooking/backend $ npm run db:seed

* Run the Node JS Server:
        fresh-cooking/backend $ npm run dev:server

* Start server in development mode. You should be able to go to `http://localhost:8000` and see `Application running`

          
### Client

* Move to the frontend directory :

        laravel-react $ cd frontend
          
* Install dependencies :

        laravel-react/frontend $ npm install
        
* Start react development server :

        laravel-react/frontend $ npm run start
      
* Start client in development mode. You should be able to go to `http://localhost:3000`

# cookingBackup
