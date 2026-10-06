
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function UploadsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Uploads
        </h1>
        <p className="text-muted-foreground">
          Upload and manage assets for PR, Design, and Video wings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Uploader</CardTitle>
          <CardDescription>Drag and drop files here or click to browse.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG, MP4 (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
              </label>
          </div> 
        </CardContent>
      </Card>
    </div>
  );
}
