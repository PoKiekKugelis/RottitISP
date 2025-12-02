import { CreateUser } from "@/models/user/schemas/user.schema";
import { UserService } from "@/services/user.service"
import { UserRepository } from "@/repositories/user.repository";
import { requireAdmin } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    // const session = await requireAdmin();
    // if (session instanceof Response) return session
    const users = await UserRepository.findAll();
    return Response.json(users, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get users" }, { status: 400 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validationResult = CreateUser.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        { error: "Invalid input", details: validationResult.error.issues },
        { status: 422 }
      );
    }

    const user = await UserService.register(validationResult.data);
    if (user == null) {
      return Response.json({ error: "User with this login name, username or email already exists" }, { status: 409 })
    }
    return Response.json(user, { status: 201 });
  }
  catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
