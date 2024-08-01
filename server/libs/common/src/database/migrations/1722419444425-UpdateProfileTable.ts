import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfileTable1722419444425 implements MigrationInterface {
    name = 'UpdateProfileTable1722419444425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`username\` \`username\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`username\` \`username\` varchar(255) NOT NULL`);
    }

}
