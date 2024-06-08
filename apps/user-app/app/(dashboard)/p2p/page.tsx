import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { SendCard } from "../../components/SendCard";
import { P2pTransaction } from "../../components/p2pTransaction";
import { authOptions } from "../../lib/auth";

async function getP2pTransaction() {
  const session = await getServerSession(authOptions);

  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: session?.user?.id,
    },
  });

  return txns.map((t) => ({
    id: t.id,
    time: t.timestamp,
    amount: t.amount,
    fromUserId: t.fromUserId,
    toUserId: t.toUserId,
  }));
}

const page = async () => {
  const transactions = await getP2pTransaction();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        p2p Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <div>
            <P2pTransaction transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
