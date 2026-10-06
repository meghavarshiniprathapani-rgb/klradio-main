'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Megaphone, Music2, Signal } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const [songSuggestionsCount, setSongSuggestionsCount] = useState<number | null>(null);
  const [announcementsCount, setAnnouncementsCount] = useState<number | null>(null);
  const [liveListenersCount, setLiveListenersCount] = useState<number | null>(0); // Default to 0
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      const suggestionsPromise = api.get('/admin/song-suggestions').then(res => {
        setSongSuggestionsCount(res.data.length);
      }).catch(() => {
        setSongSuggestionsCount(0);
      });

      const announcementsPromise = api.get('/creative/announcements').then(res => {
        setAnnouncementsCount(res.data.length);
      }).catch(() => {
        setAnnouncementsCount(0);
      });

      // The live listener count is not available via a simple API endpoint.
      // It's managed via a WebSocket connection in the Technical wing.
      // For now, we'll display a static value. A backend change is needed for real-time data.
      const listenersPromise = Promise.resolve().then(() => {
          // In a real scenario, this would be an API call e.g., api.get('/technical/listeners')
          // For now, we will use a static value.
          setLiveListenersCount(0);
      });


      await Promise.allSettled([
        suggestionsPromise,
        announcementsPromise,
        listenersPromise,
      ]);
      
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Welcome, {user?.name || 'Member'}
        </h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your station's activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Song Suggestions
            </CardTitle>
            <Music2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{songSuggestionsCount ?? 0}</div>}
            <p className="text-xs text-muted-foreground">
              Total suggestions submitted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Live Listeners
            </CardTitle>
            <Signal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{liveListenersCount ?? 0}</div>}
            <p className="text-xs text-muted-foreground">
              Currently tuned in
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{announcementsCount ?? 0}</div>}
            <p className="text-xs text-muted-foreground">
              Published this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">
                No recent activity to display.
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
