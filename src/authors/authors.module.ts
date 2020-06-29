import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthorResolver} from "./authors.resolver";
import {Author} from './authors.schema';
import {AuthorService} from "./authors.service";
import {forwardRef, Module} from "@nestjs/common";
import {BookModule} from "../books/books.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Author]),
        forwardRef(() => BookModule),
    ],
    providers: [AuthorResolver, AuthorService],
    exports: [AuthorService],
})
export class AuthorModule {
}
