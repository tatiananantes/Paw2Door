# Paw2Door - An aggregator for Pet Rescues 
  The goal of this project was to create an aggregator for pet rescues to make it easier for people to adopt a pet.  
  This project was done as part of the Makers Academy final engineering project.

## User Stories

The user stories we followed when creating the project.

```
As a shelter
I want to be able to add a pet profile
So that a potential adopter see what pets we have

As a site visitor
I want to be able to see a list of all available pets for adoption
So that I can know which pets are available

As a site visitor
I want to filter the list of pets to my requirments
So that I can find a good fit for my needs

As a shelter
I want to be able to register my shelter
So that my shelter can be part of the site's listings

As a shelter
I want to add a photo to my pet profile
So that a potential adopter can see what the pet looks like

As a shelter
I want to be able to log in and log out
So that I can have control over my shelter

```

## Technologies 
This application was built using a tech stack of:
 - SQLite
 - Django
 - Django REST Framework
 - ReactJS (Reactstrap)

We chose these technologies because we needed to create a full stack application, and as part of our learning - we wanted to take on new technologies.

Django was chosen because the team wanted to learn python and we found Django to be one of the more popular backend solutions with built in SQLite support to handle the database.

React was chosen because we wanted a JS frontend which allowed for asynchronou functions so that our application could be a dynamic SPA. 

## Screenshots
<img width="1439" alt="Screenshot 2022-01-24 at 17 42 24" src="https://user-images.githubusercontent.com/10349072/150837089-02092091-6f1c-4d38-8114-7d31886c0160.png">

<img width="1439" alt="Screenshot 2022-01-24 at 17 42 46" src="https://user-images.githubusercontent.com/10349072/150837191-4ced6b6b-ef1c-46fd-a892-d8f9bd3d4c42.png">

<img width="1440" alt="Screenshot 2022-01-24 at 17 42 59" src="https://user-images.githubusercontent.com/10349072/150837205-43d6cf4f-0823-4da5-b699-74eb4c737d02.png">

<img width="1438" alt="Screenshot 2022-01-24 at 17 42 36" src="https://user-images.githubusercontent.com/10349072/150837233-998b9327-ca00-4ee0-b28e-9febcc558482.png">

<img width="1440" alt="Screenshot 2022-01-24 at 17 44 50" src="https://user-images.githubusercontent.com/10349072/150837270-00b59666-64e3-47c9-b577-f14d4b3ec1b9.png">

<img width="1436" alt="Screenshot 2022-01-24 at 17 47 09" src="https://user-images.githubusercontent.com/10349072/150837304-91cac907-088c-4616-b841-c55c407e5cf4.png">

<img width="1440" alt="Screenshot 2022-01-24 at 17 47 56" src="https://user-images.githubusercontent.com/10349072/150837320-984b3eb3-d053-4009-b4b4-b310b3642ce1.png">

<img width="1439" alt="Screenshot 2022-01-24 at 17 49 48" src="https://user-images.githubusercontent.com/10349072/150837345-2164f18e-2d3b-4e4c-b0de-35b4957c5a12.png">

<img width="1023" alt="Screenshot 2022-01-24 at 17 53 48" src="https://user-images.githubusercontent.com/10349072/150837497-e814f726-e91e-47df-9380-e2c301e63a6b.png">


## How to run
 
```
create a parent directory for this project: mkdir <directoryname>
cd into your created directory: cd <directoryname>
run to create the virtual enviorment: pip install virtualenv
run to activate the environment: source venv/bin/activate
git clone this project: git clone https://github.com/adam3sUK/paw2door.git 
cd into paw2door
run: pip install -r requirements.txt
run: python manage.py runserver
  open [http://localhost:8000](http://localhost:8000)
in another terminal window: 
cd into frontend folder 
run: npm -i
run: npm start
  the frontend will open on [http://localhost:3000](http://localhost:3000) to view it in your browser.

```
