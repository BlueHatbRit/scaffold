---
title: Errors
position: 5
---

| Code | Name        | Description                       |
|------|-------------|-----------------------------------|
| 200  | OK          | Success                           |
| 201  | Created     | Creation successful               |
| 400  | Bad Request | The request you sent is incorrect, check your body and URL parameters format |
| 403  | Forbidden   | We couldn't authenticate you, your token is either incorrect or has not been provided |

All errors will return JSON in the following format:

~~~ json
{
  "message": "an error message will be here"
}
~~~
