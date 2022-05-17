import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { FakeCryptoProvider } from "@providers/crypto/implementations/fake/fake-crypto.provider";
import { FakeTokenProvider } from "@providers/token/implementations/fake/fake-token.provider";
import { AppError } from "@shared/server/errors/app.error";
import { AuthenticateAdminService } from "./authenticate-admin.service";

describe("Admin Authentication", () => {
  let adminsRepository: FakeAdminsRepository;
  let cryptoProvider: FakeCryptoProvider;
  let tokenProvider: FakeTokenProvider;
  let authenticateAdminService: AuthenticateAdminService;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    cryptoProvider = new FakeCryptoProvider();
    tokenProvider = new FakeTokenProvider();
    authenticateAdminService = new AuthenticateAdminService(
      adminsRepository,
      cryptoProvider,
      tokenProvider
    );

    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2020, 3, 3));
  });

  it("should authenticate the admin", async () => {
    const admin = adminsRepository.create({
      email: "fake@email.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    const { token } = await authenticateAdminService.execute({
      email: admin.email,
      password: admin.password,
    });

    const payload = await tokenProvider.getToken(token);

    expect(payload?.owner).toEqual(admin.id);
  });

  it("should not authenticate the admin with invalid email", async () => {
    const email = "not_found@email.com";

    await expect(
      authenticateAdminService.execute({
        email,
        password: "123",
      })
    ).rejects.toEqual(AppError.adminNotFound(email));
  });

  it("should not authenticate the admin with invalid email or password", async () => {
    const admin = adminsRepository.create({
      email: "fake@email.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      authenticateAdminService.execute({
        email: admin.email,
        password: "321",
      })
    ).rejects.toEqual(AppError.invalidEmailAndPasswordCombination());
  });
});
