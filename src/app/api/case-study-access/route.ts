import {
  recordChatQuestionLog,
} from "@/lib/ai-chat-log.server";
import { isCaseStudyAccessGated } from "@/lib/case-study-password-gate";

interface CaseStudyAccessBody {
  email?: string;
  slug?: string;
  title?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<Response> {
  let body: CaseStudyAccessBody;

  try {
    body = (await request.json()) as CaseStudyAccessBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const slug = body.slug?.trim() ?? "";
  const title = body.title?.trim() || slug;

  if (!email || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!slug || !isCaseStudyAccessGated(slug)) {
    return Response.json({ error: "Unknown gated case study." }, { status: 400 });
  }

  const logStatus = await recordChatQuestionLog(request, [], {
    question: `[Case study access] ${title}`,
    reply: `Email: ${email}`,
    pagePath: `/projects/${slug}`,
    questionIntentId: "explore",
    goal: `Visitor requested access to gated case study ${slug}.`,
    inputType: "typed",
    replySource: "static",
    turn: 1,
  });

  return Response.json({
    ok: true,
    logged: logStatus === "logged",
    logStatus,
  });
}
