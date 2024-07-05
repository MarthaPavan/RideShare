const bookingModel = require("../models/bookingmodel");
const Route = require("../models/route.model");

class BookingController {

    async createBooking(req, res) {
        try {
            const { userDetails, routeId, date, capacity, status } = req.body;
            const parsedDate = new Date(date);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            // Find the route
            const route = await Route.findOne({ routeId: routeId });
            if (!route) {
                return res.status(404).json({ message: "Route not found" });
            }

            // Check if the route has enough capacity
            if (route.capacity < capacity) {
                return res.status(400).json({ message: "Insufficient capacity for this booking" });
            }

            // Create the booking
            const newBooking = await bookingModel.create({
                userDetails: { ...userDetails },
                route: route._id,
                date: parsedDate,
                capacity,
                status
            });

            if (newBooking) {
                // Update the route's capacity
                route.capacity -= capacity;
                await route.save();

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
                // Find the related route and update its capacity
                const route = await Route.findById(deletedBooking.route);
                if (route) {
                    route.capacity += deletedBooking.capacity;
                    await route.save();
                }

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
