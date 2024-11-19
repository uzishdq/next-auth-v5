import prisma from "@/lib/prisma";

export const GetUserbyEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    return null;
  }
};

export const GetUserbyId = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch (error) {
    return null;
  }
};
