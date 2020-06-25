import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from '../authors/authors.schema';
@Entity()
@ObjectType()
export class Book {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field(type => String)
    title: string;

    @Field(type => [Author])
    authors: [Author];
}