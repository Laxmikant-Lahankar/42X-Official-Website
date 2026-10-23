export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const data = await res.json();

  const status = data.error ? "error" : "success";
  const payload = data.error
    ? data
    : { token: data.access_token, provider: "github" };
  const msg = `authorization:github:${status}:${JSON.stringify(payload)}`;

  const page = `<script>
    (function () {
      function receive(e) {
        window.opener.postMessage(${JSON.stringify(msg)}, e.origin);
      }
      window.addEventListener("message", receive, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>`;

  return new Response(page, { headers: { "Content-Type": "text/html" } });
}