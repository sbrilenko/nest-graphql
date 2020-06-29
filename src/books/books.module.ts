import {TypeOrmModule} from '@nestjs/typeorm';
import {BookResolver} from "./books.resolver";
import {Book} from './books.schema';
import {BookService} from "./books.service";
import {forwardRef, Module} from "@nestjs/common";
import {AuthorModule} from "../authors/authors.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        forwardRef(() => AuthorModule),
    ],
    providers: [BookResolver, BookService],
    exports: [BookService],
})
export class BookModule {
}
