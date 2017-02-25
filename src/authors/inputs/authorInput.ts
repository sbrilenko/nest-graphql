import { InputType, Field} from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class AuthorInput {
    @Field()
    @MinLength(2)
    firstName: string;

    @Field()
    @MinLength(2)
    lastName: string;

}