import { InputType, Field, ID } from '@nestjs/graphql';
import {Author} from "../../authors/authors.schema";

@InputType()
export class BookInput {
    @Field()
    title: string;

    @Field(type => [ID])
    authorIds: [];
}