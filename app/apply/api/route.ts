import { NextRequest, NextResponse } from "next/server";

const BACKGROUNDS = ["student", "working-professional", "career-switcher"];
const TRACKS = ["sap", "power-bi", "power-platform"];

export async function POST(req: NextRequest) {
  const { name, phone, email, background, track, why, src } = await req.json();

  if (!name || !phone || !email || !background || !track || !why) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!BACKGROUNDS.includes(background) || !TRACKS.includes(track)) {
    return NextResponse.json({ error: "Invalid background or track" }, { status: 400 });
  }

  const phoneDigits = String(phone).replace(/[^0-9]/g, "");
  if (phoneDigits.length < 7) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  // TODO: persist this application.
  // app/contact/api/route.ts writes to SharePoint, but its schema is
  // name / email / phone / course / experienceLevel and rejects Power BI
  // plus the background values this form collects. Wire a matching list
  // (including `why` and `src`) before treating this as saved.
  void src;

  return NextResponse.json({ success: true });
}
