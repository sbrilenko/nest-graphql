import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Like, Repository} from 'typeorm';
import {Book} from './books.schema';
import {Author} from "../authors/authors.schema";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) {
    }

    public async findOne(title: string) {
        return await this.bookRepository.findOne({title: title});
    }

    public async findById(id: number) {
        return await this.bookRepository.findOne({
            where: {
                id: id
            },
            relations: ["authors"]
        });
    }

    public async findAllLike(title?: string) {
        return this.bookRepository.find({
            where: {
                title: Like(title)
            },
            relations: ["authors"]
        });
    }

    public async findAll() {
        return this.bookRepository.find({
            relations: ["authors"]
        });
    }

    public async create(title: string, authors: Author[]) {
        const book = new Book();
        book.title = title;
        book.authors = authors;
        console.log(book)
        return await this.bookRepository.save(book);
    }

    public async delete(id) {
        return await this.bookRepository.delete(id).then(async (remove) => {
            return remove.affected;
        }).catch(async () => {
            return 0
        });
    }

    public async remove(books) {
        return await this.bookRepository.remove(books);
    }

    public async addAuthor(book: Book, author: Author) {
        book.authors.push(author);
        return await this.bookRepository.save(book);
    }

    public async getManyBooks(booksIds: number[]): Promise<Book[]> {
        return await this.bookRepository.find({
            where: {
                id: In(booksIds)
            },
            relations: ['authors']
        })
    }

}