const axios = require("axios");

const Order = require("../models/order");

const getOrders = async () => {
  const orders = await Order.find().sort({ _id: -1 });
  return orders;
};

const getOrder = async (id) => {
  const order = await Order.findById(id);
  return order;
};

const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  // 1. create a new bill in billplz
  const billplzResponse = await axios.post(
    process.env.BILLPLZ_API_URL + "v3/bills",
    {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: "Payment for React eCommerce",
      name: customerName,
      email: customerEmail,
      amount: parseFloat(totalPrice) * 100, // convert to cent
      callback_url: process.env.FRONTEND_URL + "verify-payment",
      redirect_url: process.env.FRONTEND_URL + "verify-payment",
    },
    {
      auth: {
        username: process.env.BILLPLZ_API_KEY,
        password: "",
      },
    }
  );

  // 2. extract id and billplz url from the billplzResponse
  const billplz_id = billplzResponse.data.id;
  const billplz_url = billplzResponse.data.url;

  // 3. create new order in mongodb
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    billplz_id: billplz_id,
  });
  await newOrder.save();

  // 4. return the order with the billplz url
  return {
    ...newOrder,
    billplz_url: billplz_url,
  };
};

const updateOrder = async (id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
    }
  );
  return updatedOrder;
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
