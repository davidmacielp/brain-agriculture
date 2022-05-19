import { RequestHandler } from "express";
import { container } from "tsyringe";
import { DashboardService } from "./dashboad.service";

export class DashboardController {
  static handle: RequestHandler = async (req, res) => {
    const { userId } = req;

    const dashboardService = container.resolve(DashboardService);

    const dashboardInfo = await dashboardService.execute({
      adminId: userId,
    });

    return res.json(dashboardInfo);
  };
}
