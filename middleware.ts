import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // You can add your middleware logic here.
  // For now, it just continues to the next middleware or page.
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
