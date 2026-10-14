import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";
import { getCourse, PROFESSIONAL_SKILLS } from "@/data/courses";

export const runtime = "nodejs";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const ACCENT = rgb(0.0, 0.45, 0.85);
const DARK = rgb(0.07, 0.07, 0.1);
const BODY = rgb(0.15, 0.15, 0.18);
const MUTED = rgb(0.4, 0.4, 0.45);

// Standard PDF fonts WinAnsi hi support karte hain, to "→" jaise chars replace/strip karne padte hain
const clean = (s: string) =>
  s
    .replace(/→/g, "->")
    .replace(/[^\x20-\x7E\u00A0-\u00FF\u2013\u2014\u2018\u2019\u201C\u201D\u2022]/g, "");

class Writer {
  page: PDFPage;
  y: number;

  constructor(
    private doc: PDFDocument,
    private font: PDFFont,
    private bold: PDFFont,
  ) {
    this.page = doc.addPage([PAGE_W, PAGE_H]);
    this.y = PAGE_H - MARGIN;
  }

  private ensure(h: number) {
    if (this.y - h < MARGIN + 24) {
      this.page = this.doc.addPage([PAGE_W, PAGE_H]);
      this.y = PAGE_H - MARGIN;
    }
  }

  private wrap(text: string, font: PDFFont, size: number, maxW: number) {
    const words = clean(text).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(test, size) <= maxW) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = w;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  banner(title: string, subtitle: string, meta: string) {
    const h = 130;
    this.page.drawRectangle({
      x: 0,
      y: PAGE_H - h,
      width: PAGE_W,
      height: h,
      color: DARK,
    });
    this.page.drawText("42X ACADEMY  |  COURSE SYLLABUS", {
      x: MARGIN,
      y: PAGE_H - 34,
      size: 9,
      font: this.bold,
      color: rgb(0.0, 0.7, 1),
    });
    this.page.drawText(clean(title), {
      x: MARGIN,
      y: PAGE_H - 66,
      size: 26,
      font: this.bold,
      color: rgb(1, 1, 1),
    });
    const sub = this.wrap(subtitle, this.font, 10, CONTENT_W);
    let sy = PAGE_H - 86;
    for (const l of sub.slice(0, 2)) {
      this.page.drawText(l, {
        x: MARGIN,
        y: sy,
        size: 10,
        font: this.font,
        color: rgb(0.8, 0.82, 0.88),
      });
      sy -= 13;
    }
    this.page.drawText(clean(meta), {
      x: MARGIN,
      y: PAGE_H - h + 12,
      size: 9,
      font: this.font,
      color: rgb(0.6, 0.65, 0.75),
    });
    this.y = PAGE_H - h - 28;
  }

  heading(text: string) {
    this.ensure(40);
    this.y -= 10;
    this.page.drawText(clean(text).toUpperCase(), {
      x: MARGIN,
      y: this.y,
      size: 11,
      font: this.bold,
      color: ACCENT,
    });
    this.y -= 5;
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE_W - MARGIN, y: this.y },
      thickness: 0.6,
      color: rgb(0.85, 0.87, 0.92),
    });
    this.y -= 14;
  }

  paragraph(text: string, size = 10, color = BODY) {
    const lines = this.wrap(text, this.font, size, CONTENT_W);
    for (const l of lines) {
      this.ensure(size + 4);
      this.page.drawText(l, { x: MARGIN, y: this.y, size, font: this.font, color });
      this.y -= size + 4;
    }
    this.y -= 4;
  }

  bullet(text: string, size = 10, indent = 0) {
    const bx = MARGIN + indent;
    const tx = bx + 12;
    const lines = this.wrap(text, this.font, size, PAGE_W - MARGIN - tx);
    lines.forEach((l, i) => {
      this.ensure(size + 4);
      if (i === 0) {
        this.page.drawText("\u2022", {
          x: bx,
          y: this.y,
          size,
          font: this.font,
          color: ACCENT,
        });
      }
      this.page.drawText(l, {
        x: tx,
        y: this.y,
        size,
        font: this.font,
        color: BODY,
      });
      this.y -= size + 3.5;
    });
  }

  moduleTitle(n: number, title: string, duration: string) {
    this.ensure(52);
    this.y -= 6;
    const left = clean(`${n}. ${title}`);
    this.page.drawText(left, {
      x: MARGIN,
      y: this.y,
      size: 11,
      font: this.bold,
      color: DARK,
    });
    const dur = clean(duration);
    const w = this.font.widthOfTextAtSize(dur, 9);
    this.page.drawText(dur, {
      x: PAGE_W - MARGIN - w,
      y: this.y,
      size: 9,
      font: this.font,
      color: MUTED,
    });
    this.y -= 15;
  }

  footer(label: string) {
    const pages = this.doc.getPages();
    pages.forEach((p, i) => {
      p.drawText(clean(`${label}  |  Page ${i + 1} of ${pages.length}`), {
        x: MARGIN,
        y: 26,
        size: 8,
        font: this.font,
        color: MUTED,
      });
    });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }

  const doc = await PDFDocument.create();
  doc.setTitle(`${course.title} Syllabus - 42X Academy`);
  doc.setAuthor("42X Academy");

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const w = new Writer(doc, font, bold);

  w.banner(
    course.title,
    course.subtitle,
    `Duration: ${course.duration}   |   Structure: ${course.structure}`,
  );

  w.heading("Who this is for");
  w.paragraph(course.audience);

  w.heading("Program highlights");
  course.highlights.forEach((h) => w.bullet(h));

  w.heading("Curriculum");
  course.modules.forEach((mod, i) => {
    w.moduleTitle(i + 1, mod.title, mod.duration);
    mod.topics.forEach((t) => w.bullet(t, 9.5, 8));
  });

  w.heading("Skills you will build");
  course.skills.forEach((s) => w.bullet(s));

  w.heading("Capstone project");
  w.paragraph(course.capstone);

  w.heading("Outcomes");
  course.outcomes.forEach((o) => w.bullet(o));

  w.heading("Career roles");
  course.roles.forEach((r) => w.bullet(r));

  w.heading("What makes this different");
  w.paragraph(course.differentiator);

  w.heading("Embedded professional & project skills");
  PROFESSIONAL_SKILLS.forEach((p) => w.bullet(`${p.area}: ${p.practice}`));

  w.footer(`42X Academy  |  ${course.title}`);

  const bytes = await doc.save();
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${course.slug}-syllabus.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}