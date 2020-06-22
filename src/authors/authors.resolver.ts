import {Resolver, ResolveProperty, Query, Args, Parent, ID, Int, Mutation} from "@nestjs/graphql";
import { Author } from "./authors.schema";
import { Book } from "./../books/books.schema";
import { AuthorService } from './authors.service'
import { AuthorInput } from './inputs/authorInput';
import {BookService} from "../books/books.service";

@Resolver(of => Author)
export class AuthorResolver {
    constructor(
        private authorsService: AuthorService,
        // private bookService: BookService,
    ) {
    }

    @Query(returns => Author, {name: 'getAuthor', nullable: true})
    async getAuthor(@Args('id', {type: () => ID}) id: number) {
        return this.authorsService.findById(id);
    }

    @Query(returns => [Author])
    async getAuthors(
        @Args('minNumberOfBooks', {type: () => Int, nullable: true}) minNumberOfBooks: number,
        @Args('maxNumberOfBooks', {type: () => Int, nullable: true}) maxNumberOfBooks: number,) {
        if (!minNumberOfBooks && !maxNumberOfBooks) {
            return await this.authorsService.findAll();
        }
        return await this.authorsService.findAll();
    }

    @Mutation(() => Author)
    async createAuthor(
        @Args('author') author: AuthorInput,
    ) {
        return this.authorsService.create(author);

    }

    @Mutation(() => Book)
    async addAuthor(
        @Args('authorId', {type: () => ID}) authorId: number,
        @Args('bookId', {type: () => ID}) bookId: number,
    ) {
        /* do magic */
    }

    @Mutation(() => Int)
    async deleteAuthor(
        @Args('id', {type: () => ID}) id: number
    ) {
        return this.authorsService.deleteAuthor(id);
    }

    @Mutation(() => Int)
    async deleteAuthorWithBooks(
            @Args('id', {type: () => ID}) id: number
    ) {
        /* do another magic */
      }
}