---
title: /users
position: 1
type: post
description: Create user
right_code: |
  ~~~ json
  {
    "id": "590331c41e99a10b5bd398d3",
    "email": "user@scaffold.com",
    "created_at": "2017-04-28T12:12:52.000Z",
    "updated_at": "2017-04-28T12:12:52.000Z",
    "groups": []
  }
  ~~~
  {: title="Response" }
---
email
: The users email address the user will use to login with.

password
: The password the user will use to log in with.

The email address must be valid as they will need to confirm it for password recovery purposes.
{: .warning }

Creates a new user account which can be used to login.

~~~ javascript
$.post('https://my-scaffold.com/api/v1.0/users', {
  'email': 'elliot@scaffold.com',
  'password': '6OdjOuWjU7c#'
}, function(data) {
  console.log(data);
});
~~~
{: title="jQuery" }