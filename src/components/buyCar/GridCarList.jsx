import { CardDefault } from "../../ui/CardDefault";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const GridCarList = ({ data, error, refetch, isLoading }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data?.list && Array.isArray(data.list)) {
      console.log("Setting cars in GridCarList component:", data.list);
      setPosts(data.list);
    }
  }, [data]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500 font-bold mb-2">Something went wrong. Please try again later.</p>
          <button 
            onClick={() => refetch()} 
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!posts.length) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 font-bold mb-2">No cars available to display.</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters or check back later.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 mb-5">
        {posts.map((items) => (
          <CardDefault key={items.carId} data={items} Carid={items.carId} refetch={refetch} isLoading={isLoading}/>
        ))}
      </div>
    );
  };

  return <>{renderContent()}</>;
};

// PropTypes validation
GridCarList.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.array.isRequired,
  }).isRequired,
  error: PropTypes.object,
  refetch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default GridCarList;
