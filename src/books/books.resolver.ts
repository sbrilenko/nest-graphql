import {Resolver, ResolveProperty, Query, Args, Parent, ID, Mutation, Int} from "@nestjs/graphql";
import { Book } from "./books.schema";
import {BookService} from "./books.service";
import {BookInput} from "../books/inputs/bookInput";

@Resolver(of => Book)
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Query(returns  => Book, { name: 'getBook', nullable: true })
    async getBook(@Args('id', { type: () => ID, nullable: true}) id: number) {
        return this.bookService.findById(id);
    }

    @Query(returns  => [Book])
    async getBooks(@Args( 'title', { nullable: true }) title: string) {
        if (title) {
            return this.bookService.findAllLike(title);
        }
        return this.bookService.findAll();
    }

    @Mutation(() => Book)
    async createBook(
        @Args('book') book: BookInput,
    ) {
        return this.bookService.create(book);
    }

    @Mutation(() => Int)
    async deleteBook(
        @Args('id', { type: () => ID}) id: number
    ) {
        return this.bookService.delete(id);
    }
}