<h1 align='center'>⚡ Imd.js</h1>
<p align='center'>
    A elegant JavaScript alternative for in-memory documents
</p>


Imd.js (*`In Memory Documents`*) is a powerful alternative library for saving data in memory.

## 📚 ] Features
+ *Fast and elegant;*
+ *Easy integration and ready to use*
+ *Key or auto increased number in Document Identifiers;*

## 📗 ] Quick Starting

Import, first we need to import the library
```js
const Imdjs = require('imd.js')
```

Now, we need to instantiate before we do any operations
```js
const MyDocuments = new Imdjs.default()
```

After we import and instantiate, here are examples of creating documents and getting them.

+ *`create(value, key?)`*: Used to create a new document
```js
const MyTextDocument = MyDocuments.create("Hello World!")
// => Document { _id: 1, content: "Hello World!" } 
```

+ *[**EXPERIMENTAL**] `bulkCreate(value, key?)`*: Used to create multiple documents in one time
```js
MyDocuments.bulkCreate([
    {
        content: "Hello World"
    }
])
// => Document { _id: 1, content: "Hello World!" } 
```

+ *`rescue(identificator)`*: Used to obtain a document

```js
const MyTextDocument = MyDocuments.create("Hello World!")

MyDocuments.rescue(MyTextDocument._id)
// => Document { _id: 1, content: "Hello World!" } 
```