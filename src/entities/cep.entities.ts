import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "cep" })

export class CepEntities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 8, unique: true })
    cep: string;

    @Column({ type: "varchar", length: 2 })
    state: string;

    @Column({ type: "varchar", length: 100 })
    city: string;

    @Column({ type: "varchar", length: 100 })
    neighborhood: string;

    @Column({ type: "varchar", length: 150 })
    street: string;

    @Column({ type: "varchar", length: 50 })
    service: string;
    
}