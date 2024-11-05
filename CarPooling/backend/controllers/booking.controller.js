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
    async getBookingStats(req, res) {
        try {
            const { emailId, startDate, endDate } = req.query;
            
            // Create date range filter
            const dateFilter = {
                date: {
                    $gte: new Date(startDate || new Date().setMonth(new Date().getMonth() - 1)),
                    $lte: new Date(endDate || new Date())
                }
            };
    
            // Add user filter if provided
            if (emailId) {
                dateFilter['userDetails.emailId'] = emailId;
            }
    
            // Get bookings grouped by date
            const bookings = await bookingModel.aggregate([
                { $match: dateFilter },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$date" }
                        },
                        count: { $sum: 1 },
                        totalCapacity: { $sum: "$capacity" }
                    }
                },
                { $sort: { "_id": 1 } }
            ]);
    
            // Get weekly stats
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
    
            const weeklyStats = await bookingModel.aggregate([
                {
                    $match: {
                        date: { $gte: weekAgo },
                        ...emailId ? { 'userDetails.emailId': emailId } : {}
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRides: { $sum: 1 },
                        totalCapacity: { $sum: "$capacity" }
                    }
                }
            ]);
    
            // Generate complete date range for last 30 days
            const dateLabels = [];
            const rideData = [];
            const capacityData = [];
            
            const today = new Date();
            const thirtyDaysAgo = new Date(today.setMonth(today.getMonth() - 1));
            
            for (let d = new Date(thirtyDaysAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                const booking = bookings.find(b => b._id === dateStr);
                
                dateLabels.push(new Date(dateStr).toLocaleDateString('default', { month: 'short', day: 'numeric' }));
                rideData.push(booking ? booking.count : 0);
                capacityData.push(booking ? booking.totalCapacity : 0);
            }
    
            res.json({
                success: true,
                data: {
                    labels: dateLabels,
                    datasets: [
                        {
                            label: 'No. of rides',
                            data: rideData,
                            fill: true,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            tension: 0.4,
                        },
                        {
                            label: 'Total Capacity',
                            data: capacityData,
                            fill: true,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            tension: 0.4,
                        }
                    ],
                    weeklyStats: weeklyStats[0] || { totalRides: 0, totalCapacity: 0 }
                }
            });
        } catch (error) {
            console.error('Error fetching booking stats:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching booking statistics',
                error: error.message
            });
        }
    }
    
}

module.exports = new BookingController();
