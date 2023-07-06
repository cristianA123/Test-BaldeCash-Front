import { roomData } from "@utils/db";


export const GET = async (request: Request) => {
  try {
    const data = {
      rooms: roomData,
      ok: true,
    }
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}