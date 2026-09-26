import { NextRequest, NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";
 
const ALLOWED_COURSES = ["sap", "power-platform", "data-engineering"];
const ALLOWED_LEVELS = ["beginner", "intermediate", "advanced"];
 
// One client instance, reused across requests (cheap to construct, but no need to redo it every call)
const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
  },
});
 
async function getGraphToken(): Promise<string> {
  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  if (!result?.accessToken) throw new Error("Failed to acquire Graph token");
  return result.accessToken;
}
 
export async function POST(req: NextRequest) {
  const { name, email, phone, course, experienceLevel } = await req.json();
 
  if (!name || !email || !phone || !course || !experienceLevel) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
 
  if (!ALLOWED_COURSES.includes(course) || !ALLOWED_LEVELS.includes(experienceLevel)) {
    return NextResponse.json({ error: "Invalid course or level" }, { status: 400 });
  }
 
  const siteId = process.env.SHAREPOINT_SITE_ID!;
  const listId = process.env.SHAREPOINT_LIST_ID!;
 
  try {
    const token = await getGraphToken();
 
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            // Built-in first column — kept filled as a fallback/fallback display value
            Title: name.trim(),
            // Custom column added separately; internal name usually differs from the
            // "Full Name" label because of the space — confirm via List settings →
            // click the column → check "Field=" in the URL. Swap this key if different.
            FullName: name.trim(),
            Email: email.trim(),
            contact_number: phone.trim(),
            Course: course,
            Experience_level: experienceLevel,
          },
        }),
      }
    );
 
    if (!res.ok) {
      const errBody = await res.text();
      console.error("SharePoint insert failed:", res.status, errBody);
      return NextResponse.json({ error: "Submission failed" }, { status: 500 });
    }
 
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}