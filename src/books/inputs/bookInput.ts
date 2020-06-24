import { InputType, Field, ID,  } from '@nestjs/graphql';
import { MinLength, IsUUID } from 'class-validator';

@InputType()
export class BookInput {
    @Field()
    @MinLength(1)
    title: string;

    @Field(() => [ID])
    @IsUUID('all', { each: true })
    authorIds: string[];
}