# [Checklistshare - 1.0.0](https://checklistshare.herokuapp.com)
[![Build Status](https://travis-ci.org/Samuel-L/checklistshare.svg?branch=development)](https://travis-ci.org/Samuel-L/checklistshare)

A web application where you can create checklists, share them and let others add items to the list. 

## Setup for development
1. Create a postgresql database
2. Create .env file in /api/ containing
    ```bash
    MODE = 'dev'
    WHITELIST_URL = ''
    SECRET_KEY = 'somerandomsecretkey'
    DB_NAME = 'name_of_previously created database'
    DB_USERNAME = 'username_with_permissions_to_created_database'
    DB_PASSWORD = 'password_for_user_with_permissions_to_created_database'
    DB_HOST = localhost
    DB_PORT = ''
    ```
3. Run `pip install -r requirements.txt`
4. Run `python api/manage.py migrate`
5. Run `python api/manage.py test api`
6. Run `python api/manage.py runserver`
7. If no errors are shown, the api is working correctly.
8. Now run `npm install`. This will take a while.
9. If no errors are shown, the client is working correctly.
10. You can now develop!

## Running tests
### Api
`python api/manage.py test api`
### Client
`npm run test`

## Changelog
You can see all the changes in the [CHANGELOG.md](CHANGELOG.md) file.

## Built with
Python 3.6, Node v8.11.1, React, Redux, Django and Django Rest Framework

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

