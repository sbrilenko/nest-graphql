import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './authors.schema';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author) private authorRepository: Repository<Author>,
    ) {}
    public async findById(id: number): Promise<Author> {
        return await this.authorRepository.findOne({ id });
    }

    public async findAll() {
        return await this.authorRepository.find();
    }
    public async create(data) {
        const author = new Author();
        author.firstName = data.firstName;
        author.lastName = data.lastName;
        return await this.authorRepository.save(author);
    }

    public async save(data) {
        return await this.authorRepository.save(data);
    }

    public async deleteAuthor(id) {
        return await this.authorRepository.delete(id);
    }

    public async getManyAuthors(authorsIds: string[]): Promise<Author[]> {
        return await this.authorRepository.find({
            where: {
                id: {
                    $in: authorsIds,
                },
            },
        });
    }

}