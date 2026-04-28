  const jwt = require("jsonwebtoken");
  const User = require("../models/User");
  const {
    generateAccessToken,
    generateRefreshToken
  } = require("../utils/jwt");


  // LOGIN
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate request
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required"
        });
      }

      // Find user
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials"
        });
      }

      // Check password
      const isMatch = user.password === password;

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials"
        });
      }

      // Check if user active
      // if (!user.isActive) {
      //   return res.status(403).json({
      //     message: "User account is inactive"
      //   });
      // }

      // JWT payload
      const payload = {
  user_id: user.user_id,
  email: user.email,
  role: user.role
};
      // Generate tokens
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return res.status(200).json({
        message: "Login successful",
        accessToken,
        refreshToken,
        role: user.role
      });

    } catch (error) {
      console.error("Login error:", error);

      res.status(500).json({
        message: "Login failed",
        error: error.message
      });
    }
  };


  // REFRESH TOKEN
  exports.refresh = (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          message: "Refresh token required"
        });
      }

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      const payload = {
  user_id: decoded.user_id,
  email: decoded.email,
  role: decoded.role
};

      // Generate new access token
      const accessToken = generateAccessToken(payload);

      res.json({
        message: "Token refreshed",
        accessToken
      });

    } catch (error) {
      res.status(403).json({
        message: "Invalid or expired refresh token"
      });
    }
  };