import { Global, Module } from '@nestjs/common';
import * as Joi from 'joi';

import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRE_IN: Joi.number().required(),
      }),
    }),
  ],
})
export class AuthConfigModule {}
