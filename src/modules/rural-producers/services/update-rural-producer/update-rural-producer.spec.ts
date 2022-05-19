import "reflect-metadata";
import { FakeAdminsRepository } from "@modules/admins/implementations/fake/repositories/fake-admins.repository";
import { FakeRuralProducersRepository } from "@modules/rural-producers/implementations/fake/repositories/fake-rural-producers.repository";
import { RuralProducer } from "@modules/rural-producers/contracts/entities/rural-producer";
import { AppError } from "@shared/server/errors/app.error";
import { UpdateRuralProducerService } from "./update-rural-producer.service";
import { FakeCulturesRepository } from "@modules/cultures/implementations/fake/repositories/fake-cultures.repository";
import { Address } from "@modules/rural-producers/contracts/entities/address";
import { Farm } from "@modules/rural-producers/contracts/entities/farm";

describe("Update Rural Producer", () => {
  let updateRuralProducerService: UpdateRuralProducerService;
  let adminsRepository: FakeAdminsRepository;
  let ruralProducersRepository: FakeRuralProducersRepository;
  let culturesRepository: FakeCulturesRepository;

  beforeEach(() => {
    adminsRepository = new FakeAdminsRepository();
    ruralProducersRepository = new FakeRuralProducersRepository();
    culturesRepository = new FakeCulturesRepository();
    updateRuralProducerService = new UpdateRuralProducerService(
      adminsRepository,
      ruralProducersRepository,
      culturesRepository
    );

    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 3));
  });

  it("should update a rural producer", async () => {
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
      label: "Café",
    });

    await culturesRepository.save(culture1);
    await culturesRepository.save(culture2);

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
        cultures: [culture1, culture2],
        notUsefulArea: 10,
        usefulArea: 10,
        totalArea: 20,
      }),
    });

    ruralProducersRepository.save(ruralProducer1);

    const updatedRuralProducer = await updateRuralProducerService.execute({
      adminId: admin.id,
      ruralProducerId: ruralProducer1.id,
      document: {
        type: "CPF",
        value: "10697061900",
      },
      farm: {
        label: "Updated Fake farm",
        address: {
          city: "Updated Fake City",
          state: "Updated Fake state",
        },
        cultures: [culture1.id],
        notUsefulArea: 100,
        usefulArea: 100,
        totalArea: 200,
      },
    });

    expect(updatedRuralProducer).toEqual({
      id: ruralProducer1.id,
      document: {
        type: "CPF",
        value: "10697061900",
      },
      farm: {
        id: ruralProducer1.farm.id,
        label: "Updated Fake farm",
        address: {
          id: ruralProducer1.farm.address.id,
          city: "Updated Fake City",
          state: "Updated Fake state",
          createdAt: new Date(2022, 3, 3),
          updatedAt: new Date(2022, 3, 3),
        },
        cultures: [culture1],
        notUsefulArea: 100,
        usefulArea: 100,
        totalArea: 200,
        createdAt: new Date(2022, 3, 3),
        updatedAt: new Date(2022, 3, 3),
      },
      createdBy: admin.id,
      createdAt: new Date(2022, 3, 3),
      updatedAt: new Date(2022, 3, 3),
    } as RuralProducer);
  });

  it("should not update if admin doesn't exsist", async () => {
    await expect(
      updateRuralProducerService.execute({
        adminId: "fake id",
        ruralProducerId: "Fake id",
        document: {
          type: "CPF",
          value: "10697061900",
        },
        farm: {
          label: "Updated Fake farm",
          address: {
            city: "Updated Fake City",
            state: "Updated Fake state",
          },
          cultures: [],
          notUsefulArea: 100,
          usefulArea: 100,
          totalArea: 200,
        },
      })
    ).rejects.toEqual(AppError.notAllowed());
  });

  it("should not update rural producer with inconsiste area", async () => {
    const admin = adminsRepository.create({
      email: "fake@email.com",
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

    ruralProducersRepository.save(ruralProducer1);

    await expect(
      updateRuralProducerService.execute({
        adminId: admin.id,
        ruralProducerId: ruralProducer1.id,
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

  it("should not update a nonexistent rural producer", async () => {
    const admin = adminsRepository.create({
      email: "fake@email.com",
      password: "123",
    });

    await adminsRepository.save(admin);

    await expect(
      updateRuralProducerService.execute({
        adminId: admin.id,
        ruralProducerId: "fake id",
        document: {
          type: "CPF",
          value: "10697061900",
        },
        farm: {
          label: "Updated Fake farm",
          address: {
            city: "Updated Fake City",
            state: "Updated Fake state",
          },
          cultures: [],
          notUsefulArea: 100,
          usefulArea: 100,
          totalArea: 200,
        },
      })
    ).rejects.toEqual(AppError.notAllowed());
  });
});
