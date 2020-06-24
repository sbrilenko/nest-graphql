# task description

# Простой каталог книг

Стек технологий:

* Node.js
* TypeScript
* Nest.js
* TypeORM
* MySQL
* GraphQL with code first approach

GraphQL схему для каталога смотри в файле schema.graphql.

Решение предоставить как ссылку на GitHub репозиторий.

В репозитории обязательно должен быть docker-compose.yml файл который:

* Дает доступ к node.js приложению через порт 5000.
* Дает доступ к mysql через порт 6000.
* Сохраняет mysql данные в volume ./mysql-data.

Приложение должно разворачиваться на локалке двумя командами:

```bash
npm install
docker-compose up
```

После docker-compose up в браузере по адресу http://localhost:5000/ должен быть доступен работоспособный GraphQL Playground.

После docker-compose down данные в базе не должны пропасть.

Приветствуются (но не обязательны) тесты, ограничение сложности GraphQL запросов (query complexity) и решение проблемы N+1 SQL запроса.
 

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
