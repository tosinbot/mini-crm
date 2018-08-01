# MINI CRM - Using Laravel 5 and React Native
## Quick Start

### Backend:

- Clone repo
- Run `composer install`
- Configure `.env` file for authenticating via database
- Run `php artisan migrate --seed`
- Run `php artisan passport:install` for api token

### React Native

- Clone repo
- Run `yarn install`
- Put `IP address of backend server` in config.js file for root and storage url
- Run `react-native run-android` for android app test
- Run `react-native run-ios` for ios app test

## Live Backend Test

- Run a PHP built in server from root project:

```sh
php -S localhost:8000 -t public/
```

Or via artisan command:

```sh
php artisan serve
```

To authenticate admin user, make a `POST` request to `/api/login` with parameter as mentioned below:

```
email: admin@admin.com
password: password
```

Request:

```sh
curl -X POST -F "email=admin@admin.com" -F "password=password" "http://localhost:8000/api/login"
```

Response:

```
{
  "status": "success",
  "message": "login_successful",
  "data": {
    "token": "a_long_token_appears_here"
  }
}
```

- With token provided by above request, you can perform CRUD through api. below are available endpoints

Request:

```sh
Employees Endpoints

curl -X GET -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/employee/view"

curl -X GET -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/employee/view/{id}"

curl -X POST -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/employee/create"

curl -X PUT -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/employee/edit/{id}"

curl -X DELETE -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/employee/delete/{id}"
```


```sh
Companies Endpoints

curl -X GET -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/company/view"

curl -X GET -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/company/view/{id}"

curl -X POST -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/company/create"

curl -X PUT -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/company/edit/{id}"

curl -X DELETE -H "Authorization: Bearer a_long_token_appears_here" "http://localhost:8000/api/company/delete/{id}"
```


