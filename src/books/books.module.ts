import { TypeOrmModule } from '@nestjs/typeorm';
import { BookResolver } from "./books.resolver";
import { Book }  from './books.schema';
import { BookService } from "./books.service";
import { Module } from "@nestjs/common";
import {AuthorModule} from "../authors/authors.module";
import {AuthorBooksModule} from "../authorbooks/authorbooks.module";
@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        AuthorModule,
        AuthorBooksModule
    ],
    providers: [BookResolver, BookService],
})
export class BookModule{}
