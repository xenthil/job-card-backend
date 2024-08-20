import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Service for creating a new JoType
export const createJoType = async (inputs: any) => {
  return await prisma.joType.create({
    data: inputs,
  });
};

// Service for fetching JoTypes
export const fetchJoTypes = async (query: any) => {
  return await prisma.joType.findMany({
    where: query,
  });
};

// Service for updating a JoType
export const updateJoType = async (id: number, updates: any) => {
  return await prisma.joType.update({
    where: { id },
    data: updates,
  });
};

// Service for removing a JoType
export const removeJoType = async (id: number) => {
  return await prisma.joType.delete({
    where: { id },
  });
};
