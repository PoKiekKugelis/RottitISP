"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AvatarImg from "@/components/Avatar";
import { User } from "@/models/user/entities/user.entity"
import { useRouter } from "next/navigation";

interface EditProfileProps {
    user: User;
}

export default function EditProfileForm({
    user
}: EditProfileProps) {
    const router = useRouter();
    const currentUsername = user.username;
    const [avatar, setAvatar] = useState<File | null>(null);
    const [loginName, setLoginName] = useState(user.loginName);
    const [username, setUsername] = useState(user.username);
    const [country, setCountry] = useState(user.country);
    const [birthDate, setBirthDate] = useState(user.birthdate.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" }));
    const [bio, setBio] = useState(user.bio);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const imageSrc = user.avatar;
    const imageAlt = "@shadcn";
    const imageFallBack = "CN";

    async function uploadFile(
        file: File,
        userId: number
    ): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", String(userId));
        formData.append("type", "avatar");

        const response = await fetch("/api/uploadAvatar", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json()
            setError(error.error);
            return "";
        }

        const { url } = await response.json();
        return url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const data = {
                loginName,
                username,
                avatar: "",
                country,
                birthdate: new Date(new Date(birthDate).toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })).toISOString(),
                bio
            }
            const response = await fetch(`/api/users/${user.id}?userId=${user.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            const result = await response.json()
            console.log(result)

            if (!response.ok) {
                console.log(response);
                setError(result.error);
                return;
            }

            //Uploads avatar if a file has been chosen
            let avatarUrl = "";

            if (avatar) {
                avatarUrl = await uploadFile(avatar, user.id);
            }
            if (avatarUrl) {
                const data = {
                    loginName,
                    username,
                    avatar: avatarUrl || result.avatar,
                    country,
                    birthdate: new Date(new Date(birthDate).toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })).toISOString(),
                    bio
                }
                const updateResponse = await fetch(`/api/users/${user.id}?userId=${user.id}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                });
                if (!updateResponse.ok) {
                    const result = await updateResponse.json()
                    setError(result.error);
                    return;
                }
            }
            else if (avatar && !avatarUrl) {
                return;
            }
            router.push(`/profiles/${user.id}`);

        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

        router.push(`/profiles/${user.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary">
                        Edit Profile
                    </h1>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
                            <CardTitle className="text-2xl">{currentUsername}</CardTitle>
                            <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-9"} />
                        </div>
                    </CardHeader>
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <CardContent>
                        <div className="text-left text-lg">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar</Label>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        className="cursor-pointer"
                                        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="loginName">Login name</Label>
                                    <Input
                                        id="loginName"
                                        type="text"
                                        placeholder="Please write your login name"
                                        value={loginName}
                                        onChange={(e) => setLoginName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Please write your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                    </div>
                                    <Input
                                        id="country"
                                        type="text"
                                        placeholder="What country are you from?"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="birthDate">Date of Birth</Label>
                                    </div>
                                    <Input
                                        id="birthDate"
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="bio">Description</Label>
                                    </div>
                                    <Textarea
                                        id="bio"
                                        placeholder="Write a description about yourself"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    {isLoading ? "Loading..." : "Save"}
                                </Button>
                            </form>
                            <br></br>
                            <div className="flex gap-2">
                                <Link href={`/profiles/${user.id}/changePassword`}><Button>Change password</Button></Link>
                                <Link href={`/profiles/${user.id}`}><Button>Cancel</Button></Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}