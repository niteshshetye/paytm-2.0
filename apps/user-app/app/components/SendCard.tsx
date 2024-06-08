"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendClick = async () => {
    try {
      setLoading(true);
      await p2pTransfer(number, amount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !number || !amount;

  return (
    <div className="h-[90vh]">
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder={"Phone number"}
            label="Phone Number"
            onChange={(value) => {
              setNumber(value);
            }}
            value={number}
          />
          <TextInput
            placeholder={"Amount"}
            label="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
            value={amount}
          />
          <div className="pt-4 flex justify-center">
            <Button
              disabled={isDisabled}
              onClick={handleSendClick}
              loading={loading}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
