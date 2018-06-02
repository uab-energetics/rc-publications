import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Publication {

    @PrimaryGeneratedColumn()
    id: string

    @Column('varchar')
    projectID: string

    @Column('varchar')
    displayName: string

}
