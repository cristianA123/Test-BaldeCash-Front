import { roomData } from "@utils/db";
import { AppContext } from "next/app";

export const GET = async (request: Request, { params }: any) => {
  try {

      const { slug } = params;
      const room = roomData.find((room) => room.slug === slug);
      if (!room) {
        const data = {
          message: 'No se encontro la habitacion',
          room: null,
          ok: false,
        }
        return new Response(JSON.stringify(data), { status: 200 })
      }
      const data = {
        room,
        ok: true,
      }
      return new Response(JSON.stringify(data), { status: 200 })

  } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
  }
}