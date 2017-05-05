# API Documentation

## Overview

This documents the HTTP API that a user might access to plug into their desired application. It is recommended that the you read through this entire overview section before continuing.

### Schema

All API end points are accessible over HTTT(S), the root address will depend upon the domain you have connected to your installation. For development with the standard vagrant box, this is `http://local.scaffold.org/api`. It is highly recommended that you secure your installation with SSL to enable usage of HTTPS. All data is sent and received as JSON.

## Users

### Register a new user

```
POST /users
```

#### Input

Name | Type | Description
--- | --- | ---
`email` | `string` | The email address for the user, any password resets will go to this address.
`password` | `string` | The password that the user will use to authenticate with the service.

##### Example

```!json
{
    "email": "elliot@scaffold.io",
    "password": "correcthorsebatterystaple"
}
```

#### Response

```
Status: 201 Created
```
```!json
{
    "id": 39384,
    "email": "elliot@scaffold.io",
    "updated_at": "2017-02-15T14:27:56.188Z",
    "created_at": "2017-02-15T14:27:56.188Z",
}
```

## Authorisation

Authorisation uses [Json Web Tokens](https://jwt.io/) for a stateless and secure session, creating a session will return a token which must be sent with every authenticated request as the Authorization Bearer header.

### Create session

```
POST /session
```

#### Input

Name | Type | Description
--- | --- | ---
`email` | `string` | The email address of the users account.
`password` | `string` | The password set on account creation or last password reset.

##### Example

```!json
{
    "email": "elliot@scaffold.io",
    "password": "correcthorsebatterystaple"
}
```

#### Response

```
Status: 201 Created
```
```!json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Using the Authorization token

The json web token should be presented in the Authorization header as a Bearer token as below.

```
Authorization: Bearer ...
```

#### Example

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Feature flags

### Check users access to a feature

```
GET /users/:user_id/features/:feature_id
```

#### Response

```
Status: 200 OK
```
```!json
{
    "id": 1234,
    "name": "super-great-thing",
    "description": "A super new great feature",
    "type": "simple"
    "hasAccess": true
}
```

### Get users access status to all features

```
GET /users/:user_id/features
```

#### Response

```
Status: 200 OK
```
```!json
[
    {
        "id": 1234,
        "name": "super-great-thing",
        "description": "A super new great feature",
        "type": "simple"
        "hasAccess": true
    },
    {
        "id": 1244,
        "name": "dev-feature-unfinished",
        "description": "Some unfinished feature",
        "type": "group"
        "hasAccess": false
    }
]
```