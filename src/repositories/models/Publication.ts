import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Repository} from "./Repository";


@Entity()
export class Publication {

    @PrimaryGeneratedColumn()
    id: string

    @Column('varchar', { length: '500' })
    embeddingURL: string

    @Column('text')
    title: string

    @ManyToOne(type => Repository, repo => repo.publications)
    repo: Repository
}
