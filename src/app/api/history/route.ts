"use Client"
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// interface QueryParams {
//   userId: string;
//   limit?: number;
//   offset?: number;
// }

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  
  // API key validation
  if (process.env.NODE_ENV === 'production' && apiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    if (!userId) {
      return NextResponse.json(
        { error: "userId parameter is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("summaries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const { count } = await supabase
      .from("summaries")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    return NextResponse.json({
      data: data || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      },
      success: true
    });

  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

