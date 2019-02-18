const Event = require("../../models/event");
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
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5c6ab001461f7a38ecde9167"
    });
    try {
      const result = await event.save();
      createdEvent = transformEvents(result);
      const creator = await User.findById("5c6ab001461f7a38ecde9167");

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
