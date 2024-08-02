import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1722567615330 implements MigrationInterface {
    name = 'UpdatePostTable1722567615330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`likes\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`likes\``);
    }

}
