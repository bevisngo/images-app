import { MigrationInterface, QueryRunner } from "typeorm";

export class InitRelatedUsersTables1722333035622 implements MigrationInterface {
    name = 'InitRelatedUsersTables1722333035622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`bio\` varchar(255) NULL, \`followers\` int NOT NULL DEFAULT '0', \`following\` int NOT NULL DEFAULT '0', \`posts\` int NOT NULL DEFAULT '0', \`avatar\` varchar(255) NULL, \`name\` varchar(255) NULL, \`gender\` enum ('female', 'other', 'male') NULL, \`username\` varchar(255) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_d1ea35db5be7c08520d70dc03f\` (\`username\`), UNIQUE INDEX \`REL_9e432b7df0d182f8d292902d1a\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recent_searches\` json NULL, \`type\` enum ('private', 'public') NOT NULL DEFAULT 'public', \`user_id\` int NULL, UNIQUE INDEX \`REL_a2883eaa72b3b2e8c98e744609\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`follows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`follower_id\` int NULL, \`following_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_9e432b7df0d182f8d292902d1a2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`settings\` ADD CONSTRAINT \`FK_a2883eaa72b3b2e8c98e7446098\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follows\` ADD CONSTRAINT \`FK_54b5dc2739f2dea57900933db66\` FOREIGN KEY (\`follower_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follows\` ADD CONSTRAINT \`FK_c518e3988b9c057920afaf2d8c0\` FOREIGN KEY (\`following_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follows\` DROP FOREIGN KEY \`FK_c518e3988b9c057920afaf2d8c0\``);
        await queryRunner.query(`ALTER TABLE \`follows\` DROP FOREIGN KEY \`FK_54b5dc2739f2dea57900933db66\``);
        await queryRunner.query(`ALTER TABLE \`settings\` DROP FOREIGN KEY \`FK_a2883eaa72b3b2e8c98e7446098\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_9e432b7df0d182f8d292902d1a2\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`follows\``);
        await queryRunner.query(`DROP INDEX \`REL_a2883eaa72b3b2e8c98e744609\` ON \`settings\``);
        await queryRunner.query(`DROP TABLE \`settings\``);
        await queryRunner.query(`DROP INDEX \`REL_9e432b7df0d182f8d292902d1a\` ON \`profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_d1ea35db5be7c08520d70dc03f\` ON \`profiles\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
    }

}
