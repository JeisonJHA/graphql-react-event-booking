const Event = require("../../models/event");
const Booking = require("../../models/Booking");
const { transformEvents, transformBooking } = require("./merge");

module.exports = {
  bookings: async () => {
    try {
      const bookings = Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetechedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5c6ab001461f7a38ecde9167",
      event: fetechedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvents(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
