"use client";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface BlogInputProps {
  onSummarize: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function BlogInput({ onSummarize, isLoading }: BlogInputProps) {
  const [url, setUrl] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="blog-url">Blog URL</Label>
      <div className="flex gap-2">
        <Input
          id="blog-url"
          type="url"
          placeholder="https://example.com/blog/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          onClick={() => onSummarize(url)}
          disabled={isLoading || !url}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Summarize
        </Button>
      </div>
    </div>
  );
}
