import { Card } from "@repo/ui/card";
import React from "react";

interface ITransactions {
  id: string;
  amount: number;
  time: Date;
  fromUserId: string;
  toUserId: string;
}

interface P2pTransactionProps {
  transactions: ITransactions[];
}

export const P2pTransaction = ({ transactions }: P2pTransactionProps) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between" key={t.id}>
            <div>
              <div className="text-sm">Debited INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
