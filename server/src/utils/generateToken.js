import jwt from 'jsonwebtoken';

// Generate Access Token (short-lived)
export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
      issuer: 'edutrack',
      audience: 'edutrack-api',
    }
  );
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
      issuer: 'edutrack',
      audience: 'edutrack-api',
    }
  );
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

// Send token in cookie
export const sendTokenResponse = (user, statusCode, res) => {
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res
    .status(statusCode)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.profile?.avatar,
      },
    });
};
