import { ConfigService } from '../modules/shared/services/config/config.service';

const configService = new ConfigService();

const jsonConfig = configService.mysqlConfig;

module.exports = jsonConfig;
