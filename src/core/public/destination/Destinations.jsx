import Navbar from "@/components/Navbar";
import axios from "axios";
import { ArrowRight, Bus, Calendar, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const routeData = {
  popular: {
    title: "Popular Routes",
    message: "These routes are highly rated by travelers for their comfort and convenience.",
    image: "/popular/title.jpg",
    images: [
      { src: "/popular/1602412856.sidetrackimagephotohraphy.jpg", text: "Mountains" },
      { src: "/popular/image_[.jpg", text: "Bhaktapur" },
      { src: "/popular/lumbini-of-nepal.png", text: "Lumbini" },
      { src: "/popular/Pashupatinath_Temple-2020.jpg", text: "Pashupatinath" },
      { src: "/popular/pokhara.jpg", text: "Pokhara" },
      { src: "/popular/Swayambhunath.jpg", text: "Swayambhunath" },
    ],
  },
  new: {
    title: "New Routes",
    message: "Explore our latest routes with great deals and exciting destinations.",
    image: "/neww/butwal.jpg",
    images: [
      { src: "/neww/dharan.png", text: "Birgunj-Dharan" },
      { src: "/neww/janakpur.jpeg", text: "Kathmandu-Janakpur" },
      { src: "/neww/Kathmandu-Bandipur.jpg", text: "Kathmandu-Bandipur" },
      { src: "/neww/Kathmandu-to-Ilam.jpg", text: "Birgunj-Ilam" },
      { src: "/neww/Pathibhara-Devi-Temple.jpeg", text: "Kathmandu-Pathibhara temple" },
      { src: "/neww/butwal.jpg", text: "Pokhara-Butwal" },
    ],
  },
  weekend: {
    title: "Weekend Routes",
    message: "Perfect for a short getaway—relax and enjoy a stress-free ride.",
    image: "/Logo/manaslu.jpg",
    images: [
      { src: "/Logo/annapurna-circuit-trek.jpg", text: "Annupurna Trek" },
      { src: "/Logo/everest-high-pass-trek.jpg", text: "MT Everest Trek" },
      { src: "/Logo/gokyo-lake-and-renjo.jpg", text: "Gokyo Lake" },
      { src: "/Logo/mardi-himal-trek.jpg", text: "Mardi Himal Trek" },
      { src: "/Logo/up-mustang Trek.jpg", text: "Mustang Trek" },
      { src: "/Logo/kanchenjunga-trek.jpg", text: "Kanchenjunga Trek" },
    ],
  },
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("popular");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("/api/route/all");
        setDestinations(response.data.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section with Background Image */}
        <div
          className="relative rounded-2xl mb-12 h-[350px] flex items-center justify-center text-white text-center p-8"
          style={{
            backgroundImage: `url(${routeData[selectedFilter].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 absolute inset-0 rounded-2xl"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {routeData[selectedFilter].title}
            </h1>
            <p className="text-lg md:text-xl">{routeData[selectedFilter].message}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {Object.keys(routeData).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {routeData[filter].title}
            </button>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {routeData[selectedFilter].images.map((img, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full h-[300px] group cursor-pointer"
              onClick={() => openImage(img)}
            >
              <img
                src={img.src}
                alt={img.text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-semibold">{img.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={closeImage}
          >
            <div className="relative max-w-4xl w-full p-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.text}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  closeImage();
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">
                    {routeData[selectedFilter].title}
                  </span>
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
  );
};

export default Destinations;
