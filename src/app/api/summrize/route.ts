import { NextResponse } from "next/server";
import { saveFullText } from "@/lib/mongodb";

interface RequestBody {
  url: string;
  userId?: string;
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (process.env.NODE_ENV === "production" && apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: RequestBody = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 });
    }

    const text = `This is mock content for URL: ${url}. In a real implementation, 
    you would use a scraping service or API to fetch the actual blog content. 
    The fetched content would then be processed for summarization.`;

    // ✅ Properly save to MongoDB
    await saveFullText({ url, text });

    return NextResponse.json({
      originalText: text,
      success: true,
    });
  } catch (error) {
    console.error("Summarization error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
