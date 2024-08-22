import { getMaterials } from "./../controllers/MaterialController";
import { prisma } from "../prisma/lib";
import {
  STATUS_CODE,
  RESPONSE_MESSAGE,
} from "../utils/constants/ResponseStatus";
import fs from "fs";

const create = async (data: any) => {
  try {
    let materialDetails = JSON.parse(data.materialDetails);
    let materilaInward = await prisma.materialInward.create({
      data: {
        clientId: parseInt(data.clientId),
        quantity: parseInt(data.quantity),
        noOfMaterials: parseInt(data.noOfMaterials),
        dcNumber: parseInt(data.dcNumber),
        dcImage: data.dcImage,
        receivedDate: new Date(data.receivedDate),
        estimatedDispatchDate: new Date(data.estimatedDispatchDate),
        isQtyApproved: parseInt(data.isQtyApproved),
        coatingRequired: data.coatingRequired,
        jobType: data.jobType,
        inspection: data.inspection,
      },
      select: {
        id: true,
      },
    });
    let materialInfoArray: any[] = [];

    materialDetails.map((data: any) => {
      let materialInfo: any = {};
      materialInfo.materialInwardId = materilaInward.id;
      materialInfo.material = data.material;
      materialInfo.thickness = data.thickness;
      materialInfoArray.push(materialInfo);
    });

    await prisma.materialInwardDetails.createMany({
      data: materialInfoArray,
    });

    let response = {
      status: STATUS_CODE.CREATED_CODE,
      message: "Material Inward has been created successfully",
      data: [],
    };
    return response;
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

const get = async (query: any) => {
  try {
    const page = query?.page ? parseInt(query?.page) : 1;
    const limit = query?.limit ? parseInt(query?.limit) : 10;

    const materialInward = await prisma.materialInward.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        materialInwardDetails: true,
        client: true,
      },
    });
    const count: number = await prisma.materialInward.count();
    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Material Inward has been fetched successfully",
      data: { materialInward, count },
    };
    return response;
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

const update = async (data: any) => {
  try {
    let materialDetails = JSON.parse(data.materialDetails);
    data.dcImage = data.dcImage ? data.dcImage : data.oldDCImage;
    let materialInward = await prisma.materialInward.update({
      where: {
        id: parseInt(data.materialInwardId),
      },
      data: {
        clientId: parseInt(data.clientId),
        quantity: parseInt(data.quantity),
        noOfMaterials: parseInt(data.noOfMaterials),
        dcNumber: parseInt(data.dcNumber),
        dcImage: data.dcImage,
        receivedDate: new Date(data.receivedDate),
        estimatedDispatchDate: new Date(data.estimatedDispatchDate),
        isQtyApproved: parseInt(data.isQtyApproved),
        coatingRequired: data.coatingRequired,
        jobType: data.jobType,
        inspection: data.inspection,
      },
      select: {
        id: true,
      },
    });

    await prisma.materialInwardDetails.deleteMany({
      where: {
        materialInwardId: parseInt(data.materialInwardId),
      },
    });

    let materialInfoArray: any[] = [];

    materialDetails.map((data: any) => {
      let materialInfo: any = {};
      materialInfo.materialInwardId = materialInward.id;
      materialInfo.material = data.material;
      materialInfo.thickness = data.thickness;
      materialInfoArray.push(materialInfo);
    });

    await prisma.materialInwardDetails.createMany({
      data: materialInfoArray,
    });

    let response = {
      status: STATUS_CODE.CREATED_CODE,
      message: "Material Inward has been updated successfully",
      data: [],
    };
    return response;
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

const remove = async (data: any) => {
  try {
    let deleteData = await prisma.materialInward.findFirst({
      where: {
        id: parseInt(data.materialInwardId),
      },
    });

    let filePath = __uploadDir + "/inwardMaterials/" + deleteData?.dcImage;

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err.message}`);
        }
      });
    }

    await prisma.materialInwardDetails.deleteMany({
        where: {
           materialInwardId: parseInt(data.materialInwardId),
        },
      });

    await prisma.materialInward.delete({
      where: {
        id: parseInt(data.materialInwardId),
      },
    });
    
    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Material Inward has been Removed successfully",
      data: [],
    };
    return response;
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

export { create, get, update, remove };
