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
  getAllRole,
  addRole,
  getRole,
  updateRole,
  addUser,
  getUser,
  updateUser,
  removeUser,
  getAllUnit,
  getAllMaterial,
  addJobTypeMaterial,
  updateJobTypeMaterial,
  getJobTypeMaterial,
  addInventory,
  updateInventory,
  getInventory,
  getJobTypeMaterialList,
  getJobTypeMaterialDataList
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
route.get("/getAllUnit", getAllUnit);
route.post("/role/add", addRole);
route.get("/role/get", getRole);
route.put("/role/update", updateRole);
route.get("/getAllRole", getAllRole);
route.post("/user/add", addUser);
route.get("/user/get", getUser);
route.put("/user/update", updateUser);
route.post("/user/remove", removeUser);
route.get("/getAllMaterial", getAllMaterial);
route.post("/addJobTypeMaterial", addJobTypeMaterial);
route.put("/updateJobTypeMaterial", updateJobTypeMaterial);
route.get("/getJobTypeMaterial", getJobTypeMaterial);
route.post("/addInventory", addInventory);
route.put("/updateInventory", updateInventory);
route.get("/getInventory", getInventory);
route.get("/getJobTypeMaterialList", getJobTypeMaterialList);
route.get("/getJobTypeMaterialDataList", getJobTypeMaterialDataList);


export default route;
