import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1654787884734 implements MigrationInterface {
  name = 'UserTable1654787884734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` int NOT NULL, \`loginProvider\` enum ('PASSWORD', 'FACEBOOK', 'GOOGLE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
