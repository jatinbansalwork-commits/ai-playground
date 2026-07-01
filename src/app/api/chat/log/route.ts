import {
  detectQuestionIntent,
  type QuestionIntentId,
} from "@/lib/ai-chat-question-intent";
import {
  inferChatInputType,
  queueChatQuestionLog,
} from "@/lib/ai-chat-log.server";
import type { AiChatIntentId } from "@/lib/ai-chat-intents";
import type { ChatReplySource } from "@/lib/ai-chat-types";

interface ChatLogRequestBody {
  question?: string;
  reply?: string;
  pagePath?: string;
  intentId?: AiChatIntentId;
  questionIntentId?: QuestionIntentId;
  replySource?: ChatReplySource;
  turn?: number;
}

export async function POST(request: Request): Promise<Response> {
  let body: ChatLogRequestBody;

  try {
    body = (await request.json()) as ChatLogRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const question = body.question?.trim() ?? "";
  const reply = body.reply?.trim() ?? "";

  if (!question || !reply) {
    return Response.json({ error: "Question and reply are required." }, { status: 400 });
  }

  const pagePath = body.pagePath?.trim() || undefined;
  const detected = detectQuestionIntent(question, pagePath);

  queueChatQuestionLog(request, [], {
    question,
    reply,
    pagePath,
    intentId: body.intentId,
    questionIntentId: body.questionIntentId ?? detected.id,
    goal: detected.goal,
    inputType: inferChatInputType(body.intentId),
    replySource: body.replySource ?? "static",
    turn: body.turn ?? 1,
  });

  return Response.json({ ok: true });
}
