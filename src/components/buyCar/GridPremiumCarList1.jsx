/* eslint-disable react/prop-types */
// import CardUi from "../../ui/CardUi";
import { useEffect, useState } from "react";
// import { PremiumCardDefault } from "../../ui/PremiumCardDefault";
import { PremiumCardDefault1 } from "../../ui/PremiumCardDefault1";

const GridPremiumCarList1 = ({ data, error, refetch }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data?.list && Array.isArray(data.list)) {
      setPosts(data.list);  
    } else if (error) {
      // console.error("Data not Found");
    }
  }, [data, error]);

  
  return (
    <div className="bg-black p-2">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 place-items-center sm:place-items-start">
        {posts?.map((items, index) => (
          <div key={index} className="flex">
            <PremiumCardDefault1
              data={items}
              Carid={items.carId}
              refetch={refetch}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridPremiumCarList1;
