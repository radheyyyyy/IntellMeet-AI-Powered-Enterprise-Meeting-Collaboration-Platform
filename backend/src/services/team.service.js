import Team from "../models/team.model.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.model.js";

export const createTeam = async (
  teamData,
  ownerId
) => {
  const existingTeam =
    await Team.findOne({
      name: teamData.name
    });

  if (existingTeam) {
    throw new AppError(
      "Team already exists",
      400
    );
  }

  const team =
    await Team.create({
      ...teamData,

      owner: ownerId,

      members: [
        {
          user: ownerId,
          role: "MANAGER"
        }
      ]
    });

  return team;
};

export const getAllTeams =
  async () => {
    return await Team.find()
      .populate(
        "owner",
        "firstName lastName email"
      )
      .populate(
        "members.user",
        "firstName lastName email"
      );
  };

export const getTeamById =
  async (teamId) => {
    const team =
      await Team.findById(
        teamId
      )
        .populate(
          "owner",
          "firstName lastName email"
        )
        .populate(
          "members.user",
          "firstName lastName email"
        );

    if (!team) {
      throw new AppError(
        "Team not found",
        404
      );
    }

    return team;
  };

  
  export const updateTeam = async (
  teamId,
  updateData
) => {
  const team =
    await Team.findByIdAndUpdate(
      teamId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

  if (!team) {
    throw new AppError(
      "Team not found",
      404
    );
  }

  return team;
};

export const deleteTeam = async (
  teamId
) => {
  const team =
    await Team.findByIdAndDelete(
      teamId
    );

  if (!team) {
    throw new AppError(
      "Team not found",
      404
    );
  }

  return true;
};


export const addMemberToTeam =
  async (
    teamId,
    userId,
    role = "MEMBER"
  ) => {
    const team =
      await Team.findById(
        teamId
      );

    if (!team) {
      throw new AppError(
        "Team not found",
        404
      );
    }

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const existingMember =
      team.members.find(
        (member) =>
          member.user.toString() ===
          userId
      );

    if (existingMember) {
      throw new AppError(
        "User already in team",
        400
      );
    }

    team.members.push({
      user: userId,
      role
    });

    await team.save();

    return team;
  };
  export const removeMemberFromTeam =
  async (
    teamId,
    userId
  ) => {
    const team =
      await Team.findById(
        teamId
      );

    if (!team) {
      throw new AppError(
        "Team not found",
        404
      );
    }

    team.members =
      team.members.filter(
        (member) =>
          member.user.toString() !==
          userId
      );

    await team.save();

    return team;
  };