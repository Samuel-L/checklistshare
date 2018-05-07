# Checklistshare
[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)

A web application where you can create password-protected checklists and share them. 

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
6. If the tests passes, you're ready to develop!
