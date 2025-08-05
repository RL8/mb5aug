import { NextRequest, NextResponse } from "next/server";

// The URL of your Agno backend using custom FastAPI endpoint
const AGNO_BACKEND_URL = "http://127.0.0.1:8000/agno/chat";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log('=== CopilotKit API route called ===');
    
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    // Extract the last message content for the custom agent
    const lastMessage = body.messages?.[body.messages?.length - 1]?.content || "Hello";
    
    console.log("Forwarding request to backend:", JSON.stringify({ message: lastMessage }, null, 2));

    // Forward the request to the custom FastAPI agent
    const response = await fetch(AGNO_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: lastMessage }),
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    // Get the response from the custom agent
    const data = await response.json();
    console.log("Backend response data:", data);

    // Return the response in a format that CopilotKit can handle
    const result = {
      choices: [
        {
          message: {
            role: "assistant",
            content: data.response
          },
          finish_reason: "stop"
        }
      ]
    };

    return NextResponse.json(result, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });

  } catch (error) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
} 