"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { useMemo, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState(
    SUPPORTED_BANKS[0]?.name || ""
  );

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
  };

  const handleAddMoney = async () => {
    try {
      setLoading(true);
      await createOnRamptxn(selectedBank, amount);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !amount;

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
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleAddMoney}
            disabled={isDisabled}
            loading={loading}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
