import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Skip authentication if running in development mode
    if (process.env.NODE_ENV === "development") {
        return NextResponse.next();
    }
}
