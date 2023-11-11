require("dotenv").config();

export const buildVerifyBookingUrl = (doctorId, token) => {
  return `${process.env.REACT_APP_FRONTEND_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;
};
