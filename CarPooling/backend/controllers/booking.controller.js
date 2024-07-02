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

              // Create a new booking document
              const newBooking = await bookingModel.create({
                userDetails: { ...userDetails },
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                date: parsedDate,
                seats: seats,
                driverDetails: { ...driverDetails },
                status: status
              });
              if (newBooking) {
                return res.status(201).json({ message: "Request  created successfully", booking: newBooking });
              } else {
                return res.status(400).json({ message: "Failed to create booking" });
              }
            } catch (error) {
              return res.status(500).json({ message: error.message });
            }
          }
    // async fetchBooking(req,res){
    //     try {
    //         const { date, status } = req.query;
    //         let query = {};
    //         if (date) {
    //           const parsedDate = new Date(date);
    //           query.date = parsedDate;
    //         }
    //         if (status) {
    //           query.status = status;
    //         }
    //         const bookings = await bookingModel.find(query);
    //         if (bookings.length === 0) {
    //           return res.status(404).json({ message: "No bookings found" });
    //         }
    //         return res.status(200).json(bookings);
    //       } catch (error) {
    //         return res.status(500).json({ message: error.message });
    //       }
    // }
}
module.exports = new BookingController();