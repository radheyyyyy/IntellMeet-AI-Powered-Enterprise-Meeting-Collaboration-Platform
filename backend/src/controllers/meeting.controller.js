import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  joinMeeting,
  leaveMeeting,
  startMeeting,
  endMeeting,
  updateMeeting,
  deleteMeeting,
  getMeetingByCode,
  
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

  export const leaveMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await leaveMeeting(
          req.params.id,
          req.user._id
        );

      res.status(200).json({
        success: true,
        message:
          "Left meeting successfully",
        meeting
      });
    } catch (error) {
      next(error);
    }
  };
  

  export const startMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await startMeeting(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          "Meeting started",
        meeting
      });
    } catch (error) {
      next(error);
    }
  };
  export const endMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await endMeeting(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          "Meeting ended",
        meeting
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await updateMeeting(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Meeting updated successfully",
        meeting
      });
    } catch (error) {
      next(error);
    }
  };
  export const deleteMeetingController =
  async (
    req,
    res,
    next
  ) => {
    try {
      await deleteMeeting(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Meeting deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  };
  export const getMeetingByCodeController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const meeting =
        await getMeetingByCode(
          req.params.code
        );

      res.status(200).json({
        success: true,
        meeting
      });
    } catch (error) {
      next(error);
    }
  };