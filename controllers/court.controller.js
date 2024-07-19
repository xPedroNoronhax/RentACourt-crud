const Court = require("../models/court.model");

const createCourt = async (req, res) => {
  try {
    const { name, surface, pricePerHour } = req.body;
    const newCourt = new Court({ name, surface, pricePerHour });
    await newCourt.save();
    res.status(201).json(newCourt);
  } catch (error) {
    res.status(500).json({ message: "Error in create Court", error });
  }
};

const getCourts = async (req, res) => {
  try {
    const courts = await Court.find({});
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ message: "Error in get a courts", error });
  }
};

const getCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await Court.findById(id);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "error in get a court", error });
  }
};

const updateCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await Court.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Error in update court", error });
  }
};

const deleteCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await Court.findByIdAndDelete(id, req.body);
    if (!court) {
      res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json({ message: "Court deleted" });
  } catch (error) {
    res.status(500).json({ message: "error in delete a court", error });
  }
};

const rentCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await Court.findById(id);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    if (!court.available) {
      return res.status(400).json({ message: "court is already rented" });
    }

    court.available = false;
    await court.save();

    setTimeout(async () => {
      try {
        court.available = true;
        await court.save();
        console.log(`Court ${id} is now available again.`);
      } catch (error) {
        console.error(`Failed to update court ${id}:`, error);
      }
    }, 60000); // 1 minuto = 60000 milissegundos

    res.status(200).json({ message: "Court rent successful" });
  } catch (error) {
    res.status(500).json({ message: "error in rent a court", error });
  }
};

const unrentCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await Court.findById(id);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    if (court.available) {
      return res.status(400).json({ message: "Court is already avaliable" });
    }

    court.available = true;
    await court.save();

    res.status(200).json({ message: "Court is now avaliable" });
  } catch (error) {
    res.status(500).json({ message: "error in unrent a court" });
  }
};

module.exports = {
  createCourt,
  getCourts,
  getCourt,
  updateCourt,
  deleteCourt,
  rentCourt,
  unrentCourt,
};
