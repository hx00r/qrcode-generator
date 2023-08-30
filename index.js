const express = require("express");
const QRCode = require("qrcode");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    msg: "Welcome to qrcode-generator",
  });
});

app.post("/qrcode", async (req, res) => {
  var error = [];
  if (!req.body.text) {
    error.push("Text was not specified");
  }
  if (error.length) {
    res.status(400).json({
      error: error,
    });
    return;
  }
  const qrcode_url = await QRCode.toDataURL(req.body.text, {
    errorCorrectionLevel: "H",
    type: "image/png",
  });
  res.status(200).json({
    qrcode: qrcode_url,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
