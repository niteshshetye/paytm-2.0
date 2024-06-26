import { Card } from "@repo/ui/card";

const STATUS: Record<string, string> = {
  Success: "Creadited",
  Failure: "Failed",
  Processing: "Processing",
};

const STATUS_COLOR: Record<string, string> = {
  Success: "text-green-600",
  Failure: "text-red-600",
  Processing: "text-orange-600",
};

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    id: string;
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
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
          <div
            className="flex justify-between p-2 border-2 my-1 border-stone-800"
            key={t.id}
          >
            <div>
              <div className="text-sm">{`${STATUS[t.status]} INR`}</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div
              className={`flex flex-col justify-center ${STATUS_COLOR[t.status]}`}
            >
              Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
