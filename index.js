import express from "express";
import axios from "axios";
const URL = "https://api.openaq.org/v3";
const apiKey =
  "386ad016cfc4952d99e4671b97cc059e30c3523c259dc695a7c37f8d805a5200";
const app = express();
app.use(express.static("public"));
app.post("/", async (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
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
    const result2 = await axios.get(`${URL}/locations/${id}/latest`, {
      headers: {
        "X-API-Key": apiKey,
      },
    });
    const len=result2.data.results.length;
    let sensorsIds = [];
    for(var i=0;i<len;i++){
        sensorsIds.push(result2.data.results[i].sensorsId);
    }
    const sensorsData=[];
    for(var i=0;i<len;i++){
        const result3=await axios.get(`${URL}/sensors/${sensorsIds[i]}`,
            {
                headers:{
                    "X-API-Key": apiKey,
                }
            }
        );
        sensorsData.push(result3.data.results[0]);
    }
    console.log(sensorsData);

    //console.log(result.data.results[0].sensors);
  } catch (error) {}
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("running");
});
