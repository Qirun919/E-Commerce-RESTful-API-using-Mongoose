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
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
  });
  await newOrder.save();
  return newOrder;
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
