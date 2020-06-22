## start

 - npm i
 - docker-compose up
 - go to localhost:5000/graphql
 - Mysql port 6000 (user: root, pass: root)

## graphql

### create author
```
mutation {
  createAuthor(
    author: {
      firstName: "Sergey",
      lastName: "Brilenko"
    }
  ),
  {
    id,
    firstName,
    lastName
  }
}
```

### get author by id
```
{
  getAuthor(id: 1) {
    id,
    firstName,
    lastName
  }
}
```

### create book
```
mutation {
  createBook(
    book: {
    	title: "first book",
      authorIds: []
  }),
  {
    id,
    title
  }
}
```

### get book by id
```
{
  getBook(id: 1) {
    id,
    title
  }
}
```

### get books empty arg title 
```
{
  getBooks {
    id,
    title
  }
}
```

### get books with arg title ("like" support)
```
{
  getBooks(title: "first %") {
    id,
    title
  }
}
```

### get authors
```

```

### delete book
```
mutation {
  deleteBook(id: 2)
}
```

### delete author
```
mutation {
  deleteAuthor(id: 1)
}
```
