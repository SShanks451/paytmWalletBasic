const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const sender_account = await Account.findOne({ userId: req.userId }).session(session);

  if (!sender_account || sender_account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const receiver_account = await Account.findOne({ userId: to }).session(session);

  if (!receiver_account) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  await session.commitTransaction();

  res.status(200).json({
    message: "Transfer successful",
  });
});

module.exports = router;
