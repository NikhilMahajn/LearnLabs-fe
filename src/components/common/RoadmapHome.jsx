import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const DynamicRoadmap = ({ slug }) => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoadmap = async () => {
    try {
      const res = await api.get(`/roadmap/get-roadmap-slug/${slug}`);
      setRoadmap(res.data);
    } catch (err) {
      console.error("Failed to load roadmap", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, [slug]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading roadmap…</div>;

  if (!roadmap)
    return <div className="text-center py-10 text-gray-600">Roadmap not found.</div>;

  return (
    <div className="w-full">

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {roadmap.steps
          .sort((a, b) => a.order_index - b.order_index)
          .slice(0, 3)
          .map((step, index) => (
            <div
              key={step.id}
              className="bg-white p-8 rounded-2xl border shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Step Circle */}
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                {index + 1}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center text-sm mb-4">
                {step.description}
              </p>

              {/* Button */}
              <div className="text-center">
                <Link
                  to={`/course/${step.topic_slug}?roadmap_slug=${roadmap.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Course →
                </Link>
              </div>
            </div>
          ))}

      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <Link
          to={`/roadmap/${roadmap.slug}`}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Full Roadmap →
        </Link>
      </div>

    </div>
  );
};

export default DynamicRoadmap;
