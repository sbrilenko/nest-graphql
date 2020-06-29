import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In, getConnection} from 'typeorm';
import {Author} from './authors.schema';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author) private authorRepository: Repository<Author>
    ) {
    }

    public async findById(id: number): Promise<Author> {
        return await this.authorRepository.findOne({
            where: {
                id: id
            },
            relations: ["books"]
        });
    }

    public async findAll() {
        return await this.authorRepository.find({
            relations: ["books"]
        });
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
        return await this.authorRepository.delete(id).then(async (remove) => {
            return remove.affected;
        }).catch(async () => {
            return 0
        });
    }

    public async count(minNumberOfBooks?: number, maxNumberOfBooks?: number) {
        let query = await getConnection()
            .getRepository(Author)
            .createQueryBuilder("author")
            .select([
                "author.id",
                "author.firstName",
                "author.lastName",
                "COUNT(*) AS c"
            ])
            .leftJoin("author.books", "book")
        if (minNumberOfBooks) {
            query.having("c >= :minNumberOfBooks", {minNumberOfBooks: minNumberOfBooks})
        }
        if (maxNumberOfBooks) {
            query.andHaving('c < :maxNumberOfBooks', {maxNumberOfBooks: maxNumberOfBooks})
        }
        query.groupBy('author.id').addGroupBy('book.title')
            .orderBy('c', "DESC")
        return query
            .getMany();
    }

    public async getManyAuthors(authorsIds: string[]): Promise<Author[]> {
        return await this.authorRepository.find({
            where: {
                id: In(authorsIds)
            }
        })
    }

}