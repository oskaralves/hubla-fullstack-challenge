import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import {
  REQUEST_ID_HEADER,
  RequestIdMiddleware,
} from './middlewares/request-id.middleware';

@Module({
  imports: [
    LoggerPinoModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
            messageKey: 'message',
            customProps: (req) => ({
              requestCorrelationId: req[REQUEST_ID_HEADER],
            }),
            // autoLogging: false,
            // serializers: {
            //   req: () => undefined,
            //   res: () => undefined,
            // },
          },
        };
      },
    }),
  ],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
