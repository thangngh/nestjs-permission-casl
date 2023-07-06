import { MigrationInterface, QueryRunner } from "typeorm";

export class NameMigration1688485971183 implements MigrationInterface {
    name = 'NameMigration1688485971183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" SERIAL NOT NULL,
                "role_name" character varying NOT NULL,
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "permission" (
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "isDeleted" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT false,
                "id" SERIAL NOT NULL,
                "action" character varying,
                "subject" character varying,
                "fields" text,
                "condition" jsonb,
                CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "group_permission" (
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "isDeleted" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT false,
                "id" SERIAL NOT NULL,
                "group_id" integer NOT NULL,
                "permission_id" integer NOT NULL,
                CONSTRAINT "PK_12f86c54cc64469ecdb10edc29d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "group" (
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "isDeleted" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT false,
                "id" SERIAL NOT NULL,
                "group_name" character varying NOT NULL,
                CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "group_user" (
                "id" SERIAL NOT NULL,
                "group_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_c637f43a6f0d7891fec59f4d7a7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "isDeleted" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT false,
                "id" SERIAL NOT NULL,
                "user_name" character varying(50) NOT NULL,
                "password" character varying(100) NOT NULL,
                "first_name" character varying(50) NOT NULL,
                "role_id" integer NOT NULL,
                CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7a4fd2a547828e5efe420e50d1" ON "user" ("first_name")
        `);
        await queryRunner.query(`
            ALTER TABLE "group_permission"
            ADD CONSTRAINT "FK_0826ebb1eb8a85e95d8e2f401cb" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "group_permission"
            ADD CONSTRAINT "FK_bfa1a11bbb745d29a4a941c7cc5" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "group_user"
            ADD CONSTRAINT "FK_d339f18d53e39b898da78bbabba" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "group_user"
            ADD CONSTRAINT "FK_0837be536f0f518052a7bef2e04" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"
        `);
        await queryRunner.query(`
            ALTER TABLE "group_user" DROP CONSTRAINT "FK_0837be536f0f518052a7bef2e04"
        `);
        await queryRunner.query(`
            ALTER TABLE "group_user" DROP CONSTRAINT "FK_d339f18d53e39b898da78bbabba"
        `);
        await queryRunner.query(`
            ALTER TABLE "group_permission" DROP CONSTRAINT "FK_bfa1a11bbb745d29a4a941c7cc5"
        `);
        await queryRunner.query(`
            ALTER TABLE "group_permission" DROP CONSTRAINT "FK_0826ebb1eb8a85e95d8e2f401cb"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7a4fd2a547828e5efe420e50d1"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "group_user"
        `);
        await queryRunner.query(`
            DROP TABLE "group"
        `);
        await queryRunner.query(`
            DROP TABLE "group_permission"
        `);
        await queryRunner.query(`
            DROP TABLE "permission"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
    }

}
