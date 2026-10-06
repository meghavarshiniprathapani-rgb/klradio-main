'use client';

import { AuthProvider, useAuth } from '@/context/auth-context';
import { DashboardHeader } from '@/components/dashboard/header';
import { ReactNode } from 'react';

function DashboardContent({ children }: { children: ReactNode }) {
  const { loading, user } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <video
          src="https://ik.imagekit.io/bhanuteja110/Radio/LOADING.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-sm"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 pt-28 md:gap-8 md:p-8 md:pt-32">
        {children}
      </main>
    </div>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <DashboardContent>{children}</DashboardContent>
  );
}
