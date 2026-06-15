import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  joinMeeting,
  
} from "../services/meeting.service.js";

export const createMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await createMeeting(
          req.body,
          req.user._id
        );

      res.status(201).json({
        success: true,
        message:
          "Meeting created successfully",
        meeting
      });
    } catch (error) {
      next(error);
    }
  };

export const getMeetingsController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meetings =
        await getAllMeetings();

      res.status(200).json({
        success: true,
        meetings
      });
    } catch (error) {
      next(error);
    }
  };

export const getMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await getMeetingById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        meeting
      });
    } catch (error) {
      next(error);
    }
  };
  export const joinMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await joinMeeting(
          req.params.id,
          req.user._id
        );

      res.status(200).json({
        success: true,
        message:
          "Joined meeting successfully",
        meeting
      });
    } catch (error) {
      next(error);
    }
  };