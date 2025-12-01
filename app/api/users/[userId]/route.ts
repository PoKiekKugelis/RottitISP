import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "@/services/user.service";
import { UpdateUser } from "@/models/user/schemas/user.schema";

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const id = parseInt(userId);
    const user = await UserRepository.findOne(id);
    return Response.json(user, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get user" }, { status: 400 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const id = parseInt(userId);

    if (isNaN(id)) {
      return Response.json({ error: "Invalid user ID" }, { status: 400 })
    }
    const user = UserRepository.findOne(id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    const body = await req.json();
    const validationResult = UpdateUser.safeParse(body);
    if (!validationResult.success) {
      return Response.json(
        { error: "Invalid input", details: validationResult.error.issues }, { status: 422 }
      );
    }
    const updatedUser = UserRepository.update(id, validationResult.data);
    return Response.json(updatedUser, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: "Failed to update user" }, { status: 400 })
  }
}
export async function DELETE(
  request: Response,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const id = parseInt(userId);

    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid community ID" }, { status: 400 });
    }

    const user = UserRepository.findOne(id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }
    UserRepository.delete(id);

    return Response.json({ message: "Community deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete community", details: (error as { meta?: unknown })?.meta },
      { status: 400 }
    );
  }
}
