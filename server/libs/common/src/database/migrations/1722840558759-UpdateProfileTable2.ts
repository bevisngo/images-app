import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfileTable21722840558759 implements MigrationInterface {
    name = 'UpdateProfileTable21722840558759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`REL_6d33b04e77cb84f7b9b706dd8b\` ON \`avatars\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6d33b04e77cb84f7b9b706dd8b\` ON \`avatars\` (\`profile_id\`)`);
    }

}
