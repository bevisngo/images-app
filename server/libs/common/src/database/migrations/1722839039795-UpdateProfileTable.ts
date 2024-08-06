import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfileTable1722839039795 implements MigrationInterface {
    name = 'UpdateProfileTable1722839039795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`avatar\` \`profile_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP COLUMN \`profile_id\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD \`profile_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD UNIQUE INDEX \`IDX_6a23df60690da92fd263eca2e9\` (\`profile_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6a23df60690da92fd263eca2e9\` ON \`profiles\` (\`profile_id\`)`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_6a23df60690da92fd263eca2e93\` FOREIGN KEY (\`profile_id\`) REFERENCES \`avatars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_6a23df60690da92fd263eca2e93\``);
        await queryRunner.query(`DROP INDEX \`REL_6a23df60690da92fd263eca2e9\` ON \`profiles\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP INDEX \`IDX_6a23df60690da92fd263eca2e9\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP COLUMN \`profile_id\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD \`profile_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`profile_id\` \`avatar\` varchar(255) NULL`);
    }

}
