import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorBooksResolver } from "./authorbooks.resolver";
import { AuthorBooks }  from './authorbooks.schema';
import { AuthorBooksService } from "./authorbooks.service";
import { Module } from "@nestjs/common";
@Module({
    imports: [TypeOrmModule.forFeature([AuthorBooks])],
    providers: [AuthorBooksResolver, AuthorBooksService],
    exports: [AuthorBooksService],
})
export class AuthorBooksModule{}
