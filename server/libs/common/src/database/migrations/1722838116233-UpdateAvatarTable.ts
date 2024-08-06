import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAvatarTable1722838116233 implements MigrationInterface {
    name = 'UpdateAvatarTable1722838116233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP FOREIGN KEY \`FK_7b741c9e100f57bf8ea77c24318\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP COLUMN \`image_id\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD \`filename\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP COLUMN \`filename\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP COLUMN \`path\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD \`image_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD CONSTRAINT \`FK_7b741c9e100f57bf8ea77c24318\` FOREIGN KEY (\`image_id\`) REFERENCES \`images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
