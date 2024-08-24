import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Service for creating a new JoType
export const createJobType = async (inputs: any) => {
  return await prisma.jobType.create({
    data: inputs,
  });
};

// Service for fetching JoTypes
export const fetchJobTypes = async (query: any) => {
  return await prisma.jobType.findMany({
    where: query,
  });
};

// Service for updating a JoType
export const updateJobType = async (id: number, updates: any) => {
  return await prisma.jobType.update({
    where: { id },
    data: updates,
  });
};

// Service for removing a JoType
export const removeJobType = async (id: number) => {
  return await prisma.jobType.delete({
    where: { id },
  });
};
