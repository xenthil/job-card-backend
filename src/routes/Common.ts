import { Router } from "express";
import {
  getJobType,
  addShift,
  getShift,
  updateShift,
  removeShift,
  addFloor,
  getFloor,
  updateFloor,
  removeFloor,
  getIncharge,
  getAllFloor,
  getAllShift,
} from "../controllers/CommonController";

const route = Router();

route.get("/get-job-type", getJobType);
route.post("/shift/add", addShift);
route.get("/shift/get", getShift);
route.put("/shift/update", updateShift);
route.post("/shift/remove", removeShift);
route.post("/floor/add", addFloor);
route.get("/floor/get", getFloor);
route.put("/floor/update", updateFloor);
route.post("/floor/remove", removeFloor);
route.get("/getIncharge", getIncharge);
route.get("/getAllFloor", getAllFloor);
route.get("/getAllShift", getAllShift);

export default route;
