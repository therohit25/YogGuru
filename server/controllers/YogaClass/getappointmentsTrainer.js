const YogaAppointmentModel = require("../../models/YogaAppointmentModel");

module.exports = async (req, res) => {
  try {
    let Trainer = req?.session?.user[0]._id;
    let Today = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

    const result = await YogaAppointmentModel.find({
      Trainer: Trainer,
      "Trainee.Attendance": "Due",
      Today: Today,
    })
      .sort({ _id: -1 })
      .populate("Trainee.TraineeInfo");

    res.json(result);
  } catch (error) {
    console.error("Error :", error?.message);
    res.json({ error: error?.message }).status(400);
  }
};
