This project contains the most used code tools in [nata.house](https://natahouse.com/), it's a tree-shakeable lib.

![nh-utils banner](https://i.imgur.com/qpxoiTK.jpg)

# Installation
```bash
npm install nh-utils
```
or
```bash
yarn add nh-utils
```

# Functions

## to

To avoid problems with encapsulation and to make the code clean, is not good to use try catch statements, for this problem _nata.house_ created a method called `to`.

So this statement

```javascript
let result: Result | undefined = undefined;
try {
    result = await someMethodThatReturnsPromise();
} catch (error: Error) {
    throw error;
}
```

Become this

```javascript
const [error, result] = await to(someMethodThatReturnsPromise());
if (error) {
  throw error;
}
```

## toRequest

This function works almost like the `to` function, but is made for [apisauce](https://www.npmjs.com/package/apisauce) results.
It checks if the result has a problem and it's status is not ok, if this condition matches, it's an error.

```javascript
if (data.problem && !data.ok) {
  throw data;
}
return [undefined, data];
```
