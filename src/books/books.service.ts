import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './books.schema';
@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) {}

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

    public async create(data) {
        const book = new Book();
        book.title = data.title;
        return this.bookRepository.save(book);
    }

    public async delete(id) {
        return await this.bookRepository.delete(id);
    }
}