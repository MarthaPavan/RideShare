const bookingModel = require("../models/bookingmodel")

class BookingController{
    
    async createBooking(req,res){
            try {
              const { userDetails, pickupLocation, dropLocation, date, seats, driverDetails, status } = req.body;
              // Parse date to a JavaScript Date object
              const parsedDate = new Date(date);
              if (isNaN(parsedDate)) {
                return res.status(400).json({ message: "Invalid date format" });
              }
          
              // Generate a unique booking ID using the count (for demonstration purposes)
              const count = await bookingModel.countDocuments();
          
              // Create a new booking document
              const newBooking = await bookingModel.create({
                bookingId: count + 1,
                userDetails: { ...userDetails },
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                date: parsedDate,
                seats: seats,
                driverDetails: { ...driverDetails },
                status: status
              });
              if (newBooking) {
                return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
              } else {
                return res.status(400).json({ message: "Failed to create booking" });
              }
            } catch (error) {
              return res.status(500).json({ message: error.message });
            }
          }
    }
module.exports = new BookingController();