import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { CreateRuralProducerService } from "./create-rural-producer.service";
import { FakeRuralProducersRepository } from "@modules/rural-producers/implementations/fake/repositories/fake-rural-producers.repository";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";

describe("Create Rural Producer", () => {
  let createRuralProducerService: CreateRuralProducerService;
  let adminsRepository: FakeAdminsRepository;
  let fakeRuralProducersRepository: FakeRuralProducersRepository;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    fakeRuralProducersRepository = new FakeRuralProducersRepository();
    createRuralProducerService = new CreateRuralProducerService(
      adminsRepository,
      fakeRuralProducersRepository
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

    const ruralProducer = await createRuralProducerService.execute({
      adminId: admin.id,
      document: {
        type: "CPF",
        value: "10697061914",
      },
      farm: {
        label: "Fake farm",
        address: {
          city: "Fake City",
          state: "Fake state",
        },
        cultures: ["Açucar"],
        notUsefulArea: 10,
        usefulArea: 10,
        totalArea: 20,
      },
    });

    expect(ruralProducer).toEqual({
      id: ruralProducer.id,
      document: {
        type: "CPF",
        value: "10697061914",
      },
      farm: {
        id: ruralProducer.farm.id,
        label: "Fake farm",
        address: {
          id: ruralProducer.farm.address.id,
          city: "Fake City",
          state: "Fake state",
          createdAt: new Date(2022, 3, 3),
          updatedAt: new Date(2022, 3, 3),
        },
        cultures: ["Açucar"],
        notUsefulArea: 10,
        usefulArea: 10,
        totalArea: 20,
        createdAt: new Date(2022, 3, 3),
        updatedAt: new Date(2022, 3, 3),
      },
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
