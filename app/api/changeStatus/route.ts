import { getCurrentUser } from "@/lib/auth";
import { UserRepository } from "@/repositories/user.repository";

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get("name");
        //Name not given in params which means the user is logging out
        if (!name) {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                const oldStatus = currentUser.status;
                const data = {
                    status: false
                }
                const updatedUser = await UserRepository.update(currentUser.id, data);
                return Response.json(updatedUser, { status: 200 });
            }
        }
        //Name given which means the user is logging in
        else {
            const user = await UserRepository.findOneByName(name);
            if (!user) {
                return Response.json(
                    { error: `User not found` },
                    { status: 404 }
                );
            }
            const oldStatus = user.status;
            const data = {
                status: true
            }
            const updatedUser = await UserRepository.update(user.id, data);
            return Response.json(updatedUser, { status: 200 });
        }
    }
    catch (error: any) {
        return Response.json({ error: "Failed to update user's status" }, { status: 400 })
    }
}