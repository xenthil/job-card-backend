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
exports.removeJobType = exports.updateJobType = exports.fetchJobTypes = exports.createJobType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Service for creating a new JoType
const createJobType = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.jobType.create({
        data: inputs,
    });
});
exports.createJobType = createJobType;
// Service for fetching JoTypes
const fetchJobTypes = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.jobType.findMany({
        where: query,
    });
});
exports.fetchJobTypes = fetchJobTypes;
// Service for updating a JoType
const updateJobType = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.jobType.update({
        where: { id },
        data: updates,
    });
});
exports.updateJobType = updateJobType;
// Service for removing a JoType
const removeJobType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.jobType.delete({
        where: { id },
    });
});
exports.removeJobType = removeJobType;
