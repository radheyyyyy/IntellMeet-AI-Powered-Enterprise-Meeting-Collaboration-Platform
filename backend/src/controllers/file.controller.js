import {
  createFile,
  getFiles,
  getFileById,
  deleteFile,
} from "../services/file.service.js";

/*
|--------------------------------------------------------------------------
| Upload File
|--------------------------------------------------------------------------
*/

export const uploadFileController =
  async (
    req,
    res,
    next
  ) => {
    try {

      if (!req.file) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "No file uploaded",
          });
      }

      const file =
        await createFile({
          fileName:
            req.file.originalname,

          fileUrl:
            req.file.path,

          fileType:
            req.file.mimetype,

          uploadedBy:
            req.user._id,

          meeting:
            req.body.meeting,

          team:
            req.body.team,
        });

      res.status(201).json({
        success: true,
        file,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get All Files
|--------------------------------------------------------------------------
*/

export const getFilesController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const files =
        await getFiles();

      res.json({
        success: true,
        files,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get File By ID
|--------------------------------------------------------------------------
*/

export const getFileController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const file =
        await getFileById(
          req.params.id
        );

      if (!file) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "File not found",
          });
      }

      res.json({
        success: true,
        file,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Delete File
|--------------------------------------------------------------------------
*/

export const deleteFileController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const file =
        await deleteFile(
          req.params.id
        );

      if (!file) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "File not found",
          });
      }

      res.json({
        success: true,
        message:
          "File deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  };