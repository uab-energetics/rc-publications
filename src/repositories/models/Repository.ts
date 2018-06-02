import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Repository {

    @PrimaryColumn()
    uuid: string

    @Column('varchar')
    projectID: string

    @Column('varchar')
    displayName: string

}
