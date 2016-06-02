# Collection Cache

This package helps you cache you Mongo collections.

**NOTE: The package API only works on the server!**

## *collection*.cacheTimestamp

```js
MyCollection.cacheTimestamp();
```

Say we have collection called `Posts`:

```js
{
	createdAt: new Date(),
	createdBy: userId,
	updatedAt: new Date(),
	updatedBy: userId,
}
```

## *collection*.cacheDoc

```js
MyCollection.cacheDoc(fieldName, collection, collectionFields, refField);
```

- fieldName: cache field with `_` prefix to store cache doc
- collection: Collection to cache
- collectionFields: array fields to cache ([ ]: for all fields)
- refField: optional, reference field to relation (`fieldName` + `Id`: for default)

Say we have collection called `Posts` and one called `Comments`:

```js
{
	_id: '9f7d606ac1bd7e5167da2fab',
	title: 'My first post',
	content: 'This is my first post'
}
```

And a comment on that post looks like this:

```js
{
	_id: 'e4ed559e813dc82d3fc7fd78',
	postId: '9f7d606ac1bd7e5167da2fab',
	comment: 'Great post!'
}
```

Using 

```js
Comments.cacheDoc('post', Posts, ['title'], 'postId')
```

we can have the post title appear and stay updated in the related comment.
This will copy the related post from `Posts`, keep only the `title` field and put the copy in the comment under the `_post` field.
Now the comment will look like this:

```js
{
	_id: 'e4ed559e813dc82d3fc7fd78',
	postId: '9f7d606ac1bd7e5167da2fab',
	comment: 'Great post!',
	_post: {
		title: 'My first post'
	}
}
```

If the title of the post changes the `_post.title` property of the comment changes too, and if the post is removed, so is the comments for this `postId`.

## *collection*.cacheDocBack

```js
MyCollection.cacheDocBack(fieldName, collection, collectionFields, refField);
```

- fieldName: cache field with `_` prefix to store cache doc back
- collection: Collection to cache
- collectionFields: array fields to cache ([ ]: for all fields)
- refField: reference field to relation

## *collection*.cacheCount

```js
MyCollection.cacheCount(fieldName, collection, refField);
```

- fieldName: cache field with `_` prefix to store doc count
- collection: Collection to count
- refField: reference field to relation

Continuing the previous example we can use 
```js
Posts.cacheCount('commentsCount')
```
To store the comment count on each post:

All posts will now have the `commentsCount` field and the value will update whenever a related comment is inserted/updated/removed. 

## *collection*.cacheField

```js
MyCollection.cacheField(fieldName, collectionFields, value);
```

- fieldName: cache field with `_` prefix to store new doc
- collectionFields: array fields to cache
- value: optional, function callback

```js
Posts.cacheField('_text', ['title', 'content']);
```

You can use `collection.cacheField` to update a field on a document whenever some other fields on the document changes. 
Say we want a single field containing both the title and the content so we easily can filter posts based on a text search:

The `_text` field is updated when `title` or `content` changes. The result will be:

```js
{
	_id: '9f7d606ac1bd7e5167da2fab',
	title: 'My first post',
	content: 'This is my first post',
	_text: 'My first post, This is my first post'
}
```

Now we can run `Posts.find({_text: /first/i})` instead of `Posts.find({$or: [{title: /first/i}, {content: /first/i}]})`.

### The `value` callback

As you can see in the previous example `cacheField` concatenates the watched fields using `', '` as glue. You can change this behavior by providing a callback function that will be used to generate the value. The callback recieves two arguments:

* __doc__ – The document
* __fields__ – An array of the watched fields' names

So if we want `_text` to be lowercase and concatenated with just a space, we would to this instead (using underscore.js):

```js
Comments.cacheField('_text', ['title', 'content'], function(doc) {
	return doc.title.toLowerCase() + ' ' + doc.content.toLowerCase();
});
```

## *collection*.cacheCompactArrayField

```js
MyCollection.cacheCompactArrayField(arrayFields);
```

- arrayFields: array fields to compact


Say we have collection called `Invoice` that have `items` field like this:

```js
{
	_id:
	invoiceDate: new Date(),
	items: [
		null,
		{itemId: 1, itemName: ABC, qty: 10, price: 50, amount: 500},
		{itemId: 2, itemName: Tiger, qty: 5, price: 20, amount: 100},
		null
	]
}
```
You can use `collection.cacheCompactArrayField([items])`.
So it will remove the null object at all.
