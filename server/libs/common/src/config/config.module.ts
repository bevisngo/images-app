import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { ConfigModule as NestConfigModule } from '@nestjs/config';
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USERNAME: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
