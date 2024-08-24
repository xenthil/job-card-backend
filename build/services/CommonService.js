"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInchargeDetails = exports.getAllFloorDetails = exports.getAllShiftDetails = exports.removeFloorDetails = exports.updateFloorDetails = exports.getFloorDetails = exports.addFloorDetails = exports.removeShiftDetails = exports.updateShiftDetails = exports.getShiftDetails = exports.addShiftDetails = exports.fetchJobType = void 0;
const lib_1 = require("../prisma/lib");
const ResponseStatus_1 = require("../utils/constants/ResponseStatus");
const fetchJobType = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield lib_1.prisma.jobType.findMany();
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Job type has been fetched successfully",
            data: { job }
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.fetchJobType = fetchJobType;
const addShiftDetails = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield lib_1.prisma.shift.create({
            data: inputs
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Shift has been Added successfully",
            data: []
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.addShiftDetails = addShiftDetails;
const getShiftDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = (query === null || query === void 0 ? void 0 : query.page) ? parseInt(query === null || query === void 0 ? void 0 : query.page) : 1;
        const limit = (query === null || query === void 0 ? void 0 : query.limit) ? parseInt(query === null || query === void 0 ? void 0 : query.limit) : 10;
        const shift = yield lib_1.prisma.shift.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Shift has been fetched successfully",
            data: shift
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.getShiftDetails = getShiftDetails;
const getAllShiftDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shift = yield lib_1.prisma.shift.findMany();
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Shift has been fetched successfully",
            data: shift
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.getAllShiftDetails = getAllShiftDetails;
const updateShiftDetails = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shift = yield lib_1.prisma.shift.update({
            where: {
                id: parseInt(inputs.id)
            },
            data: {
                name: inputs.name
            }
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Shift has been updated successfully",
            data: shift
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.updateShiftDetails = updateShiftDetails;
const removeShiftDetails = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield lib_1.prisma.shift.delete({
            where: {
                id: parseInt(inputs.id)
            }
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Shift has been removed successfully",
            data: []
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.removeShiftDetails = removeShiftDetails;
const addFloorDetails = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield lib_1.prisma.floor.create({
            data: inputs
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Floor has been added successfully",
            data: []
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.addFloorDetails = addFloorDetails;
const getFloorDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = (query === null || query === void 0 ? void 0 : query.page) ? parseInt(query === null || query === void 0 ? void 0 : query.page) : 1;
        const limit = (query === null || query === void 0 ? void 0 : query.limit) ? parseInt(query === null || query === void 0 ? void 0 : query.limit) : 10;
        const floor = yield lib_1.prisma.floor.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Floor has been fetched successfully",
            data: floor
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.getFloorDetails = getFloorDetails;
const getAllFloorDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const floor = yield lib_1.prisma.floor.findMany();
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Floor has been fetched successfully",
            data: floor
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.getAllFloorDetails = getAllFloorDetails;
const updateFloorDetails = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const floor = yield lib_1.prisma.floor.update({
            where: {
                id: parseInt(inputs.id)
            },
            data: {
                name: inputs.name
            }
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Floor has been updated successfully",
            data: floor
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.updateFloorDetails = updateFloorDetails;
const removeFloorDetails = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield lib_1.prisma.floor.delete({
            where: {
                id: parseInt(inputs.id)
            }
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Floor has been removed successfully",
            data: []
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.removeFloorDetails = removeFloorDetails;
const getInchargeDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let shift = (query === null || query === void 0 ? void 0 : query.shift) ? query === null || query === void 0 ? void 0 : query.shift : "";
        let where = {};
        if (shift) {
            where.shiftId = parseInt(shift);
        }
        const incharge = yield lib_1.prisma.user.findMany({
            where: Object.assign({ role: "2" }, where)
        });
        let response = {
            status: ResponseStatus_1.STATUS_CODE.SUCCESS_CODE,
            message: "Floor has been fetched successfully",
            data: incharge
        };
        return response;
    }
    catch (errors) {
        console.log('err', errors);
        let error = {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        };
        return error;
    }
});
exports.getInchargeDetails = getInchargeDetails;
