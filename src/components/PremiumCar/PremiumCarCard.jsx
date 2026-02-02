
import PropTypes from 'prop-types';

const PremiumCarCard = ({
  carPhoto,
  profilePic,
  carType,
  carModel,
  price,
  ownerName,
  mileage,
  fuelType,
  transmission,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={carPhoto} alt="Car" className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex items-center mb-2">
          <img src={profilePic} alt="Owner" className="w-8 h-8 rounded-full mr-2" />
          <h3 className="text-sm font-semibold text-gray-800">{ownerName}</h3>
        </div>

        <h2 className="text-lg font-bold text-black mb-1">{carModel}</h2>
        <p className="text-sm text-gray-600 mb-2">{carType}</p>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <p><strong>Price:</strong> ₹{price}</p>
          <p><strong>Mileage:</strong> {mileage}</p>
          <p><strong>Fuel:</strong> {fuelType}</p>
          <p><strong>Transmission:</strong> {transmission}</p>
        </div>
      </div>
    </div>
  );
};

// ✅ PropTypes validation
PremiumCarCard.propTypes = {
  carPhoto: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  carType: PropTypes.string.isRequired,
  carModel: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  mileage: PropTypes.string.isRequired,
  fuelType: PropTypes.string.isRequired,
  transmission: PropTypes.string.isRequired,
};

export default PremiumCarCard;
