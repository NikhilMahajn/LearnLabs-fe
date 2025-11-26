import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import api from "../api/axios";
import { live_url } from "../App";

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
	const fetchRoadmaps = async () => {
		const res =await api.get(`/roadmap/get-roadmaps`);
		setRoadmaps(res.data);
		console.log(res.data)
		console.log(roadmaps)
	}
	fetchRoadmaps();

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40 pt-32 pb-20">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Explore Developer <span className="text-blue-600">Roadmaps</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          AI-generated learning paths to guide you from beginner to expert.
        </p>
      </div>

      {/* Roadmap Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {roadmaps.map((roadmap) => (
          <Link
            to={`/roadmaps/${roadmap.slug}`}
            key={roadmap.id}
            className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Compass size={30} />
                </div>
                <span className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {roadmap.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {roadmap.name}
              </h3>

              <p className="text-gray-600 mt-3 line-clamp-3">
                {roadmap.description || "A structured step-by-step learning roadmap generated using AI."}
              </p>

              <button className="mt-6 w-full py-2 rounded-lg border border-blue-600 text-blue-600 font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                View Roadmap
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {roadmaps.length === 0 && (
        <p className="text-center text-gray-500 mt-20">No roadmaps found.</p>
      )}
    </div>
  );
};

export default Roadmaps;
