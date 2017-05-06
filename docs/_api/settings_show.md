---
title: /settings
position: 4
type: get
description: Show Scaffold settings
right_code: |
  ~~~ json
    {
        "name": {
            "id":"590cf1e5d8bc210cae75edc1",
            "key":"name",
            "value":"My amazing game!",
            "created_at":"2017-05-05T21:43:01.000Z",
            "updated_at":"2017-05-06T10:25:54.000Z"
        },
        "terms": {
            "id":"590cf1e5d8bc210cae75edc2",
            "key":"terms",
            "value":"The following terms and conditions apply...",
            "created_at":"2017-05-05T21:43:01.000Z",
            "updated_at":"2017-05-06T10:25:54.000Z"
        },
        "welcomeCopy": {
            "id":"590d9df2eae3bf0bd058916e",
            "key":"welcomeCopy",
            "value":"Welcome to the back-end for your new app! <a href=\"/docs\">Click here to get started.</a>",
            "created_at":"2017-05-06T09:57:06.000Z",
            "updated_at":"2017-05-06T09:57:06.000Z"
        }
    }
  ~~~
  {: title="Response" }
---

Gets Scaffold's settings, this might be useful for retreiving Terms of Service within your game / app.

~~~ javascript
$.get('https://my-scaffold.com/api/v1.0/settings', function(data) {
  console.log(data);
});
~~~
{: title="jQuery" }