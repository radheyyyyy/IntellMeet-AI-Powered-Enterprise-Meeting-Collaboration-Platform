import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  createPasswordResetToken,
  resetPasswordWithToken,
  changeUserPassword
} from "../services/auth.service.js";

export const signup =
  async (req, res, next) => {
    try {
      const user =
        await registerUser(
          req.body
        );

      const userResponse = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      };

      res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        user: userResponse
      });
    } catch (error) {
      next(error);
    }
  };

export const login =
  async (req, res, next) => {
    try {
      const result =
        await loginUser(
          req.body.email,
          req.body.password
        );

      const userResponse = {
        id: result.user._id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        role: result.user.role
      };

      res.json({
        success: true,
        user: userResponse,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      next(error);
    }
  };

  export const getMe =
  async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        user: {
          id: req.user._id,
          firstName:
            req.user.firstName,
          lastName:
            req.user.lastName,
          email:
            req.user.email,
          role:
            req.user.role
        }
      });
    } catch (error) {
      next(error);
    }
  };
export const refreshToken =
  async (req, res, next) => {
    try {
      const {
        refreshToken
      } = req.body;

      const accessToken =
        await refreshAccessToken(
          refreshToken
        );

      res.status(200).json({
        success: true,
        accessToken
      });
    } catch (error) {
      next(error);
    }
  };
export const logout =
  async (req, res, next) => {
    try {
      await logoutUser(
        req.user._id
      );

      res.status(200).json({
        success: true,
        message:
          "Logged out successfully"
      });
    } catch (error) {
      next(error);
    }
  };

export const forgotPassword = async (req, res, next) => {
  try {
    const resetToken = await createPasswordResetToken(req.body.email);
    const response = {
      success: true,
      message: "If the account exists, password reset instructions have been created."
    };

    // A mail provider is not configured in this backend yet. This makes local
    // development testable without exposing reset tokens in production.
    if (process.env.NODE_ENV !== "production" && resetToken) {
      response.resetToken = resetToken;
      response.resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await resetPasswordWithToken({
      token: req.params.token,
      password: req.body.password
    });

    res.status(200).json({
      success: true,
      message: "Password reset successfully. Please log in again."
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    await changeUserPassword({
      userId: req.user._id,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully. Please log in again."
    });
  } catch (error) {
    next(error);
  }
};
