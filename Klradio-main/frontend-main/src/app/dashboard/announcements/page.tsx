import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Announcements
        </h1>
        <p className="text-muted-foreground">
          Create, manage, and publish station announcements.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Smart Announcement Generator</CardTitle>
          <CardDescription>
            This section is under construction. The AI generator will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center p-8">
            The announcement generator is being worked on. Please use the Creative Wing to manage announcements for now.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
