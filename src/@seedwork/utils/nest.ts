import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { GlobalModule } from '../global.module';
import { PrismaService } from '../infra/prisma.service';

export const createTestApp =
  (modules: { new (...args: any): any }[]) =>
  async (fn: (module: TestingModuleBuilder) => any) => {
    const moduleBuilder = Test.createTestingModule({
      imports: [GlobalModule, ...modules],
    });

    fn(moduleBuilder.overrideProvider(PrismaService).useValue({}));

    const moduleRef = await moduleBuilder.compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    return app;
  };
