import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import {AuthorModule} from "./authors/authors.module";
import { BookModule } from "./books/books.module";
import {AuthorBooksModule} from "./authorbooks/authorbooks.module";
@Module({
  imports: [
      AuthorModule,
      BookModule,
      AuthorBooksModule,
      TypeOrmModule.forRoot(),
      GraphQLModule.forRoot({
          installSubscriptionHandlers: true,
          autoSchemaFile: join(process.cwd(), 'schema.gql'),
          definitions: {
              path: join(process.cwd(), 'src/graphql.ts'),
              outputAs: 'class',
          },
          debug: false,
          playground: true
      }),
      ],
})
export class AppModule {}
