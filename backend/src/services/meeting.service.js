import Meeting from "../models/meeting.model.js";
import Team from "../models/team.model.js";
import AppError from "../utils/AppError.js";
import generateMeetingCode from "../utils/generateMeetingCode.js";

export const createMeeting = async (
  meetingData,
  hostId
) => {
  const team =
    await Team.findById(
      meetingData.team
    );

  if (!team) {
    throw new AppError(
      "Team not found",
      404
    );
  }

  const meeting =
    await Meeting.create({
      ...meetingData,

      host: hostId,

      meetingCode:
        generateMeetingCode(),

      participants: [hostId]
    });

  return meeting;
};

export const getAllMeetings =
  async () => {
    return await Meeting.find()
      .populate(
        "team",
        "name"
      )
      .populate(
        "host",
        "firstName lastName email"
      );
  };

export const getMeetingById =
  async (
    meetingId
  ) => {
    const meeting =
      await Meeting.findById(
        meetingId
      )
        .populate(
          "team",
          "name"
        )
        .populate(
          "host",
          "firstName lastName email"
        )
        .populate(
          "participants",
          "firstName lastName email"
        );

    if (!meeting) {
      throw new AppError(
        "Meeting not found",
        404
      );
    }

    return meeting;
  };

  export const joinMeeting =
  async (
    meetingId,
    userId
  ) => {
    const meeting =
      await Meeting.findById(
        meetingId
      );

    if (!meeting) {
      throw new AppError(
        "Meeting not found",
        404
      );
    }

    const alreadyJoined =
      meeting.participants.some(
        (participant) =>
          participant.toString() ===
          userId
      );

    if (!alreadyJoined) {
      meeting.participants.push(
        userId
      );

      await meeting.save();
    }

    return meeting;
  };
  