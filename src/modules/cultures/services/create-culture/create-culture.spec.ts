import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { FakeCulturesRepository } from "@modules/cultures/implementations/fake/repositories/fake-cultures.repository";
import { AppError } from "@shared/server/errors/app.error";
import "reflect-metadata";
import { CreateCultureService } from "./create-culture.service";

describe("Create Culture", () => {
  let createCultureService: CreateCultureService;
  let adminsRepository: FakeAdminsRepository;
  let fakeCulturesRepository: FakeCulturesRepository;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    fakeCulturesRepository = new FakeCulturesRepository();
    createCultureService = new CreateCultureService(
      adminsRepository,
      fakeCulturesRepository
    );

    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 3));
  });

  it("should create a rural producer", async () => {
    const admin = adminsRepository.create({
      email: "fake@admin.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    const culture = await createCultureService.execute({
      adminId: admin.id,
      label: "Fake Culture",
    });

    expect(culture).toEqual({
      id: culture.id,
      label: "Fake Culture",
      createdBy: admin.id,
      createdAt: new Date(2022, 3, 3),
      updatedAt: new Date(2022, 3, 3),
    });
  });

  it("should not create if admin doesn't exsist", async () => {
    const email = "fake@email.com";
    const admin = adminsRepository.create({
      email,
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      createCultureService.execute({
        adminId: "fake id",
        label: "Açucar",
      })
    ).rejects.toEqual(AppError.notAllowed());
  });
});
