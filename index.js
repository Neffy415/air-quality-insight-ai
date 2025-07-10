import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const URL = "https://api.openaq.org/v3";
const apiKey =process.env.OPENAQ_API_KEY;
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", async (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;

  if (!lat || !long) {
    // If no coordinates, just render the page and let the frontend get them
    return res.render("index.ejs", { Data: null });
  }

  try {
    const result = await axios.get(
      `${URL}/locations?coordinates=${lat},${long}&radius=10000&limit=1`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );
    const id = result.data.results[0].id;
    const location =result.data.results[0].name;
    const result2 = await axios.get(`${URL}/locations/${id}/latest`, {
      headers: {
        "X-API-Key": apiKey,
      },
    });
    const len = result2.data.results.length;
   
    let sensorsIds = [];
    for (var i = 0; i < len; i++) {
      sensorsIds.push(result2.data.results[i].sensorsId);
    }
    const sensorRequests = sensorsIds.map((id) =>
      axios.get(`${URL}/sensors/${id}`, {
        headers: { "X-API-Key": apiKey },
      })
    );

    const results3 = await Promise.all(sensorRequests);

    const sensorsData = results3.map((r) => r.data.results[0]);
   

    res.render("index.ejs", {
      
      Data: sensorsData,
      location: location,
    });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", {
      Data: null,
      error: "Error fetching data. Please try again later.",
    });
  }
});

app.listen(3000, () => {
  console.log("running");
});