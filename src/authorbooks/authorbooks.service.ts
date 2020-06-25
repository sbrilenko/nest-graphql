import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorBooks } from './authorbooks.schema';
// import { Author } from './../authors/authors.schema';
// import { Book } from './../books/books.schema';

@Injectable()
export class AuthorBooksService {
    constructor(
        @InjectRepository(AuthorBooks) private authorBooksRepository: Repository<AuthorBooks>,
        // @InjectRepository(Author) private authorRepository: Repository<Author>,
        // @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) {}
    public async findById(id: number): Promise<AuthorBooks> {
        return await this.authorBooksRepository.findOne({ id });
    }

    // public async create(data) {
    //     const { bookId, authorId } = data;
    //     const authorBooks = new AuthorBooks();
    //     const author = await this.authorRepository.findById(authorId);
    //     if (!author) {
    //         return 'Author not found';
    //     }
    //
    //     const book = await this.bookRepository.findById(bookId);
    //     if (!book) {
    //         return 'Book not found';
    //     }
    //
    //
    //
    //     author.firstName = data.firstName;
    //     author.lastName = data.lastName;
    //     return await this.authorRepository.save(author);
    // }

}