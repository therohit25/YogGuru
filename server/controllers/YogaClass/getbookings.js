const YogaAppointmentModel = require("../../models/YogaAppointmentModel");

module.exports = async (req, res) => {
  try {
    const result = await YogaAppointmentModel.find({})
      .sort({ _id: -1 })
      .populate("Trainee.TraineeInfo")
      .populate("Trainer");

    res.json(result);
  } catch (error) {
    console.error("Error :", error?.message);
    res.json({ error: error.message });
  }
};
