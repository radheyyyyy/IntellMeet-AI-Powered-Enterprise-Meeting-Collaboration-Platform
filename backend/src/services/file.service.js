import File from "../models/file.model.js";

export const createFile = async (fileData) => {
  return await File.create(fileData);
};

export const getFiles = async () => {
  return await File.find()
    .populate(
      "uploadedBy",
      "firstName lastName email"
    )
    .populate(
      "team",
      "name"
    )
    .populate(
      "meeting",
      "title"
    )
    .sort({
      createdAt: -1,
    });
};

export const getFileById = async (id) => {
  return await File.findById(id)
    .populate(
      "uploadedBy",
      "firstName lastName email"
    )
    .populate(
      "team",
      "name"
    )
    .populate(
      "meeting",
      "title"
    );
};

export const deleteFile = async (id) => {
  return await File.findByIdAndDelete(id);
};