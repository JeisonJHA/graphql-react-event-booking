const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvents } = require("./merge");

module.exports = {
  events: async () => {
    const events = await Event.find();
    try {
      return events.map(event => {
        return transformEvents(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw Error("Unauthenticated!");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });
    try {
      const result = await event.save();
      createdEvent = transformEvents(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw Error("User not found.");
      }
      creator.createEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
