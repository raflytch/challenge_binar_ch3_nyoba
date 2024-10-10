const fs = require("fs");
const path = require("path");

const data = `${__dirname}/../data/cars.json`;
const allDataCars = JSON.parse(fs.readFileSync(data));

const getAllCarsData = (req, res) => {
  if (!allDataCars) {
    return res.status(404).json({
      status: "Not Found",
      message: "Car data not found",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "All cars data successfully",
    data: allDataCars,
  });
};

const getCarById = (req, res) => {
  const { id } = req.params;
  const car = allDataCars.find((car) => car.id === id);
  if (!car) {
    return res.status(404).json({
      status: "Not Found",
      message: "Car not found",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "Car successfully",
    data: car,
  });
};

const createCarData = (req, res) => {
  const newCar = req.body;
  allDataCars.push(newCar);

  fs.writeFileSync(data, JSON.stringify(allDataCars), (err) => {
    if (err) {
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Car data not found",
      });
    }
  });

  res.status(201).json({
    status: "Created",
    message: "Car successfully created",
    data: newCar,
  });
};

const editCarData = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const index = allDataCars.findIndex((car) => car.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "Not Found",
      message: "Car not found",
    });
  }

  allDataCars[index] = body;

  try {
    fs.writeFileSync(
      path.join(__dirname, "data.json"),
      JSON.stringify(allDataCars, null, 2)
    );
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Failed to update car data",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "Car successfully updated",
    data: allDataCars[index],
  });
};

const deleteCarData = (req, res) => {
  const { id } = req.params;
  const index = allDataCars.findIndex((car) => car.id === id);

  const deletedCars = allDataCars.splice(index, 1);

  try {
    fs.writeFileSync(
      path.join(`${__dirname}/../data/cars.json`),
      JSON.stringify(allDataCars)
    );
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Failed to delete car data",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "Car successfully deleted",
    data: deletedCars,
  });
};

module.exports = {
  getAllCarsData,
  getCarById,
  createCarData,
  editCarData,
  deleteCarData,
};
