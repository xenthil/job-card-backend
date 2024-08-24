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
exports.getAllShift = exports.getAllFloor = exports.getIncharge = exports.removeFloor = exports.updateFloor = exports.getFloor = exports.addFloor = exports.removeShift = exports.updateShift = exports.getShift = exports.addShift = exports.getJobType = void 0;
const handleResponse_1 = require("../utils/handleResponse");
const ResponseStatus_1 = require("../utils/constants/ResponseStatus");
const CommonService_1 = require("../services/CommonService");
const getJobType = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, CommonService_1.fetchJobType)();
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.getJobType = getJobType;
const addShift = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.body;
        let data = yield (0, CommonService_1.addShiftDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.addShift = addShift;
const getShift = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.query;
        let data = yield (0, CommonService_1.getShiftDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.getShift = getShift;
const updateShift = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.body;
        let data = yield (0, CommonService_1.updateShiftDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.updateShift = updateShift;
const removeShift = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.body;
        let data = yield (0, CommonService_1.removeShiftDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.removeShift = removeShift;
const addFloor = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.body;
        let data = yield (0, CommonService_1.addFloorDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.addFloor = addFloor;
const getFloor = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.query;
        let data = yield (0, CommonService_1.getFloorDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.getFloor = getFloor;
const updateFloor = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.body;
        let data = yield (0, CommonService_1.updateFloorDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.updateFloor = updateFloor;
const removeFloor = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.body;
        let data = yield (0, CommonService_1.removeFloorDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.removeFloor = removeFloor;
const getIncharge = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inputs = request.query;
        let data = yield (0, CommonService_1.getInchargeDetails)(inputs);
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.getIncharge = getIncharge;
const getAllFloor = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, CommonService_1.getAllFloorDetails)();
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.getAllFloor = getAllFloor;
const getAllShift = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, CommonService_1.getAllShiftDetails)();
        return (0, handleResponse_1.sendResponse)(request, response, data);
    }
    catch (e) {
        return (0, handleResponse_1.sendResponse)(request, response, {
            status: ResponseStatus_1.STATUS_CODE.SERVER_ERROR_CODE,
            message: ResponseStatus_1.RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
});
exports.getAllShift = getAllShift;
