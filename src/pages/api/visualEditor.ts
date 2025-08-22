import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  if (
    context.url.searchParams.has("visual-editing", "true") &&
    context.url.searchParams.has("token", process.env.PUBLIC_VE_TOKEN)
  ) {
    await context.session?.set("editing", true);
    console.log(await context.session?.get("editing"));
    return context.redirect("/", 307);
  } else {
    return new Response(null, {
      status: 403,
      statusText: "Sorry you can't access the visual editor",
    });
  }
}
