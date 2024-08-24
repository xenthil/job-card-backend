import { getMaterials } from "./../controllers/MaterialController";
import { prisma } from "../prisma/lib";
import {
  STATUS_CODE,
  RESPONSE_MESSAGE,
} from "../utils/constants/ResponseStatus";
import fs from "fs";
import { notEqual } from "assert";

const create = async (data: any) => {
  try {
    let materialDetails = JSON.parse(data.materialDetails);
    let materialInwardCount = await prisma.materialInward.count();
    materialInwardCount = materialInwardCount + 1;
    let jobId = "JOB000" + materialInwardCount;
    let materilaInward = await prisma.materialInward.create({
      data: {
        clientId: parseInt(data.clientId),
        quantity: parseInt(data.quantity),
        noOfMaterials: parseInt(data.noOfMaterials),
        dcNumber: data.dcNumber,
        dcImage: data.dcImage,
        receivedDate: new Date(data.receivedDate),
        estimatedDispatchDate: new Date(data.estimatedDispatchDate),
        isQtyApproved: parseInt(data.isQtyApproved),
        coatingRequired: data.coatingRequired,
        jobTypeId: parseInt(data.jobType),
        jobStatus: "1",
        jobId: jobId,
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
        dcNumber: data.dcNumber,
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

const getJobsDetails = async (query: any) => {
  try {
    const page = query?.page ? parseInt(query?.page) : 1;
    const limit = query?.limit ? parseInt(query?.limit) : 10;

    const jobs = await prisma.materialInward.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isQtyApproved: 1,
        jobStatus: "1",
      },
      include: {
        materialInwardDetails: true,
        client: true,
        jobType: true,
      },
    });
    const count: number = await prisma.materialInward.count({
      where: {
        isQtyApproved: 1,
        jobStatus: "1",
      },
    });
    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Jobs has been fetched successfully",
      data: { jobs, count },
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

const assignJobDetails = async (data: any) => {
  try {
    let materialInward = await prisma.materialInward.findFirst({
      where: {
        id: data.materialInwardId,
      },
    });

    let totalQty = materialInward?.quantity || 0;

    let materialProduction = await prisma.materialProduction.findMany({
      where: {
        materialInwardId: data.materialInwardId,
      },
    });

    let productionQty: number = 0;

    materialProduction?.forEach((production: any) => {
      productionQty += production?.receivedQty;
    });
    let remainQty = totalQty - productionQty;
    productionQty = productionQty + data.receivedQty;

    if (totalQty >= productionQty) {
      await prisma.materialProduction.create({
        data: {
          ...data,
          receivedQty: parseInt(data.receivedQty),
          shiftIncharge: parseInt(data.shiftIncharge),
          status : 1
        },
        select: {
          id: true,
        },
      });

      if (productionQty == totalQty) {
        await prisma.materialInward.update({
          where: {
            id: data.materialInwardId,
          },
          data: {
            jobStatus: "2",
          },
        });
      }

      let response = {
        status: STATUS_CODE.CREATED_CODE,
        message: "Job has been assigned successfully",
        data: [],
      };
      return response;
    } else {
      let response = {
        status: STATUS_CODE.BAD_REQUEST_CODE,
        message: RESPONSE_MESSAGE.VALIDATION_ERROR,
        data: [`Remain Quantuty is - ${remainQty}`],
      };
      return response;
    }
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

const getProductionDetails = async (query: any) => {
  try {
    const page = query?.page ? parseInt(query?.page) : 1;
    const limit = query?.limit ? parseInt(query?.limit) : 10;
    const productionDate = query?.productionDate;
    const shift = query?.shift;
    const floor = query?.floor;
    const incharge = query?.incharge ? parseInt(query?.incharge) : 0;

    let where: any = {};

    if (productionDate) {
      where.date = productionDate;
    }

    if (shift) {
      where.assignedShift = shift;
    }

    if (floor) {
      where.assignedFloor = floor;
    }

    if (incharge) {
      where.shiftIncharge = incharge;
    }

    const production = await prisma.materialProduction.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        status: {not : 2},
        ...where,
        // materialInward: {
        //   jobStatus: "1"
        // }
      },
      include: {
        materialInward: {
          include: {
            client: true,
            jobType: true,
          },
        },
      },
    });

    const count: number = await prisma.materialProduction.count({
      where: {
        status: {not : 2},
        ...where,
        // materialInward: {
        //   jobStatus: "1"
        // }
      },
    });
    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Production has been fetched successfully",
      data: { production, count },
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

const assignFilingDetails = async (data: any) => {
  try {

    let materialInward = await prisma.materialInward.findFirst({
      where: {
        id: data.materialInwardId,
      },
    });

    let totalQty = materialInward?.quantity || 0;

    let materialProduction = await prisma.materialProduction.findMany({
      where: {
        materialInwardId: data.materialInwardId,
      },
    });

    let productionQty: number = 0;

    materialProduction?.forEach((production: any) => {
      productionQty += production?.completedQty;
    });
    
    
    productionQty = productionQty + data.completedQty;

    let materialProd = await prisma.materialProduction.findFirst({
      where: {
        id: data.materialProductionId,
      },
    });

    let recQty = materialProd?.receivedQty || 0
    
    if (recQty >= data?.completedQty) {
      let productionStatus:Boolean = false
      let where:any = {}
      if(recQty == data.completedQty){
        productionStatus = true
        where.status = 2
      }
      await prisma.materialProduction.update({
        where : {
          id :  parseInt(data.materialProductionId)
        },
        data: {
          completedQty: parseInt(data.completedQty),
          remarks: data.remarks,
          achivedCoating: data.achivedCoating,
          zincStartingLevel: data.zincStartingLevel,
          zincEndingLevel: data.zincEndingLevel,
          ...where
        },
        select: {
          id: true,
        },
      });

      await prisma.materialFiling.create({
        data: {
          materialInwardId : parseInt(data.materialInwardId),
          receivedQty: parseInt(data.completedQty),
          date: data.date,
          assignedFloor: data.assignedFloor,
          assignedShift: data.assignedShift,
          shiftIncharge: parseInt(data.shiftIncharge),
          status : 1
        },
        select: {
          id: true,
        },
      });

      if(recQty == data.completedQty ){
        await prisma.materialProduction.update({
          where: {
            id: data.materialProductionId,
          },
          data : {
            status : 2
          }
        });
      }
      

      if (productionQty == totalQty) {
        await prisma.materialInward.update({
          where: {
            id: data.materialInwardId,
          },
          data: {
            jobStatus: "2",
          },
        });
      }

      let response = {
        status: STATUS_CODE.CREATED_CODE,
        message: "Job has been assigned successfully",
        data: [],
      };
      return response;
    } else {
      let response = {
        status: STATUS_CODE.BAD_REQUEST_CODE,
        message: RESPONSE_MESSAGE.VALIDATION_ERROR,
        data: [`Completed Qty is more than received qty`],
      };
      return response;
    }
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

const forwardJobDetails = async (data: any) => {
  try {
      await prisma.materialProduction.update({
        where : {
          id :  parseInt(data.materialProductionId)
        },
        data: {
          status : 2
        }
      });

      await prisma.materialProduction.create({
        data: {
          materialInwardId : parseInt(data.materialInwardId),
          receivedQty: parseInt(data.receivedQty),
          date: data.date,
          assignedFloor: data.assignedFloor,
          assignedShift: data.assignedShift,
          shiftIncharge:parseInt(data.shiftIncharge),
          status : 1
        },
        select: {
          id: true,
        },
      });

      let response = {
        status: STATUS_CODE.CREATED_CODE,
        message: "Job has been Forwarded successfully",
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


const getFilingDetails = async (query: any) => {
  try {
    const page = query?.page ? parseInt(query?.page) : 1;
    const limit = query?.limit ? parseInt(query?.limit) : 10;
    const productionDate = query?.productionDate;
    const shift = query?.shift;
    const floor = query?.floor;
    const incharge = query?.incharge ? parseInt(query?.incharge) : 0;

    let where: any = {};

    if (productionDate) {
      where.date = productionDate;
    }

    if (shift) {
      where.assignedShift = shift;
    }

    if (floor) {
      where.assignedFloor = floor;
    }

    if (incharge) {
      where.shiftIncharge = incharge;
    }

    const filing = await prisma.materialFiling.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        status: {not : 2},
        ...where,
        // materialInward: {
        //   jobStatus: "2"
        // }
      },
      include: {
        materialInward: {
          include: {
            client: true,
            jobType: true,
          },
        },
      },
    });

    const count: number = await prisma.materialFiling.count({
      where: {
        status: {not : 2},
        ...where,
        // materialInward: {
        //   jobStatus: "1"
        // }
      },
    });
    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Filing has been fetched successfully",
      data: { filing, count },
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

const toDispatchDetails = async (data: any) => {
  try {

    let materialInward = await prisma.materialInward.findFirst({
      where: {
        id: data.materialInwardId,
      },
    });

    let totalQty = materialInward?.quantity || 0;

    let materialFiling = await prisma.materialFiling.findMany({
      where: {
        materialInwardId: data.materialInwardId,
      },
    });

    let filingQty: number = 0;

    materialFiling?.forEach((production: any) => {
      filingQty += production?.completedQty;
    });
    
    
    filingQty = filingQty + data.completedQty;

    let materialFil = await prisma.materialFiling.findFirst({
      where: {
        id: data.materialFilingId,
      },
    });

    let recQty = materialFil?.receivedQty || 0
    
    if (recQty >= data?.completedQty) {
      let productionStatus:Boolean = false
      let where:any = {}
      if(recQty == data.completedQty){
        productionStatus = true
        where.status = 2
      }
      await prisma.materialFiling.update({
        where : {
          id :  parseInt(data.materialFilingId)
        },
        data: {
          completedQty: parseInt(data.completedQty),
          remarks: data.remarks,
          ...where
        },
        select: {
          id: true,
        },
      });

  
      if (filingQty == totalQty) {
        await prisma.materialInward.update({
          where: {
            id: data.materialInwardId,
          },
          data: {
            jobStatus: "3",
          },
        });
      }

      let response = {
        status: STATUS_CODE.CREATED_CODE,
        message: "Job has been assigned successfully",
        data: [],
      };
      return response;
    } else {
      let response = {
        status: STATUS_CODE.BAD_REQUEST_CODE,
        message: RESPONSE_MESSAGE.VALIDATION_ERROR,
        data: [`Completed Qty is more than received qty`],
      };
      return response;
    }
  } catch (errors) {
    console.log("err", errors);
    let error = {
      status: STATUS_CODE.SERVER_ERROR_CODE,
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
    };
    return error;
  }
};

const forwardFilingDetails = async (data: any) => {
  try {
      await prisma.materialFiling.update({
        where : {
          id :  parseInt(data.materialFilingId)
        },
        data: {
          status : 2
        }
      });

      await prisma.materialFiling.create({
        data: {
          materialInwardId : parseInt(data.materialInwardId),
          receivedQty: parseInt(data.receivedQty),
          date: data.date,
          assignedFloor: data.assignedFloor,
          assignedShift: data.assignedShift,
          shiftIncharge:parseInt(data.shiftIncharge),
          status : 1
        },
        select: {
          id: true,
        },
      });

      let response = {
        status: STATUS_CODE.CREATED_CODE,
        message: "Filing has been Forwarded successfully",
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

const getDispatchDetails = async (query: any) => {
  try {
    const page = query?.page ? parseInt(query?.page) : 1;
    const limit = query?.limit ? parseInt(query?.limit) : 10;

    const dispatch = await prisma.materialInward.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isQtyApproved: 1,
        jobStatus: "3",
      },
      include: {
        materialInwardDetails: true,
        client: true,
        jobType: true,
      },
    });
    const count: number = await prisma.materialInward.count({
      where: {
        isQtyApproved: 1,
        jobStatus: "1",
      },
    });
    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Jobs has been fetched successfully",
      data: { dispatch, count },
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

const getDashboardDetails = async (query: any) => {
  try {
    
    const jobCount: number = await prisma.materialInward.count({
      where: {
        isQtyApproved: 1,
      },
    });

    const pendingJobCount: number = await prisma.materialInward.count({
      where: {
        isQtyApproved: 1,
        jobStatus: {
          in : ["1","2"]
        },
      },
    });

    const totals = await prisma.materialInward.aggregate({
      _sum: {
        quantity: true,
        noOfMaterials: true, 
      },
      where: {
        isQtyApproved: 1, 
        jobStatus: {
          in : ["1","2"]
        },
      },
    });
    
    const totalQuantity = totals._sum.quantity;
    const noOfMaterials = totals._sum.noOfMaterials;
    

    const clientCount: number = await prisma.client.count();

    let response = {
      status: STATUS_CODE.SUCCESS_CODE,
      message: "Dashboard details has been fetched successfully",
      data: { jobCount , pendingJobCount , clientCount, totalQuantity, noOfMaterials },
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





export {
  create,
  get,
  update,
  remove,
  getJobsDetails,
  assignJobDetails,
  getProductionDetails,
  assignFilingDetails,
  forwardJobDetails,
  getFilingDetails,
  toDispatchDetails,
  forwardFilingDetails,
  getDispatchDetails,
  getDashboardDetails
};
