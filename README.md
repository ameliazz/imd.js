<h1 align='center'>⚡ Imd.js</h1>
<p align='center'>
    A elegant JavaScript alternative for in-memory documents
</p>

Imd.js (_`In Memory Documents`_) is a powerful alternative library for saving data in memory.

## 📚 ] Features

-   _Remote sync;_
-   _Fast and elegant;_
-   _Easy integration and ready to use;_
-   _Key or auto increased number in Document Identifiers;_

## 🔺 ] Links

-   _Package_:
-   -   [npm](https://www.npmjs.com/package/imd.js)
-   _Contributors_:
-   -   [Amélia R.](https://github.com/Canary2000)

## 📗 ] Quick Starting

This quick start guide shows you how to use the basic functions of the library in local use, for integrated server use cases visit the documentation...

Import, first we need to import the library

```js
const Imdjs = require('imd.js')
```

Now, we need to instantiate before we do any operations

```js
const MyDocuments = new Imdjs.default()
```

After we import and instantiate, here are examples of creating documents and getting them.

-   _`create(value, key?, timestamp?)`_: Used to create a new document

```js
const MyTextDocument = MyDocuments.create('Hello World!')
// => Document { _id: 1, content: "Hello World!", timestamp: "..." }
```

-   _[**EXPERIMENTAL**] `bulkCreate(value, key?)`_: Used to create multiple documents in one time

```js
MyDocuments.bulkCreate([
    {
        content: 'Hello World',
    },
    {
        key: 'hello-world-in-portuguese',
        content: 'Olá mundo',
    },
])
// => [
//      Document { _id: 1, content: "Hello World!", timestamp: "..." },
//      Document { _id: "hello-world-in-portuguese", content: "Olá mundo!", timestamp: "..." },
//   ]
```

-   _`rescue(identificator)`_: Used to obtain a document

```js
const MyTextDocument = MyDocuments.create('Hello World!')

MyDocuments.rescue(MyTextDocument._id)
// => Document { _id: 1, content: "Hello World!", timestamp: "..." }
```

-   _`remove(identificator)`_: Used to delete a document

```js
MyDocuments.remove('document-id')
// => true
```

---

<p align='center'>
    Made with 💜 by <a href='https://github.com/Canary2000' target='_blank'>Amélia R.</a>
</p>
