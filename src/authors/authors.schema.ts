import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Book} from "../books/books.schema";

@Entity()
@ObjectType()
export class Author {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @JoinTable()
    @ManyToMany(type => Book, book => book.authors)
    @Field(type => [Book])
    books: Book[];
}