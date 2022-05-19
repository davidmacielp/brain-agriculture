import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { FakeRuralProducersRepository } from "@modules/rural-producers/implementations/fake/repositories/fake-rural-producers.repository";
import { AppError } from "@shared/server/errors/app.error";
import { Address } from "@modules/rural-producers/contracts/entities/address";
import { Farm } from "@modules/rural-producers/contracts/entities/farm";
import { DashboardService } from "./dashboad.service";

describe("Dashboad Info", () => {
  let dashboardService: DashboardService;
  let adminsRepository: FakeAdminsRepository;
  let ruralProducersRepository: FakeRuralProducersRepository;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    ruralProducersRepository = new FakeRuralProducersRepository();
    dashboardService = new DashboardService(
      adminsRepository,
      ruralProducersRepository
    );

    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 3));
  });

  it("should return dashboard info", async () => {
    const admin = adminsRepository.create({
      email: "fake@admin.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    const ruralProducer1 = ruralProducersRepository.create({
      createdBy: admin.id,
      document: {
        type: "CPF",
        value: "10697061914",
      },
      farm: new Farm({
        label: "Fake farm 1",
        address: new Address({
          city: "Fake City",
          state: "Fake state",
        }),
        cultures: [],
        notUsefulArea: 10,
        usefulArea: 10,
        totalArea: 20,
      }),
    });

    const ruralProducer2 = ruralProducersRepository.create({
      createdBy: admin.id,
      document: {
        type: "CNPJ",
        value: "77239920000191",
      },
      farm: new Farm({
        label: "Fake farm 2",
        address: new Address({
          city: "Fake City",
          state: "Fake state",
        }),
        cultures: [],
        notUsefulArea: 10,
        usefulArea: 30,
        totalArea: 40,
      }),
    });

    await ruralProducersRepository.save(ruralProducer1);
    await ruralProducersRepository.save(ruralProducer2);

    const ruralProducers = await dashboardService.execute({
      adminId: admin.id,
    });

    expect(ruralProducers).toEqual({ totalFarmArea: 60, totalFarmCount: 2 });
  });

  it("should not return dashboard info if admin doesn't exsist", async () => {
    const email = "fake@email.com";
    const admin = adminsRepository.create({
      email,
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      dashboardService.execute({
        adminId: "fake id",
      })
    ).rejects.toEqual(AppError.notAllowed());
  });
});
