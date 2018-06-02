import {BeforeInsert, Column, Entity, JoinColumn, OneToMany, PrimaryColumn} from "typeorm";
import {Publication} from "./Publication";

@Entity()
export class Repository {

    @PrimaryColumn()
    uuid: string

    @Column('varchar')
    projectID: string

    @Column('varchar')
    displayName: string

    @OneToMany(type => Publication, publication => publication.repo)
    @JoinColumn()
    publications: Publication[]
}
