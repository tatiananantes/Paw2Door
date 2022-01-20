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