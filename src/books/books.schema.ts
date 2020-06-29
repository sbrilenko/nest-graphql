import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Author} from '../authors/authors.schema';

@Entity()
@ObjectType()
export class Book {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field(type => String)
    title: string;

    // @JoinTable()
    @ManyToMany(type => Author, author => author.books)
    @Field(type => [Author])
    authors: Author[];
}