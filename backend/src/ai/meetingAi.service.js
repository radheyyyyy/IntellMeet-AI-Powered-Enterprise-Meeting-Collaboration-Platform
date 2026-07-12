import OpenAI from "openai";
import Meeting from "../models/meeting.model.js";
import MeetingSummary from "../models/meetingSummary.model.js";
import ActionItem from "../models/actionItem.model.js";
import AppError from "../utils/AppError.js";

const getClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new AppError("OPENAI_API_KEY is not configured", 503);
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

const parseJson = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    throw new AppError("AI returned an invalid response", 502);
  }
};

export const generateMeetingInsights = async ({ meetingId, transcript, userId }) => {
  const meeting = await Meeting.findById(meetingId);
  if (!meeting) throw new AppError("Meeting not found", 404);
  if (!transcript?.trim()) throw new AppError("Transcript is required", 400);

  const client = getClient();
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: "You are an enterprise meeting analyst. Return only valid JSON with summary (string), decisions (string[]), risks (string[]), actionItems ({description:string, assigneeName:string|null, dueDate:string|null}[]). Do not invent facts."
      },
      { role: "user", content: `Meeting title: ${meeting.title}\nTranscript:\n${transcript}` }
    ]
  });

  const insight = parseJson(response.output_text);
  const summary = await MeetingSummary.findOneAndUpdate(
    { meeting: meetingId },
    {
      meeting: meetingId,
      transcript,
      summary: insight.summary,
      decisions: insight.decisions || [],
      risks: insight.risks || [],
      generatedBy: userId
    },
    { upsert: true, returnDocument: "after", runValidators: true }
  );

  await ActionItem.deleteMany({ meeting: meetingId, source: "AI" });
  const actionItems = await ActionItem.insertMany(
    (insight.actionItems || []).filter((item) => item?.description).map((item) => ({
      meeting: meetingId,
      summary: summary._id,
      description: item.description,
      assigneeName: item.assigneeName || undefined,
      dueDate: item.dueDate || undefined,
      source: "AI"
    }))
  );

  return { summary, actionItems };
};

export const getMeetingInsights = async (meetingId) => {
  const summary = await MeetingSummary.findOne({ meeting: meetingId });
  const actionItems = await ActionItem.find({ meeting: meetingId }).sort({ createdAt: 1 });
  return { summary, actionItems };
};
