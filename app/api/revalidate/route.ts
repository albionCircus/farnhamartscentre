// import { NextResponse } from "next/server";
// import { revalidateTag } from "next/cache";

// export async function POST() {
//   revalidateTag("prismic");

//   return NextResponse.json({ revalidated: true, now: Date.now() });
// }

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  try {
    const body = await req.json();

    const uid = body.documents?.[0]?.uid; // Prismic sends the affected docs
    const type = body.documents?.[0]?.type;

    if (!uid || !type) {
      return new Response("Missing UID or type", { status: 400 });
    }

    // You can revalidate based on content type
    if (type === "whats_on_post") {
      // Revalidate the post page
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/whats_on/${uid}/revalidate`, {
        method: "POST",
      });
    }

    // You can also revalidate archive/listing pages
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/whats_on/revalidate`, {
      method: "POST",
    });

    return new Response("Revalidation triggered", { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("Error revalidating", { status: 500 });
  }
}
