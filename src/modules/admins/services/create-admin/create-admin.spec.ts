import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { CreateAdminService } from "./create-admin.service";
import { AppError } from "@shared/server/errors/app.error";
import { FakeCryptoProvider } from "@providers/crypto/implementations/fake/fake-crypto.provider";

describe("Create Admin", () => {
  let cryptoProvider: FakeCryptoProvider;
  let createAdminService: CreateAdminService;
  let adminsRepository: FakeAdminsRepository;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    cryptoProvider = new FakeCryptoProvider();
    createAdminService = new CreateAdminService(
      adminsRepository,
      cryptoProvider
    );

    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 3));
  });

  it("should create an admin", async () => {
    const admin = await createAdminService.execute({
      email: "fake@email.com",
      password: "123",
    });

    expect(admin).toEqual({
      id: admin.id,
      email: "fake@email.com",
      password: await cryptoProvider.encrypt("123"),
      createdAt: new Date(2022, 3, 3),
      updatedAt: new Date(2022, 3, 3),
    });
  });

  it("should not create an already existing email", async () => {
    const email = "fake@email.com";
    await createAdminService.execute({
      email,
      password: "123",
    });

    await expect(
      createAdminService.execute({
        email,
        password: "123",
      })
    ).rejects.toEqual(AppError.emailInUse(email));
  });
});
