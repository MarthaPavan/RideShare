const bookingModel = require("../models/bookingmodel");
// Importing the Route model
const  {Route}  = require("../models/route.model");


class BookingController {
    async createBooking(req, res) {
        try {
            const { userDetails, routeId, date, capacity } = req.body;
            const parsedDate = new Date(date);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ message: "Invalid date format" });
            }
            console.log(capacity);
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
                routeDetails: route,
                date: parsedDate,
                capacity
            });
            
            if (newBooking) {
                // Update the route's capacity
                route.capacity -= capacity;
                route.notify=true;
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
            const deletedBooking = await bookingModel.findOneAndDelete({ _id:bookingId });

            if (deletedBooking) {
                // Find the related route and update its capacity
                const route = await Route.findById(deletedBooking.route);
                if (route) {
                    route.capacity += deletedBooking.capacity;
                    if(route.capacity===4)
                        route.notify=false;
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

    async getBooking(req, res) {
        try {
            const response = await bookingModel.find();
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getBookingById(req, res) {
        try {
            const { emailId } = req.params;
            const response = await bookingModel.find({ "userDetails.emailId": emailId });
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async getBookingUser(req, res) {
        try {
            const { routeId } = req.query;
            const response = await bookingModel.find({
                "route": routeId
            });
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    
}

module.exports = new BookingController();
