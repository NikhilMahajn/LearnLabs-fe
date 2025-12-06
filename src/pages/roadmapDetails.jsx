import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

const RoadmapDetail = () => {
  const { slug } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRoadmap = async () => {
    try {
      const res = await api.get(`/roadmap/get-roadmap-slug/${slug}`);
      setRoadmap(res.data);
	  console.log(res.data)
    } catch (err) {
      console.error("Failed to load roadmap", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, [slug]);

  if (!roadmap) {
    return (
      <div className="text-center py-20 text-gray-600">
        Roadmap not found.
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gradient-to-b from-white to-blue-50/40">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          {roadmap.name}
        </h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
          {roadmap.description}
        </p>

        <div className="mt-4 flex justify-center">
          <span className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
            Difficulty: {roadmap.difficulty}
          </span>
        </div>

        {/* Steps Section */}
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">
          Follow this Roadmap:
        </h2>

        <div className="space-y-6">
          {roadmap.steps
            .sort((a, b) => a.order_index - b.order_index)
            .map((step, index) => (
              <div
                key={step.id}
                className="flex gap-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
              >
                {/* Step Number */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                  {index + 1}
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {step.description}
                  </p>

                  <Link
                    to={`/course/${step.topic_slug}?roadmap_slug=${roadmap.slug}`}
                    className="inline-block mt-3 text-blue-600 font-medium hover:underline"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
