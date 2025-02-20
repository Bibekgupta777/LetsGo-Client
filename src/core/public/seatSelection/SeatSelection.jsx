import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const schedule = location.state?.schedule;

  const [seatLayout, setSeatLayout] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableSeats, setAvailableSeats] = useState(0);
  const seatPrice = schedule?.fare || 550;
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        if (!schedule?._id) {
          console.error("No valid schedule provided.");
          return;
        }

        const response = await axios.get(`/api/seats/schedule/${schedule._id}`);
        const { data } = response.data;

        // Create seat layout
        const layout = [];
        const rows = "ABCDEFGHIJ".split("");
        const cols = [1, 2, 3, 4];
        rows.forEach((row) => layout.push(cols.map((col) => `${row}${col}`)));

        setSeatLayout(layout);
        setBookedSeats(data.booked_seats);
        setAvailableSeats(data.available_seats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching seats:", error.message);
        setLoading(false);
      }
    };

    fetchSeats();
  }, [schedule]);

  const isSeatBooked = (seat) => {
    return bookedSeats.includes(seat);
  };

  const getSeatButtonStyle = (seat) => {
    if (bookedSeats.includes(seat)) {
      return "bg-red-500 text-white cursor-not-allowed opacity-70"; // Booked seats
    }
    if (selectedSeats.includes(seat)) {
      return "bg-green-500 text-white hover:bg-green-600"; // Selected seats
    }
    return "bg-gray-300 hover:bg-gray-400"; // Available seats
  };

  const toggleSeatSelection = (seat) => {
    if (isSeatBooked(seat)) return;

    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seat)) {
        return prevSelected.filter((s) => s !== seat);
      } else {
        return [...prevSelected, seat];
      }
    });
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to make a booking.");
        return;
      }

      const userId = localStorage.getItem("id");
      const payload = {
        user_id: userId,
        schedule_id: schedule._id,
        seats: selectedSeats.map((seat) => ({
          seat_number: seat,
          passenger_name: "Passenger",
        })),
      };

      const response = await axios.post("/api/booking/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setBookingStatus("Booking successful!");
        navigate("/booking-confirmation", {
          state: { booking: response.data.data },
        });
      } else {
        setBookingStatus("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking:", error.message);
      setBookingStatus("Booking failed. Please try again.");
    }
  };

  const totalPrice = selectedSeats.length * seatPrice;

  if (loading) return <div className="p-6 text-center">Loading seats...</div>;
  if (!schedule)
    return (
      <div className="p-6 text-center">Error: No schedule data available.</div>
    );

  return (
    <div className="flex flex-col md:flex-row justify-center items-start px-16 py-6 bg-gray-100">
      <div className="bg-white rounded shadow p-4 w-full md:w-2/3">
        <h2 className="text-xl font-semibold mb-4">Select Your Seat</h2>
        <div className="text-sm text-gray-600 mb-4">
          Available Seats: {availableSeats}
        </div>

        {/* Seat Legend */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 opacity-70 rounded"></div>
            <span>Booked</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {seatLayout.map((row, rowIndex) =>
            row.map((seat, seatIndex) => (
              <button
                key={`${rowIndex}-${seatIndex}`}
                onClick={() => toggleSeatSelection(seat)}
                disabled={isSeatBooked(seat)}
                className={`w-10 h-10 rounded text-sm transition-colors duration-200 ${getSeatButtonStyle(
                  seat
                )}`}
                aria-label={`Seat ${seat} ${
                  bookedSeats.includes(seat)
                    ? "Booked"
                    : selectedSeats.includes(seat)
                    ? "Selected"
                    : "Available"
                }`}
              >
                {seat}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 w-full md:w-1/3 mt-6 md:mt-0 md:ml-4">
        <h2 className="text-xl font-semibold mb-4">Selected Seats</h2>
        {selectedSeats.length > 0 ? (
          <>
            <ul className="space-y-2">
              {selectedSeats.map((seat) => (
                <li key={seat} className="flex justify-between">
                  <span>Seat {seat}</span>
                  <span>Rs. {seatPrice}</span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-4 pt-4">
              <p className="font-semibold flex justify-between">
                <span>Total Price:</span>
                <span>Rs. {totalPrice}</span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No seats selected</p>
        )}

        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-2 rounded-lg mt-4 transition-colors duration-200
            ${
              selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } 
            text-white`}
        >
          {selectedSeats.length === 0
            ? "Select seats to continue"
            : "Proceed to Payment"}
        </button>

        {bookingStatus && (
          <p
            className={`mt-4 text-center ${
              bookingStatus.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {bookingStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;