/**
 * JBAI chat question log → Google Sheet
 *
 * Sheet:
 * https://docs.google.com/spreadsheets/d/1CDCuQILeltsJA9PyZpSwuOorc9DHsHkONvSXI7f4AHw/edit
 *
 * Setup:
 * 1. Open the sheet above → Extensions → Apps Script → paste this file → Save
 * 2. Run `setupSheetHeaders` once from the editor (authorise when prompted)
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL (ends in /exec) → Vercel + `.env.local` as `AI_CHAT_LOG_WEBHOOK_URL`
 * 5. Optional: set the same random string in `LOG_SECRET` below and `AI_CHAT_LOG_SECRET` in env
 */

const SPREADSHEET_ID = "1CDCuQILeltsJA9PyZpSwuOorc9DHsHkONvSXI7f4AHw";
const SHEET_NAME = "Questions";
const LOG_SECRET = ""; // match AI_CHAT_LOG_SECRET, or leave empty

const HEADERS = [
  "Timestamp",
  "Question",
  "Answer",
  "Page",
  "Chip intent",
  "Question intent",
  "Goal",
  "Input",
  "Reply source",
  "Turn",
  "User agent",
];

/** Run once from the Apps Script editor to create headers. */
function setupSheetHeaders() {
  const sheet = getLogSheet(true);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else if (sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0].join("") === "") {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function getLogSheet(createIfMissing) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet && createIfMissing) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet && sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function doPost(event) {
  try {
    const body = JSON.parse(event.postData.contents || "{}");

    if (LOG_SECRET && body.secret !== LOG_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const sheet = getLogSheet(true);
    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.question || "",
      body.reply || "",
      body.pagePath || "",
      body.intentId || "",
      body.questionIntentId || "",
      body.goal || "",
      body.inputType || "",
      body.replySource || "",
      body.turn || "",
      body.userAgent || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : String(error),
    });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
