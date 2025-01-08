const YogaAppointmentModel = require("../../models/YogaAppointmentModel");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    let Trainer = req.body.Trainer;

    let Trainee = req?.session?.user[0]._id;
    let AppointmentTime = req.body.AppointmentTime;
    let Today = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

    const result = await YogaAppointmentModel.findOne({
      Trainer: Trainer,
      Today: Today,
    }).sort({ _id: -1 });

    if (result === null || result.length === 0) {
      const booking = await YogaAppointmentModel.create({
        Trainee: [
          {
            TraineeInfo: Trainee,
          },
        ],
        Trainer: Trainer,
        AppointmentTime: AppointmentTime,
      });

      res.json(booking).status(200);
    } else {
      let isfound = result?.Trainee?.some((trainee) => {
        return trainee.TraineeInfo.toString() === Trainee;
      });
      if (!isfound) {
        result.Trainee.push({ TraineeInfo: Trainee });
        await result.save();
        res.json(result).status(200);
      } else {
        res.json({ msg: "Already Booked", result: result }).status(200);
      }
    }
  } catch (error) {
    console.error("Error :", error?.message);
    res.json({ error: error.message });
  }
};
