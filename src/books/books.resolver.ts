import {Resolver, ResolveProperty, Query, Args, Parent, ID, Mutation, Int, ResolveField} from "@nestjs/graphql";
import {Book} from "./books.schema";
import {AuthorService} from "../authors/authors.service";
import {BookService} from "./books.service";
import {BookInput} from "../books/inputs/bookInput";
import {Author} from "../authors/authors.schema";

@Resolver(of => Book)
export class BookResolver {
    constructor(
        private authorService: AuthorService,
        private bookService: BookService,
    ) {
    }

    @Query(returns => Book, {name: 'getBook', nullable: true})
    async getBook(@Args('id', {type: () => ID, nullable: true}) id: number) {
        return this.bookService.findById(id);
    }

    @Query(returns => [Book])
    async getBooks(@Args('title', {nullable: true}) title: string) {
        if (title) {
            return this.bookService.findAllLike(title);
        }
        return this.bookService.findAll();
    }

    @Mutation(() => Book, {nullable: true})
    async createBook(
        @Args('book') book: BookInput,
    ) {
        const {title, authorIds} = book;
        /* check same book */
        const bookDuplicate = await this.bookService.findOne(title);
        if (bookDuplicate) {
            throw new Error('Book with same title already exist');
        }
        let authors = [];
        if (authorIds.length > 0) {
            authors = await this.getManyAuthors(authorIds);
            if (authors.length !== authorIds.length) {
                throw new Error('check please authors id again - seems like some authors does not exist');
            }
        }

        /* save book */
        const newBook = await this.bookService.create(title, authors);
        return newBook;
    }

    @Mutation(() => Int)
    async deleteBook(
        @Args('id', {type: () => ID}) id: number
    ) {
        return await this.bookService.delete(id);
    }

    private async getManyAuthors(authorsIds: string[]): Promise<Author[]> {
        return await this.authorService.getManyAuthors(authorsIds);
    }
}