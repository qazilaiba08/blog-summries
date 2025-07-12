"use client";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import  {translations}  from "@/lib/translations";
import { useState } from "react";

export function SummaryDisplay({
  originalText,
  summaryText,
}: {
  originalText: string;
  summaryText: string;
  translatedSummaryText: string;
}) {
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [isSaving, setIsSaving] = useState(false);

  const translatedSummary = language === "ur" 
    ? translations
    : summaryText;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to Supabase and MongoDB
      setIsSaving(false);
    } catch (error) {
      console.error("Failed to save:", error);
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <h3 className="font-medium mb-2">Original Content</h3>
        <Textarea
          value={originalText}
          readOnly
          className="h-64"
        />
        <p className="text-sm text-muted-foreground mt-1">
          {originalText.length} characters
        </p>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Summary</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={language === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("en")}
            >
              English
            </Button>
            <Button
              variant={language === "ur" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("ur")}
            >
              اردو
            </Button>
          </div>
        </div>
        <Textarea
        

          readOnly
          className="h-64"
        />
        <p className="text-sm text-muted-foreground mt-1">
          {translatedSummary.length} characters
        </p>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">
            Copy Summary
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            Save to History
          </Button>
        </div>
      </div>
    </div>
  );
}