import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {Book} from "../books/books.schema";
import {Author} from "../authors/authors.schema";

@Entity()
@ObjectType()
export class AuthorBooks {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @ManyToOne(type => Book, book => book.id, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "bookId" })
    bookId: number;

    @Column()
    @ManyToOne(type => Author, author => author.id, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "authorId" })
    authorId: number;
}