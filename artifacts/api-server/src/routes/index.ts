import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadRouter from "./lead";
import bonusRouter from "./bonus";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadRouter);
router.use(bonusRouter);

export default router;
