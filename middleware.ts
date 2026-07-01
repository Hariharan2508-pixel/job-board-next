import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("middleware running");
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
   matcher: ["/saved/:path*", "/apply/:path*"],
}
// import { withAuth } from "next-auth/middleware";
 
// export default withAuth({
//   pages: { signIn: "/login", },
// });
 
// export const config = {
//   matcher: ["/saved/:path*", "/apply/:path*"],
// };