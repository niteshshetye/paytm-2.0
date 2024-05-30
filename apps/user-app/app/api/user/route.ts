import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session && !session?.user) {
    return NextResponse.json(
      {
        message: "You are not logged In...!",
      },
      {
        status: 403,
      }
    );
  }

  return NextResponse.json({
    user: session.user,
  });
};
