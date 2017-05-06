---
title: /flags
position: 4
type: get
description: Index flag access
right_code: |
  ~~~ json
  [
    {
      "id": "590daac3da92210c9a00264c",
      "name": "A-brand-new-flag",
      "description": "",
      "created_at": "2017-05-06T10:51:47.000Z",
      "updated_at": "2017-05-06T10:51:47.000Z",
      "accessible": false
    },
    {
      "id": "590daad5da92210c9a00264d",
      "name": "yet-another-flag",
      "description": "",
      "created_at": "2017-05-06T10:52:05.000Z",
      "updated_at": "2017-05-06T10:52:05.000Z",
      "accessible": false
    }
  ]
  ~~~
  {: title="Response" }
---
This is an authenticated request.
{: .warning }

Returns details of all flags in the system, each with an `accessible` attribute indicating whether the authenticated user has access to that feature.

~~~ javascript
$.get('https://my-scaffold.com/api/v1.0/flags', function(data) {
  console.log(data);
});
~~~
{: title="jQuery" }