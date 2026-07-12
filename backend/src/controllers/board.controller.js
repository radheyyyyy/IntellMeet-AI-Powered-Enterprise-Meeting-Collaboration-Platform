import { addColumn, createBoard, getBoard, getTeamBoards } from "../services/board.service.js";

export const createBoardController = async (req, res, next) => {
  try {
    const board = await createBoard({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, board });
  } catch (error) { next(error); }
};

export const getTeamBoardsController = async (req, res, next) => {
  try { res.json({ success: true, boards: await getTeamBoards(req.params.teamId) }); }
  catch (error) { next(error); }
};

export const getBoardController = async (req, res, next) => {
  try { res.json({ success: true, ...(await getBoard(req.params.id)) }); }
  catch (error) { next(error); }
};

export const addColumnController = async (req, res, next) => {
  try { res.status(201).json({ success: true, column: await addColumn({ boardId: req.params.id, ...req.body }) }); }
  catch (error) { next(error); }
};
