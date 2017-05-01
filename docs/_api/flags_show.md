---
title: /flags/:name
position: 3
type: get
description: Show flag access
right_code: |
  ~~~ json
  {
    "accessible": true
  }
  ~~~
  {: title="Response" }
---
This is an authenticated request.
{: .warning }

Returns whether the authenticated user can access the flag.

~~~ javascript
$.get('https://my-scaffold.com/api/v1.0/flags/my-amazing-feature', function(data) {
  console.log(data);
});
~~~
{: title="jQuery" }