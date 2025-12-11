import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/bayar", async (req, res) => {
  try {
    const { product_name, amount } = req.body;

    const response = await fetch("https://api.pakasir.com/payment/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        api_key: "rFOQPhKtqF8Xx1Pu2BhKppurO14nTAOU",
        amount: amount,
        method: "qris",
        customer_name: "Pelanggan",
        customer_email: "user@mail.com",
        order_items: [
          {
            name: product_name,
            price: amount,
            quantity: 1
          }
        ],
        callback_url: "https://example.com/callback"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
