const Car = require("../model/Cars");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ updatedAt: -1 });
    return res.status(200).json(cars);
  } catch (err) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    // ID geçerli mi? (önemli)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Geçersiz ID" });
    }

    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Araba bulunamadı" });

    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);

    if (!car) return res.status(404).json({ message: "Silinecek araba bulunamadı" });

    return res.status(200).json({ message: "Başarıyla silindi", car });
  } catch (err) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body, { new: true });

    if (!car) return res.status(404).json({ message: "Güncellenecek araba bulunamadı" });

    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

const createCar = async (req, res) => {
  try {
    const { name, model, year } = req.body;

    if (!name || !model || !year) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur" });
    }

    const car = await Car.create({ name, model, year });
    return res.status(201).json(car); 
  } catch (err) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = { getAllCars, getCarById, deleteCar, updateCar, createCar };
