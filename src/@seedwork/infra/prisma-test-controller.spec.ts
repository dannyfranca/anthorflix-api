import { PrismaTestController } from './prisma-test-controller';
import { PrismaService } from './prisma.service';

describe('PrismaTestController', () => {
  test('should not trigger Error', async () => {
    const prismaTestController = new PrismaTestController();
    const url = prismaTestController.url;

    expect(prismaTestController.prisma).toBeInstanceOf(PrismaService);
    expect(prismaTestController.url).toBe(url);

    await prismaTestController.init();
    expect(prismaTestController.url).not.toBe(url);

    await prismaTestController.destroy();

    await prismaTestController.init();

    await prismaTestController.destroy();
  });
});
