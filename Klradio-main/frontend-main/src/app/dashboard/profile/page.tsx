'use client';

import ReflectiveCard from "@/components/ui/ReflectiveCard";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                My Profile
                </h1>
                <p className="text-muted-foreground">
                Your personal identification card.
                </p>
            </div>

            <div className="flex items-center justify-center pt-8">
                <ReflectiveCard user={user} />
            </div>
        </div>
    );
}
