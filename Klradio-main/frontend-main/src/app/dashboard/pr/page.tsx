import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PRPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          PR Wing
        </h1>
        <p className="text-muted-foreground">
          Manage press releases, social media campaigns, and public relations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PR Dashboard</CardTitle>
          <CardDescription>Showcasing our public relations efforts.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-lg">
            <Image 
              src="https://cbx-prod.b-cdn.net/COLOURBOX42971742.jpg?width=800&height=800&quality=70" 
              alt="PR Wing" 
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
