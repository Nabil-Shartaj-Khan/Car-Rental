const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//selecting all the car details from provided api and sending it to frontend
app.get("/cars", async (req, res) => {
  try {
    const response = await axios.get(
      "https://exam-server-7c41747804bf.herokuapp.com/carsList"
    );
    const responseData = response.data.data;
    console.log(responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    res.status(500).json({ message: "Error fetching data from the API" });
  }
});

//backend receiving code for booking details and calculating and sending back the results
app.post("/calculateCharge", async (req, res) => {
  try {
    const {
      selectedType,
      selectedMake,
      duration,
      hours,
      discount,
      collisionDamage,
      liabilityInsurance,
      rentalTax,
    } = req.body;

    //firstly all car details are fetched and specific car is selected
    const response = await axios.get(
      "https://exam-server-7c41747804bf.herokuapp.com/carsList"
    );
    const responseData = response.data.data;
    const selectedCar = responseData.find(
      (car) => car.type === selectedType && car.make === selectedMake
    );

    // Actual charge is calculated
    let baseCharge = 0;
    if (selectedCar) {
      if (duration) {
        baseCharge += duration * selectedCar.rates.daily;
      }
      if (hours) {
        baseCharge += hours * selectedCar.rates.hourly;
      }
    }

    // applying discount
    let totalCharge = baseCharge;
    if (discount) {
      totalCharge -= (totalCharge * discount) / 100;
    }

    // applying additional charges
    if (collisionDamage) {
      totalCharge += 9;
    }
    if (liabilityInsurance) {
      totalCharge += 15;
    }
    if (rentalTax) {
      totalCharge += (totalCharge * 11.5) / 100;
    }

    res.status(200).json({ totalCharge });
  } catch (error) {
    console.error("Error calculating charge:", error);
    res.status(500).json({ message: "Error calculating charge" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
