import { bookSchedule, bookingVerify } from "../service/patient.service";

export const bookScheduleHandler = async (req, res) => {
  try {
    res.status(200).json(await bookSchedule(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const bookingVerifyHandler = async (req, res) => {
  try {
    res.status(200).json(await bookingVerify(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
