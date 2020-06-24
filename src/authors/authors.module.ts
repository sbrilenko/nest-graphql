import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorResolver } from "./authors.resolver";
import { Author }  from './authors.schema';
import { AuthorService } from "./authors.service";
import { Module } from "@nestjs/common";
@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    providers: [AuthorResolver, AuthorService],
    exports: [AuthorService],
})
export class AuthorModule{}
