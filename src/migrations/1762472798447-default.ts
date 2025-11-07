import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1762472798447 implements MigrationInterface {
    name = 'Default1762472798447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cep" ("id" SERIAL NOT NULL, "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(100) NOT NULL, "neighborhood" character varying(100) NOT NULL, "street" character varying(150) NOT NULL, "service" character varying(50) NOT NULL, CONSTRAINT "UQ_9a9b252dcc06d25166ca043ebd1" UNIQUE ("cep"), CONSTRAINT "PK_d0ed0e33814510f6970d23c78b3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cep"`);
    }

}
