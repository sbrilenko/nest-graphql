import { TypeOrmModule } from '@nestjs/typeorm';
import { BookResolver } from "./books.resolver";
import { Book }  from './books.schema';
import { BookService } from "./books.service";
import { Module } from "@nestjs/common";
import {AuthorModule} from "../authors/authors.module";
@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        AuthorModule,
    ],
    providers: [BookResolver, BookService],
})
export class BookModule{}
