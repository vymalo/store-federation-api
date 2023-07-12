import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: async (cs: ConfigService) => ({
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'saleor',
                url: cs.get<string>('SALEOR_API') + '/graphql/',
              },
              { name: 'cms', url: cs.get<string>('CMS_API') + '/graphql' },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GatewayModule {}
