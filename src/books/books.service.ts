import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './books.schema';
import { BookInput } from './inputs/bookInput';
import {Author} from "../authors/authors.schema";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) {}

    public async findOne(title: string) {
        return await this.bookRepository.findOne({ title: title });
    }

    public async findById(id: number) {
        return await this.bookRepository.findOne({ id });
    }

    public async findAllLike(title?: string) {
        return this.bookRepository.find({
            title: Like(title)
        });
    }

    public async findAll() {
        return this.bookRepository.find();
    }

    public async create(title: string, authors) {
        const book = new Book();
        book.title = title;
        book.authors = authors;
        return await this.bookRepository.save(book);
    }

    public async delete(id) {
        return await this.bookRepository.delete(id);
    }

    public async addAuthor(bookId, authorId) {
            /* in progress */
    }
}