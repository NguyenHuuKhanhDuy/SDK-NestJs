import { BoAuthorizeModule } from '@internal/authorize/bo-authorize.module';
import { BoUserModule } from '@internal/user/bo-user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  SWAGGER_API_ROOT,
  SWAGGER_OPTIONS,
  SWAGGER_VERSION,
} from './swagger.constant';

export class SwaggerSetupModule {
  static setup(app: INestApplication): void {
    // NOTE:: Create main API options
    const mainOptions = new DocumentBuilder()
      .setTitle('Multiple Specifications Example')
      .setDescription('Description for multiple specifications')
      .setVersion(SWAGGER_VERSION)
      .addBearerAuth()
      .build();

    const authenticationModules = [AuthModule];
    const internalModules = [BoAuthorizeModule, BoUserModule];
    const clientModules = [UserModule];

    // NOTE:: Setup main API Swagger UI with dropdown support
    const apiOptions = [
      {
        name: SWAGGER_OPTIONS.Authentication.Name,
        description: SWAGGER_OPTIONS.Authentication.Description,
        url: SWAGGER_OPTIONS.Authentication.Url,
        modules: authenticationModules,
      },
      {
        name: SWAGGER_OPTIONS.BackOffice.Name,
        description: SWAGGER_OPTIONS.BackOffice.Description,
        url: SWAGGER_OPTIONS.BackOffice.Url,
        modules: internalModules,
      },
      {
        name: SWAGGER_OPTIONS.Client.Name,
        description: SWAGGER_OPTIONS.Client.Description,
        url: SWAGGER_OPTIONS.Client.Url,
        modules: clientModules,
      },
    ];

    // NOTE:: Create main API document
    const mainDocument = SwaggerModule.createDocument(app, mainOptions);
    SwaggerModule.setup(SWAGGER_API_ROOT, app, mainDocument, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        urls: [
          {
            name: SWAGGER_OPTIONS.Authentication.Name,
            url: SWAGGER_OPTIONS.Authentication.Url,
          },
          {
            name: SWAGGER_OPTIONS.BackOffice.Name,
            url: SWAGGER_OPTIONS.BackOffice.Url,
          },
          {
            name: SWAGGER_OPTIONS.Client.Name,
            url: SWAGGER_OPTIONS.Client.Url,
          },
        ],
      },
      jsonDocumentUrl: 'swagger/swagger.json',
    });

    // NOTE:: API options
    apiOptions.forEach((option) => {
      const documentOptions = new DocumentBuilder()
        .setTitle(option.name)
        .setDescription(option.description)
        .setVersion(SWAGGER_VERSION)
        .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT Bearer token',
        })
        .build();

      // NOTE:: Create API document
      const document = SwaggerModule.createDocument(app, documentOptions, {
        include: option.modules,
      });

      // NOTE:: Setup API Swagger UI
      SwaggerModule.setup(SWAGGER_API_ROOT, app, document, {
        jsonDocumentUrl: option.url,
      });
    });
  }
}
