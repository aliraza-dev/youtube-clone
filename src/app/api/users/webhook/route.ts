import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error("Error: please add correct clerk signing secret");
    }

    const data = await req.json();

    // we will manually add it since we cant setup
    await db.insert(users).values(data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.log("Error verifying :", err);
    return new Response("Error verifying", { status: 400 });
  }
}
