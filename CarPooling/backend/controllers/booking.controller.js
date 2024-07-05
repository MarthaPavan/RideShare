const bookingModel = require("../models/bookingmodel");
const Route = require("../models/route.model")
class BookingController {

    async createBooking(req, res) {
        try {
            const { userDetails, pickUpLocation, dropLocation, date,capacity, driverDetails, status } = req.body;
            const parsedDate = new Date(date);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            const newBooking = await bookingModel.create({
                userDetails: { ...userDetails },
                pickUpLocation,
                dropLocation,
                date: parsedDate,
                capacity,
                driverDetails: { ...driverDetails },
                status
            });

            if (newBooking) {
                const route = await Route.findAndUpdateOne({})
                return res.status(201).json({ message: "Booking made successfully", booking: newBooking });
            
            } else {
                return res.status(400).json({ message: "Failed to create booking" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const deletedBooking = await bookingModel.findOneAndDelete({ bookingId });

            if (deletedBooking) {
                return res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
            } else {
                return res.status(404).json({ message: "Booking not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BookingController();
