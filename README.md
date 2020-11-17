# task-manager

> Task Manager Rest API. (requires node >= 12)

## Setup
```sh
$ git clone git@github.com:achi2211/task-manager-api.git
$ cd task-manager-api
```

## Connect to RDS online database
- Complete the .env file in the root of your project with the next env variables:

```
NODE_ENV=development
TASK_MANAGER_DATABASE_USERNAME=postgres
TASK_MANAGER_DATABASE_NAME=task_manager
TASK_MANAGER_DATABASE_PASSWORD=to be provided
TASK_MANAGER_DATABASE_HOST=task-manager-db.ce0zmyb5ta8y.us-west-2.rds.amazonaws.com
```

## Connect to local database

- Create the postgres database

```
CREATE DATABASE task_manager
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

(Or you can create it from your prefered GUI for PostgreSQL)


- The backend will create the tables based on the models provided in /models


## Run locally

```sh
$ npm install
# just if you use postgresql locally
$ npm install -S pg pg-hstore
# start the api
$ npm start
```

### npm start

- runs **nodemon watch task** for the all files conected to `.api/api.js`
- opens the db connection for `development`
- starts the server on 127.0.0.1:3000

## Tests and code styling

- runs `npm run lint` ([eslint](http://eslint.org/)) with the [airbnb styleguide](https://github.com/airbnb/javascript)
- runs `npm run test` to run unit tests in /test folder


## Run with Docker
* docker build -t {your docker user here}/task-manager-api .
* docker run --rm -p 3000:3000 --name task-manager-api {your docker user here}/task-manager-api


## Endpoints

**URL** : `/public/tasks`

**Method** : `GET`

**Permissions required** : None

**limit query string parameters constraints** Optional : `limit=[integer > 0]`

**limit query string parameters example** Optional : `/public/tasks?limit=50`


## Success Responses

**Code** : `200 OK`

**Content Example** : 
```json
[
    {
        "id": "213d0ad2-1dcc-438b-8789-774d6326a74d",
        "number": 1,
        "title": "Clean the garden",
        "status": "pending",
        "active": true,
        "createdAt": "2020-11-17T12:13:12.334Z",
        "updatedAt": "2020-11-17T12:13:12.334Z"
    },
    {
        "id": "cbab0b95-88b4-4f14-938f-6f0483552573",
        "number": 2,
        "title": "Walking the dog",
        "status": "pending",
        "active": true,
        "createdAt": "2020-11-17T12:13:42.726Z",
        "updatedAt": "2020-11-17T12:22:35.866Z"
    },
    {
        "id": "cbd97314-c6dc-4384-9685-cf64b0cdc37e",
        "number": 3,
        "title": "Go to the gym",
        "status": "pending",
        "active": true,
        "createdAt": "2020-11-17T12:14:03.351Z",
        "updatedAt": "2020-11-17T12:14:03.351Z"
    }
]
```
## Error Responses

**Condition** : Internal server error

**Code** : `500 Internal server error`

**Content** :

```json
{
    "message" :  "Internal server error"
}
```

**URL** : `/public/tasks/{taskId}`

**Method** : `GET`

**Permissions required** : None

**taskId path parameters constraints** Required: `valid task UUID`

**taskId path parameters example** Required : `/public/tasks/213d0ad2-1dcc-438b-8789-774d6326a74d`


## Success Responses

**Code** : `200 OK`

**Content Example** : 
```json
{
    "id": "213d0ad2-1dcc-438b-8789-774d6326a74d",
    "number": 1,
    "title": "Clean the garden",
    "status": "pending",
    "active": true,
    "createdAt": "2020-11-17T12:13:12.334Z",
    "updatedAt": "2020-11-17T12:13:12.334Z"
}
```
## Error Responses

**Condition** : Internal server error

**Code** : `500 Internal server error`

**Content** :

```json
{
    "message" :  "Internal server error"
}
```


**URL** : `/public/tasks/{taskId}`

**Method** : `PUT`

**Permissions required** : None

**taskId path parameters constraints** Required: `valid task UUID`

**taskId path parameters example** Required : `/public/tasks/213d0ad2-1dcc-438b-8789-774d6326a74d`

**Request payload** : 
```json
{
    "status":"done"
}
```

## Success Responses

**Code** : `200 OK`

## Error Responses

**Condition** : Internal server error

**Code** : `500 Internal server error`

**Content** :

```json
{
    "message" :  "Internal server error"
}
```

**URL** : `/public/tasks`

**Method** : `POST`

**Permissions required** : None


**Request payload** : 
```json
{
    "title":"Go to the hairdresser"
}
```

## Success Responses

**Code** : `200 OK`

**Content Example** : 
```json
{
    "id": "213d0ad2-1dcc-438b-8789-774d6326a74d",
    "number": 4,
    "title": "Go to the hairdresse",
    "status": "pending",
    "active": true,
    "createdAt": "2020-11-17T12:13:12.334Z",
    "updatedAt": "2020-11-17T12:13:12.334Z"
}
```

## Error Responses

**Condition** : Internal server error

**Code** : `500 Internal server error`

**Content** :

```json
{
    "message" :  "Internal server error"
}
```

## LICENSE

MIT © Adrian Ojeda
