import Board from "../models/board.model.js";
import BoardColumn from "../models/boardColumn.model.js";
import AppError from "../utils/AppError.js";

const defaults = [
  { name: "To Do", key: "TODO", position: 0 },
  { name: "In Progress", key: "IN_PROGRESS", position: 1 },
  { name: "Review", key: "REVIEW", position: 2 },
  { name: "Done", key: "DONE", position: 3 }
];

export const createBoard = async ({ name, description, team, createdBy }) => {
  const board = await Board.create({ name, description, team, createdBy });
  await BoardColumn.insertMany(defaults.map((column) => ({ ...column, board: board._id })));
  return board;
};

export const getTeamBoards = async (teamId) => Board.find({ team: teamId }).sort({ createdAt: -1 });

export const getBoard = async (boardId) => {
  const board = await Board.findById(boardId).populate("team", "name");
  if (!board) throw new AppError("Board not found", 404);
  const columns = await BoardColumn.find({ board: boardId }).sort({ position: 1 });
  return { board, columns };
};

export const addColumn = async ({ boardId, name, key, position }) => {
  const board = await Board.exists({ _id: boardId });
  if (!board) throw new AppError("Board not found", 404);
  return BoardColumn.create({ board: boardId, name, key, position });
};
