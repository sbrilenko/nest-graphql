import { TypeOrmModule } from '@nestjs/typeorm';
import { BookResolver } from "./books.resolver";
import { Book }  from './books.schema';
import { BookService } from "./books.service";
import { Module } from "@nestjs/common";
@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BookResolver, BookService],
})
export class BookModule{}
