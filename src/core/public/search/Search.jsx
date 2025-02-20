import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Search = () => {
  const [routes, setRoutes] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
  });
  const [minDate, setMinDate] = useState("");

  const navigate = useNavigate(); // Initialize navigation

  // Fetch all routes on component mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/api/route/all"); // Replace with your actual routes API endpoint
        setRoutes(response.data.data || []); // Adjust based on actual key holding the array
      } catch (error) {
        console.error("Error fetching routes:", error.message);
      }
    };

    fetchRoutes();

    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Perform API call for search
  const handleSearch = async () => {
    const { source, destination, date } = formData;

    // Validation checks
    if (!source || !destination || !date ) {
      alert("Please fill in all fields correctly!");
      return;
    }

    if (source === destination) {
      alert("Source and destination cannot be the same!");
      return;
    }

    try {
      const response = await axios.get("/api/schedule/search", {
        params: { source, destination, date },
      });

      if (response.data.success) {
        setFilteredResults(response.data.schedules || []);
      } else {
        alert("No schedules found for the selected criteria.");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error.message);
    }
  };

  const handleScheduleClick = (schedule) => {
    // Navigate to Seat Selection page with schedule data
    navigate("/seat-selection", { state: { schedule } });
  };

  return (
    <div className="md:mt-24 mt-20 md:px-7 px-4 py-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Search for Routes</h1>

      {/* Search Form */}
      <div className="bg-white w-[90%] p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <label className="block font-medium mb-2">Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Source</option>
              {[...new Set(routes.map((route) => route.source))].map((source, index) => (
                <option key={`source-${index}`} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Destination</label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Destination</option>
              {[...new Set(routes.map((route) => route.destination))].map((destination, index) => (
                <option key={`destination-${index}`} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Date</label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={minDate} // Disable past dates
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {/* Results */}
      {filteredResults.length > 0 && (
        <div className="bg-white w-[90%] p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Available Schedules</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Available Seats</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((schedule) => (
                <TableRow key={schedule._id}>
                  <TableCell>
                    {schedule.route_id.source} → {schedule.route_id.destination}
                  </TableCell>
                  <TableCell>
                    {new Date(schedule.departure_time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(schedule.arrival_time).toLocaleString()}
                  </TableCell>
                  <TableCell>Rs. {schedule.fare}</TableCell>
                  <TableCell>{schedule.available_seats}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleScheduleClick(schedule)}>Select</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredResults.length === 0 && formData.source && formData.destination && (
        <p className="text-center mt-6">No schedules found for the selected criteria.</p>
      )}
    </div>
  );
};

export default Search;