import { bookSchedule } from "../service/patient.service";

export const bookScheduleHandler = async () => {
  try {
    res.status(200).json(await bookSchedule(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
