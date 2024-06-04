"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { createOnRamptxn } from "../lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(
    SUPPORTED_BANKS[0]?.name || ""
  );

  // const [redirectUrl, setRedirectUrl] = useState(
  //   SUPPORTED_BANKS[0]?.redirectUrl
  // );

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
  };

  const handleAddMoney = async () => {
    await createOnRamptxn(selectedBank, amount);
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          value={amount}
          onChange={handleAmountChange}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setSelectedBank(value);
            // setRedirectUrl(
            //   SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            // );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              handleAddMoney();
              // window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
