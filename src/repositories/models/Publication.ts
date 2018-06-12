import {Column, Entity, Generated, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Repository} from "./Repository";


@Entity()
export class Publication {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated('uuid')
    @Index()
    uuid: string

    @Column('varchar', { nullable: true })
    @Index()
    sourceID: string

    @Column('varchar', { length: '500' })
    embeddingURL: string

    @Column({ type: 'text', charset: 'utf8mb4'})
    title: string

    @ManyToOne(type => Repository, repo => repo.publications, { onDelete: 'CASCADE' })
    repo: Repository
}
