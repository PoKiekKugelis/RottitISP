import { requireAuth } from "@/lib/auth";
import { UserService } from "@/services/user.service";


export async function POST(req: Request) {
  try {
    const session = await requireAuth()
    if (session instanceof Response) return session
    const body = await req.json();
    const target = await UserService.getCountryCode(parseInt(session.user.id))

    const response = await fetch("http://129.151.213.227:5000/translate", {
      method: "POST",
      body: JSON.stringify({
        q: body.text,
        source: "auto",
        target: target,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    })

    const result = await response.json();
    if (!result.translatedText)
      return Response.json({ error: "Language not supported" }, { status: 200 });
    return Response.json(result, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to translate" }, { status: 400 })
  }
}


