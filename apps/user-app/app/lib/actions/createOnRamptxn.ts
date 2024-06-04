"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

const DECIMAL = 100;

export const createOnRamptxn = async (provider: string, amount: string) => {
  const session = await getServerSession(authOptions);

  console.log({ session });

  if (!session && !session.user && !session.user?.id) {
    console.log("User not logged In");
    return {
      statusCode: 403,
      message: "User not logged In",
    };
  }

  //   idle come from provider which choose but as we dont have that we are creating on the go
  const token = Math.random().toString();

  await prisma.onRampTransaction.create({
    data: {
      userId: session.user.id,
      status: "Processing",
      token,
      provider,
      amount: parseInt(amount) * DECIMAL,
      startTime: new Date(),
    },
  });

  return { statusCode: 201, message: "Done" };
};
