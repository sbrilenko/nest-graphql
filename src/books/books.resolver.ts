import {Resolver, ResolveProperty, Query, Args, Parent, ID, Mutation, Int, ResolveField} from "@nestjs/graphql";
import { Book } from "./books.schema";
import {AuthorService} from "../authors/authors.service";
import {BookService} from "./books.service";
import {BookInput} from "../books/inputs/bookInput";
import {Author} from "../authors/authors.schema";

@Resolver(of => Book)
export class BookResolver {
    constructor(
        private authorService: AuthorService,
        private bookService: BookService,
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

    @Query(returns => [Author])
    async getAuthors(
        @Args('minNumberOfBooks', {type: () => Int, nullable: true}) minNumberOfBooks: number,
        @Args('maxNumberOfBooks', {type: () => Int, nullable: true}) maxNumberOfBooks: number) {
        if (!minNumberOfBooks && !maxNumberOfBooks) {
            return await this.bookService.findAll();

        }
        if(minNumberOfBooks && !maxNumberOfBooks) {
            return await this.bookService.findAll();
        }
        return await this.bookService.findAll();
    }

    @Mutation(() => Book)
    async createBook(
        @Args('book') book: BookInput,
    ) {
        console.log(book)
        return this.bookService.create(book);
    }

    @Mutation(() => Int)
    async deleteBook(
        @Args('id', { type: () => ID}) id: number
    ) {
        return this.bookService.delete(id);
    }

    @Mutation(returns => Book)
    addAuthor(
        @Args('bookId') bookId: number,
        @Args('authorId') authorId: number,
    ) {
        return this.bookService.addAuthor(bookId, authorId);
    }

    // @ResolveField()
    // async getAuthors(@Parent() book: Book) {
    //     return this.authorService.getManyAuthors(book.authors);
    // }
}