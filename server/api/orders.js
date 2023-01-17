/*
If logged in: request non-closed order, if it exists and has sessions: fill frontend cart
If adding to cart: request non-closed order, if exists, Order.addSession(), Session.setPuppy(puppyId); if does not exist, User.addOrder(), Order.addSession(), Session.setPuppy(puppyId)
If clearing cart: Order.getSessions(), Sessions.destroy(), Order.removeSessions()
If removing one type of product: Order.getSession(), Session.destroy(), Order.removeSession()
If decrementing: Order.getSessions(by id), Sessions.pop.destory(), Order.removeSession()
If incrementing: Order.addSession(), Session.setPuppy(puppyId)
If checking-out: Order.closed = true
*/

const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
const Session = require("../db/models/Session");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.id, closed: false },
    });
    if (!order) {
      res.json(order);
    } else {
      const sessions = await order.getSessions();
      const puppies = await Promise.all(
        sessions.map(async (session) => {
          return await session.getPuppy();
        })
      );
      res.json(puppies);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  console.log("this is the start of the post API");
  try {
    let order = await Order.findOne({
      where: { userId: req.params.id, closed: false },
    });
    if (!order) order = await Order.create({ userId: req.params.id });
    console.log("this is the order from the API", order);
    const session = await order.createSession();
    console.log("this is the session from the API before setting", session);
    await session.setPuppy(req.body.puppyId);
    console.log("this is the session from the API after setting", session);
    await order.addSession(session.id);
    const puppy = await session.getPuppy();
    res.json(puppy);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: { userId: req.params.id, closed: false },
    });
    await order.update({ closed: true });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/clearCart", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: { userId: req.params.id, closed: false },
    });
    await Session.destroy({ where: { orderId: order.id } });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/removeProduct", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: { userId: req.params.id, closed: false },
    });
    await Session.destroy({
      where: { orderId: order.id, puppyId: req.body },
    });
    res.json(Number(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/decrementProduct", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: { userId: req.params.id, closed: false },
    });
    const session = await Session.findOne({
      where: { orderId: order.id, puppyId: req.body },
    });
    await session.destroy();
    res.json(session);
  } catch (err) {
    next(err);
  }
});
