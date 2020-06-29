import {Resolver, ResolveProperty, Query, Args, Parent, ID, Int, Mutation} from "@nestjs/graphql";
import {Author} from "./authors.schema";
import {Book} from "./../books/books.schema";
import {AuthorService} from './authors.service'
import {AuthorInput} from './inputs/authorInput';
import {BookService} from "../books/books.service";

@Resolver(of => Author)
export class AuthorResolver {
    constructor(
        private authorService: AuthorService,
        private bookService: BookService,
    ) {
    }

    @Query(returns => Author, {name: 'getAuthor', nullable: true})
    async getAuthor(@Args('id', {type: () => ID}) id: number) {
        return this.authorService.findById(id);
    }

    @Query(returns => [Author])
    async getAuthors(
        @Args('minNumberOfBooks', {type: () => Int, nullable: true}) minNumberOfBooks: number,
        @Args('maxNumberOfBooks', {type: () => Int, nullable: true}) maxNumberOfBooks: number) {
        if (!minNumberOfBooks && !maxNumberOfBooks) {
            return await this.authorService.findAll();
        }
        return await this.authorService.count(minNumberOfBooks, maxNumberOfBooks);
    }

    @Mutation(() => Author)
    async createAuthor(
        @Args('author') author: AuthorInput,
    ) {
        return this.authorService.create(author);
    }

    @Mutation(returns => Book)
    async addAuthor(
        @Args('authorId', {type: () => ID}) authorId: number,
        @Args('bookId', {type: () => ID}) bookId: number,
    ) {
        const book = await this.bookService.findById(bookId);
        if (!book) {
            throw new Error('book not found');
        }
        const author = await this.authorService.findById(authorId);
        if (!author) {
            throw new Error('author not found');
        }
        return this.bookService.addAuthor(book, author);
    }

    @Mutation(() => Int)
    async deleteAuthor(
        @Args('id', {type: () => ID}) id: number
    ) {
        return await this.authorService.deleteAuthor(id);
    }


    @Mutation(() => Int)
    async deleteAuthorWithBooks(
        @Args('id', {type: () => ID}) id: number
    ) {
        /* find author */
        const author = await this.authorService.findById(id);

        /* remove books */
        const bookIds = author.books.map((book) => {
                return book.id;
        });
        const allBooksWithAuthors = await this.bookService.getManyBooks(bookIds);
        const booksForRemove = [];
        allBooksWithAuthors.forEach((book) => {
            if (book.authors.length === 1 && book.authors[0].id == id) {
                booksForRemove.push(book);
            }
        })
        await this.bookService.remove(booksForRemove);
        return await this.authorService.deleteAuthor(id);
    }
}