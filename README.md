# Template processing using regex

Have u ever wondered how to implement string interpolation that support various types?

Imagine having string like so:

`My name is {{var:name}}. I drink {{var:drink}}. The date {{date:today}} is the date when this README was created.`

And you want these placeholders to be fill in with provided values, let's say...:

```js
{
  "name": "Olek",
  "drink": "coffee",
  "today": 1662668899123
}
```

You are expecting output similar to:

`My name is Olek. I drink coffee. The date 2022-09-08 is the date when this README was created.`.

Then u can be interested :) Take a look at: 

`/src/process-template.js`.

---

## Install packages

`npm ci`

## Run tests

`npm run test`

