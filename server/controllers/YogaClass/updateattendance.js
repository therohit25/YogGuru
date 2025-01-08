const YogaAppointmentModel = require("../../models/YogaAppointmentModel");

module.exports = async (req, res) => {
  try {
    const result = await YogaAppointmentModel.findOne({ _id: req.body.id });

    result?.Trainee?.forEach((trainee) => {
      if (trainee.TraineeInfo.toString() === req.body._id) {
        trainee.Attendance = req.body.attendance;
      }
    });

    await result.save();
    res.json(result).status(200);
  } catch (error) {
    console.error("Error :", error?.message);
    res.json({ error: error.message });
  }
};
