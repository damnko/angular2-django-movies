# Angular2 Django | Movies
[![Build Status][build-badge]][build-link]
[![License][licence-badge]](/LICENSE)

<p align="center">
  <a href="https://django-angular2-movies.firebaseapp.com/" target="_blank">
    <img src="https://django-angular2-movies.firebaseapp.com/assets/images/preview.gif" alt="Angular 2 Django demo" width="800"/>
  </a><br>
  <a href="https://django-angular2-movies.firebaseapp.com/" target="_blank">
    View Demo
  </a>
</p>

A sample Angular 2 app paired with a Django API to explore:
* user registration and uthentication
* form validation
* protected routes
* jwt tokens
* django implementations
* mysql implementation
 
## Getting Started & Initial Setup
### Cloning the repo
* `fork` this repo
* `clone` your fork

### Setting up Angular 2 client
Install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `yarn` (`npm install --global yarn`)

Then, from inside the `angular2-client` folder run:
* `yarn` or `npm install` to install all dependencies

### Setting up Django server
In order to setup the Django server you need at least python 3.4.
It is suggested to create a virtual environment to install all the dependencies:
Install `virtualvenv` if you don't have it
```sh
$ pip install virtualenv
```
create a new virtual environment
```sh
$ virtualenv venv
```
activate the virtual environment that can be later deactivated with `deactivate`
```sh
$ source venv/bin/activate
```
Then you can install all the required dependencies:
```sh
$ pip install -r ./django-server/requirements.txt
```

### Setting up MySQL
The user registration, movie comments and ratings are stored in a MySQL database, if you don't have one already installed I suggest to follow the following quick tutorial (for Linux): https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04
You may also need to install these additional packages:
```sh
$ sudo apt-get install python-dev mysql-server libmysqlclient-dev
```

## Configuration
1. Create a `.env` file in the `/angular2-client` directory with the following line `SERVER_LOCATION=local`. This will set the appropriate env variable needed to address the api calls to `localhost:8000`.
2. Customize the `DATABASES` variable in `/django-server/server/settings.py` with the database name, host, user and password.
3. Create the database tables by running `python manage.py makemigrations movies` from the `/django-server` folder to create the migrations first, and then `python manage.py migrate` to apply them.

## Running the app
* To start the server run `python manage.py runserver` from the `/django-server` folder. Server will be running on `http://localhost:8000/`
* To start the client run `npm start` from the `/angular2-client` folder. Client will be running on `http://localhost:3000/`

## License
MIT © [damnko](https://github.com/damnko)

[licence-badge]: https://img.shields.io/npm/l/express.svg
[build-badge]: https://travis-ci.org/damnko/angular2-feed-me.png?branch=master
[build-link]: https://travis-ci.org/damnko/angular2-feed-me