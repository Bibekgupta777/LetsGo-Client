import Navbar from "@/components/Navbar";
import axios from "axios";
import { ArrowRight, Bus, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("/api/route/all");
        setDestinations(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-800/90" />
            <div className="relative h-[300px] flex items-center justify-center text-center text-white p-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Popular Destinations
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Discover amazing places to travel with comfort and convenience
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {["all", "popular", "new", "weekend"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedFilter === filter
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} Routes
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Destination Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Popular Route</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">
                    {destination.source} → {destination.destination}
                  </h3>

                  <div className="space-y-2 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Daily departures available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bus className="w-4 h-4" />
                      <span>Multiple bus types</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/search", {
                        state: {
                          source: destination.source,
                          destination: destination.destination,
                        },
                      })
                    }
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    View Schedules
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Destinations;