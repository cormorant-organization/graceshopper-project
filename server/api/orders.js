/*
If logged in: request non-closed order, if it exists and has sessions: fill frontend cart
If adding to cart: request non-closed order, if exists, Order.addSession(), Session.setPuppy(puppyId); if does not exist, User.addOrder(), Order.addSession(), Session.setPuppy(puppyId)
If clearing cart: Order.getSessions(), Sessions.destroy(), Order.removeSessions()
If removing one type of product: Order.getSession(), Session.destroy(), Order.removeSession()
If decrementing: Order.getSessions(by id), Sessions.pop.destory(), Order.removeSession()
If incrementing: Order.addSession(), Session.setPuppy(puppyId)
If checking-out: Order.closed = true
*/
