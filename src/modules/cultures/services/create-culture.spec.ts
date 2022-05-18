import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import "reflect-metadata";
import { FakeCulturesRepository } from "../implementations/fake/repositories/fake-cultures.repository";
import { CreateCultureService } from "./create-culture.service";

describe("Create Rural Producer", () => {
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

  // it("should not create an already existing email", async () => {
  //   const email = "fake@email.com";
  //   await createAdminService.execute({
  //     email,
  //     password: "123",
  //   });

  //   await expect(
  //     createAdminService.execute({
  //       email,
  //       password: "123",
  //     })
  //   ).rejects.toEqual(AppError.emailInUse(email));
  // });
});
