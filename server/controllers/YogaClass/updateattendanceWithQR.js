const YogaAppointmentModel = require("../../models/YogaAppointmentModel");

module.exports = async (req, res) => {
  try {
    const Today = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
    const Trainer = req.session.user[0]._id;
    const { Trainee } = req.params;

    const result = await YogaAppointmentModel.findOne({
      Trainer: Trainer,
      Today: Today,
    })
      .sort({ _id: -1 })
      .populate("Trainee.TraineeInfo");

    result?.Trainee?.forEach((trainee) => {
      if (trainee.TraineeInfo._id.toString() === Trainee) {
        trainee.Attendance = "Present";
      }
    });

    await result.save();
    res.json(result);
  } catch (error) {
    console.error("Error :", error?.message);
    res.json({ error: error.message });
  }
};
