import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: "9145109481" },
    update: {},
    create: {
      number: "9145109481",
      password: await bcrypt.hash("india@123", 10),
      name: "Nitesh Shetye",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  });

  console.log({ alice });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((error) => console.log(error));
