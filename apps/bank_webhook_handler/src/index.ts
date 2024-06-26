require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import db from "@repo/db/client";

const PORT = process.env.PORT || 3005;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  const response = await db.onRampTransaction.findUnique({
    where: {
      token: paymentInformation.token,
    },
  });

  if (response?.status === "Success") {
    res.status(200).json({ message: "Already Transfered" });
    return;
  }

  try {
    // transaction
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: parseInt(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(201).json({ message: "Captured" });
  } catch (error) {
    console.error(error);
    return res.status(411).json({ message: "Error while processing webhook" });
  }
});

app.listen(PORT, () => {
  console.warn(`webhook server is running on port: ${PORT}`);
});
