import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMemberToTeam,
  removeMemberFromTeam,
} from "../services/team.service.js";



export const createTeamController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const team =
        await createTeam(
          req.body,
          req.user._id
        );

      res.status(201).json({
        success: true,
        message:
          "Team created successfully",
        team
      });
    } catch (error) {
      next(error);
    }
  };

export const getTeamsController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const teams =
        await getAllTeams();

      res.status(200).json({
        success: true,
        teams
      });
    } catch (error) {
      next(error);
    }
  };

export const getTeamController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const team =
        await getTeamById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        team
      });
    } catch (error) {
      next(error);
    }
  };
export const updateTeamController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const team =
        await updateTeam(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Team updated successfully",
        team
      });
    } catch (error) {
      next(error);
    }
  };

  export const deleteTeamController =
  async (
    req,
    res,
    next
  ) => {
    try {
      await deleteTeam(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Team deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  };


  export const addMemberController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const team =
        await addMemberToTeam(
          req.params.id,
          req.body.userId,
          req.body.role
        );

      res.status(200).json({
        success: true,
        message:
          "Member added successfully",
        team
      });
    } catch (error) {
      next(error);
    }
  };

  export const removeMemberController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const team =
        await removeMemberFromTeam(
          req.params.id,
          req.params.userId
        );

      res.status(200).json({
        success: true,
        message:
          "Member removed successfully",
        team
      });
    } catch (error) {
      next(error);
    }
  };