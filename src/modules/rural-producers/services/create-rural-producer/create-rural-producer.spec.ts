import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { CreateRuralProducerService } from "./create-rural-producer.service";
import { FakeRuralProducersRepository } from "@modules/rural-producers/implementations/fake/repositories/fake-rural-producers.repository";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { AppError } from "@shared/server/errors/app.error";

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
        cultures: [],
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
        cultures: [],
        notUsefulArea: 10,
        usefulArea: 10,
        totalArea: 20,
        createdAt: new Date(2022, 3, 3),
        updatedAt: new Date(2022, 3, 3),
      },
      createdBy: admin.id,
      createdAt: new Date(2022, 3, 3),
      updatedAt: new Date(2022, 3, 3),
    } as RuralProducer);
  });

  it("should not create if admin doesn't exsist", async () => {
    const email = "fake@email.com";
    const admin = adminsRepository.create({
      email,
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      createRuralProducerService.execute({
        adminId: "fake id",
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
          cultures: [],
          notUsefulArea: 10,
          usefulArea: 10,
          totalArea: 20,
        },
      })
    ).rejects.toEqual(AppError.notAllowed());
  });

  it("should not create rural producer with inconsiste area", async () => {
    const admin = adminsRepository.create({
      email: "fake@email.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      createRuralProducerService.execute({
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
          cultures: [],
          notUsefulArea: 20,
          usefulArea: 10,
          totalArea: 20,
        },
      })
    ).rejects.toEqual(AppError.inconsistencyArea());
  });
});
