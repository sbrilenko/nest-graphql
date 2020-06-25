import {Resolver, ResolveProperty, Query, Args, Parent, ID, Int, Mutation} from "@nestjs/graphql";
import { Author } from "./../authors/authors.schema";
import { Book } from "./../books/books.schema";
import { AuthorBooks } from "./authorbooks.schema";
import { AuthorBooksService } from './authorbooks.service'
import { AuthorBooksInput } from './inputs/authorbooksInput';

@Resolver(of => AuthorBooks)
export class AuthorBooksResolver {
    constructor(
        private authorBooksService: AuthorBooksService
    ) {}

}