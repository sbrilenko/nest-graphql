import {InputType, Field, ID} from '@nestjs/graphql';

@InputType()
export class AuthorBooksInput {
    @Field(() => ID)
    bookId: number;

    @Field(() => ID)
    authorId: number;

}