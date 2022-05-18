import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { AppError } from "@shared/server/errors/app.error";
import { ListCulturesService } from "./list-culters.service";
import { FakeCulturesRepository } from "@modules/cultures/implementations/fake/repositories/fake-cultures.repository";

describe("List Cultures", () => {
  let listCulturesService: ListCulturesService;
  let adminsRepository: FakeAdminsRepository;
  let culturesRepository: FakeCulturesRepository;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    culturesRepository = new FakeCulturesRepository();
    listCulturesService = new ListCulturesService(
      adminsRepository,
      culturesRepository
    );

    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 3));
  });

  it("should list all cultures", async () => {
    const admin = adminsRepository.create({
      email: "fake@admin.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    const culture1 = culturesRepository.create({
      createdBy: admin.id,
      label: "Açucar",
    });

    const culture2 = culturesRepository.create({
      createdBy: admin.id,
      label: "Açucar",
    });

    await culturesRepository.save(culture1);
    await culturesRepository.save(culture2);

    const cultures = await listCulturesService.execute({
      adminId: admin.id,
    });

    expect(cultures).toEqual([culture1, culture2]);
  });

  it("should not list cultures if admin doesn't exsist", async () => {
    const email = "fake@email.com";
    const admin = adminsRepository.create({
      email,
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      listCulturesService.execute({
        adminId: "fake id",
      })
    ).rejects.toEqual(AppError.notAllowed());
  });
});
