"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const p2pTransfer = async (phone: string, amount: string) => {
  const transferAmount = parseInt(amount) * 100;

  try {
    const session = await getServerSession(authOptions);

    //   check user is logged in or not
    if (!session && !session.user && !session.user.id) {
      throw new Error("User not logged In");
    }

    // check is phone number user is present or not
    const fromUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!fromUser) {
      throw new Error("User not found");
    }

    // check is phone number user is present or not
    const toUser = await prisma.user.findUnique({
      where: {
        number: phone,
      },
    });

    if (!toUser) {
      throw new Error("User not found");
    }

    await prisma.$transaction(async (txn) => {
      // check user who transfering the money have the sufficient balance or not
      await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" =${session.user.id} FOR UPDATE`;

      const fromUser = await txn.balance.findUnique({
        where: {
          userId: session.user.id,
        },
      });

      if (!fromUser?.amount || fromUser.amount < transferAmount) {
        console.log("insufficiant balance");
        throw new Error(
          `User doesn't have enough to send amount: ${transferAmount}`
        );
      }

      await txn.balance.update({
        where: {
          userId: fromUser.userId,
        },
        data: {
          amount: {
            decrement: transferAmount,
          },
        },
      });
      await txn.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: transferAmount,
          },
        },
      });
      await txn.p2pTransfer.create({
        data: {
          amount: transferAmount,
          timestamp: new Date(),
          toUserId: toUser.id,
          fromUserId: fromUser.userId,
        },
      });
    });

    return {
      statusCode: 200,
      message: "Money transfered",
    };
  } catch (error: any) {
    return {
      statusCode: 404,
      message: error?.message || "Something went wrong",
    };
  }
};
