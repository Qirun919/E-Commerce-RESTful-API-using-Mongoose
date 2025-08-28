const express = require("express");
const router = express.Router();

const { verifyPayment } = require("../controllers/payment");

/*
?billplz[id]=ea9018b2511d8429&billplz[paid]=true&billplz[paid_at]=2025-08-26+11%3A19%3A30+%2B0800&billplz[x_signature]=3166235abd67fa6f5b68e925f88c67a5d5ff4475fbbc53ea1a2d0c6bbf5a8c9f
*/

router.post("/", async (req, res) => {
  try {
    const billplz_id = req.body.billplz_id;
    const billplz_paid = req.body.billplz_paid;
    const billplz_paid_at = req.body.billplz_paid_at;
    const billplz_x_signature = req.body.billplz_x_signature;

    const updatedOrder = await verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "unable to verify payment",
    });
  }
});

module.exports = router;
