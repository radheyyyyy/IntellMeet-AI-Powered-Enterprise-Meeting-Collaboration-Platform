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

 export const joinMeeting = async (
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

  const userIdString =
    userId.toString();

  const alreadyJoined =
    meeting.participants.some(
      (participant) =>
        participant.toString() ===
        userIdString
    );

  if (alreadyJoined) {
    return meeting;
  }

  meeting.participants.push(
    userId
  );

  await meeting.save();

  return meeting;
};

  export const leaveMeeting =
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

    meeting.participants =
      meeting.participants.filter(
        (participant) =>
          participant.toString() !==
          userId.toString()
      );

    await meeting.save();

    return meeting;
  };

  export const startMeeting =
  async (
    meetingId
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

    meeting.status =
      "ONGOING";

    meeting.startedAt =
      new Date();

    await meeting.save();

    return meeting;
  };
  export const endMeeting = async (
  meetingId
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

  if (
    meeting.status !==
    "ONGOING"
  ) {
    throw new AppError(
      "Meeting is not active",
      400
    );
  }

  meeting.status =
    "COMPLETED";

  meeting.endedAt =
    new Date();

  await meeting.save();

  return meeting;
};
export const updateMeeting = async (
  meetingId,
  updateData
) => {
  const meeting =
    await Meeting.findByIdAndUpdate(
      meetingId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

  if (!meeting) {
    throw new AppError(
      "Meeting not found",
      404
    );
  }

  return meeting;
};
export const deleteMeeting =
  async (
    meetingId
  ) => {
    const meeting =
      await Meeting.findByIdAndDelete(
        meetingId
      );

    if (!meeting) {
      throw new AppError(
        "Meeting not found",
        404
      );
    }

    return true;
  };
  export const getMeetingByCode =
  async (
    meetingCode
  ) => {
    const meeting =
      await Meeting.findOne({
        meetingCode
      })
        .populate(
          "team",
          "name"
        )
        .populate(
          "host",
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