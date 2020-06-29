
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AuthorInput {
    firstName: string;
    lastName: string;
}

export class BookInput {
    title: string;
    authorIds: string[];
}

export class Book {
    id: string;
    title: string;
    authors: Author[];
}

export class Author {
    id: string;
    firstName: string;
    lastName: string;
    books: Book[];
}

export abstract class IQuery {
    abstract getAuthor(id: string): Author | Promise<Author>;

    abstract getAuthors(maxNumberOfBooks?: number, minNumberOfBooks?: number): Author[] | Promise<Author[]>;

    abstract getBook(id?: string): Book | Promise<Book>;

    abstract getBooks(title?: string): Book[] | Promise<Book[]>;
}

export abstract class IMutation {
    abstract createAuthor(author: AuthorInput): Author | Promise<Author>;

    abstract addAuthor(bookId: string, authorId: string): Book | Promise<Book>;

    abstract deleteAuthor(id: string): number | Promise<number>;

    abstract deleteAuthorWithBooks(id: string): number | Promise<number>;

    abstract createBook(book: BookInput): Book | Promise<Book>;

    abstract deleteBook(id: string): number | Promise<number>;
}
