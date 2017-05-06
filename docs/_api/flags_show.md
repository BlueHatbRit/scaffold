---
title: /flags/:name
position: 3
type: get
description: Show flag access
right_code: |
  ~~~ json
  {
    "id": "590daad5da92210c9a00264d",
    "name": "yet-another-flag",
    "description": "",
    "accessible": false,
    "created_at": "2017-05-06T10:52:05.000Z",
    "updated_at": "2017-05-06T10:52:05.000Z",
  }
  ~~~
  {: title="Response" }
---
This is an authenticated request.
{: .warning }

Returns details of the selected flag with the `accessible` field to indicate whether the authenticated user has access to it.

~~~ javascript
$.get('https://my-scaffold.com/api/v1.0/flags/my-amazing-feature', function(data) {
  console.log(data);
});
~~~
{: title="jQuery" }