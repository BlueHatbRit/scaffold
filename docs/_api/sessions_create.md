---
title: /sessions
position: 2
type: post
description: Create a user session
right_code: |
  ~~~ json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZWxsaW90LmJsYWNrYnVybkBnbWFpbC5jb20iLCJpZCI6IjU5MDMzMWM0MWU5OWExMGI1YmQzOThkMyIsImNyZWF0ZWRfYXQiOiIyMDE3LTA0LTI4VDEyOjEyOjUyLjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wNC0yOFQxMjoxMjo1Mi4wMDBaIiwiZ3JvdXBzIjpbeyJpZCI6IjU5MDMzMTRiMWU5OWExMGI1YmQzOThkMiIsIm5hbWUiOiJzdGFmZiIsImRlc2NyaXB0aW9uIjoiVGhvc2Ugd2l0aCBhY2Nlc3MgdG8gc3RhZmYgZmVhdHVyZXMgYW5kIHRoZSB3ZWIgY29uc29sZSJ9XX0sImlhdCI6MTQ5MzM4MjM5M30.QMvE9KL3i89ORhiWL0azWPTdWRj5CorbMGVEClLSRGI"
  }
  ~~~
  {: title="Response" }
---
email
: The users address the user registered with.

password
: The users password.

This should be provided with all subsequent requests and is required for most routes provided by the Scaffold API.
{: .info }

Creates a new authenticated session for the user and returns a token to identify the session.

~~~ javascript
// Log in
$.post('https://my-scaffold.com/api/v1.0/sessions', {
  'email': 'elliot@scaffold.com',
  'password': '6OdjOuWjU7c#'
}, function(data) {
  console.log(data);
});

// Use the session token
$.get('https://my-scaffold.com/api/v1.0/flags/my-feature', {
  headers: {
    Authorization: 'Bearer token...' // replace "token..." with your token
  }  
}, function(data) {
  console.log(data);
});
~~~
{: title="jQuery" }