# Modules

You may have noticed that there are two different ways of importing code between
files being used in this project. The backend uses `require` and the frontend
uses `import`. It is important to understand how to use both module systems.

This page provides an overview of the different systems, along with an
explanation of why both are used.

Contents:

- [History](#history)
- [Backend - CommonJS](#backend---commonjs)
- [Frontend - ES Modules](#frontend---es-modules)

## History

JavaScript was originally a purely frontend, browser-based language, without any
module system whatsoever. As frontend scripts began to grow in size, and browser
applications became more complex, there was a need to develop a way to load
files (modules) from other files.

A number of different module systems were developed, called AMD, UMD and
CommonJS. When Node.js was released in 2009, **CommonJS** was chosen as the
native module system. You will recognise it as the module system you have used
so far, which uses `require` and `module.exports`.

In 2015, a major update to JavaScript was released, called ES6. This included a
new, definitive, standardised module system named **ES Modules** or (ESM for
short). The syntax for this is `import` and `export` which can be found in this
project's frontend.

Adoption of ES Modules has so far been slow, mainly due to the existing
prevalance of CommonJS packages and the popularity of NodeJS, but it is getting
better all the time. At some point soon NodeJS will switch over properly to ESM,
but until then, CommonJS will remain the standard for backend code.

## Backend - CommonJS

We can set the export of a file using `module.exports`. Each file can have _one
export only_ , which means that if we want to export multiple files, we need to
put them together into an object.

### Exporting one value:

```js
module.exports = MyClass;
```

Which can then be imported from another file using `require`:

```js
const MyClass = require("./path/to/other/file.js");
```

### Exporting multiple values:

We can export multiple values by collecting them together into an object, and
exporting that.

```js
module.exports = {
  MyFirstClass: MyFirstClass,
  MySecondClass: MySecondClass,
  myFunction: myFunction,
  // etc...
};
```

Which can then be imported through [destructuring](destructuring-link):

```js
const { MyFirstClass, myFunction } = require("./path/to/other/file.js");
```

## Frontend - ES Modules

Instead of `require` and `module.exports`, ES Modules use `import` and `export`.

### Exporting a single value

To export a single value, we use the `default` keyword:

```js
export default MyClass;
```

and then import it with `import`, using `from` to specify the file path:

```js
import MyClass from "./path/to/other/file.js";
```

### Exporting multiple values

To export multiple values, we can use the `export` keyword more than once:

```js
export const add = (a, b) => {
  return a + b;
};

export const multiply = (a, b) => {
  return a * b;
};
```

which can then be imported using [destructuring](destructuring-link):

```js
import { add, multiply } from "./path/to/other/file.js";
```

[destructuring-link]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
