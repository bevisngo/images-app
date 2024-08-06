import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageTable1722845792930 implements MigrationInterface {
    name = 'UpdateImageTable1722845792930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`url\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD CONSTRAINT \`FK_6d33b04e77cb84f7b9b706dd8be\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP FOREIGN KEY \`FK_6d33b04e77cb84f7b9b706dd8be\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`url\` varchar(255) NOT NULL`);
    }

}
