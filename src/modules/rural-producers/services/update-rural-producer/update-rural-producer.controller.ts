import { celebrate, Joi } from "celebrate";
import { RequestHandler } from "express";
import { container } from "tsyringe";
import { UpdateRuralProducerService } from "./update-rural-producer.service";

export class UpdateRuralProducerController {
  static validate = celebrate({
    body: {
      document: Joi.object({
        type: Joi.string().valid("CPF", "CNPJ"),
        value: Joi.string()
          .when("type", {
            is: "CPF",
            then: Joi.string()
              .length(11)
              .regex(/^[0-9]+$/)
              .required(),
          })
          .concat(
            Joi.string().when("type", {
              is: "CNPJ",

              then: Joi.string()
                .length(14)
                .regex(/^[0-9]+$/)
                .required(),
            })
          ),
      }),
      farm: Joi.object({
        label: Joi.string(),
        totalArea: Joi.number(),
        usefulArea: Joi.number(),
        notUsefulArea: Joi.number(),
        address: Joi.object({
          city: Joi.string(),
          state: Joi.string(),
        }).required(),
        cultures: Joi.array().items(Joi.string().uuid()),
      }).required(),
    },
  });

  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;
    const { document, farm } = req.body;
    const { ruralProducerId } = req.params;

    const updateRuralProducerService = container.resolve(
      UpdateRuralProducerService
    );

    const ruralProducer = await updateRuralProducerService.execute({
      adminId: userId,
      ruralProducerId,
      document,
      farm,
    });

    return res.json(ruralProducer);
  };
}
