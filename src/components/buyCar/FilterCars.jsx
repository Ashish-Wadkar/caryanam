/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Typography } from "@material-tailwind/react";
import { FaFilter } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import {
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
} from "../../services/brandAPI";
import {
  Autocomplete,
  Checkbox,
  Box,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline"; // Import icons

// eslint-disable-next-line react/prop-types
const FilterCars = ({ setUrlState }) => {
  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceValue, setPriceValue] = useState([0, 6000000]);
  const [yearValue, setYearValue] = useState([2000, 2024]);
  const [kmValue, setKmValue] = useState([100, 1000000]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  useEffect(() => {
    if (variantData) {
      const models = [...new Set(variantData.list.map((item) => item.variant))]; // Use Set to remove duplicates
      setModelOptions(models);
    }
  }, [variantData]);

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    setSelectedBrand(brand);
    setFilterForm({
      ...filterForm,
      brand,
      model: "", // Reset model when brand changes
    });
  };

  const handleModelChange = (event, newValue) => {
    const model = newValue;
    setFilterForm({
      ...filterForm,
      model,
    });
  };

  const [filterForm, setFilterForm] = useState({
    state: "",
    area: "",
    year: "",
    brand: "",
    model: "",
    fuelType: "",
    transmission: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const minPrice = priceValue[0]; // Minimum price from the slider
    const maxPrice = priceValue[1]; // Maximum price from the slider
    const minYear = yearValue[0]; // Minimum year from the slider
    const maxYear = yearValue[1]; // Maximum year from the slider
    const minKm = kmValue[0]; // Minimum km from the slider
    const maxKm = kmValue[1]; // Maximum km from the slider
    
    const url = {
      Area: filterForm.area,
      State: filterForm.state,
      Year: filterForm.year,
      Brand: filterForm.brand.toUpperCase(),
      Model: filterForm.model,
      FuleType: filterForm.fuelType,
      Transmission: filterForm.transmission,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
      MinYear: minYear,
      MaxYear: maxYear,
      MinKm: minKm,
      MaxKm: maxKm,
    };
    setUrlState(url);
  };

  const resetForm = () => {
    setPriceValue([0, 6000000]); // Reset price slider values to default
    setYearValue([2000, 2024]); // Reset year slider values to default
    setKmValue([100, 1000000]); // Reset km slider values to default
    setSelectedBrand(""); // Reset brand selection
    setModelOptions([]); // Reset model options
    setFilterForm({
      state: "", // Reset state
      area: "", // Reset area
      year: "", // Reset year
      brand: "", // Reset brand
      model: "", // Reset model
      fuelType: "", // Reset fuel type
      transmission: "", // Reset transmission
    });

    setUrlState({
      state: "",
      area: "",
      year: "",
      brand: "",
      model: "",
      fuelType: "",
      transmission: "",
      MinPrice: 0, // Reset MinPrice
      MaxPrice: 6000000, // Reset MaxPrice
      MinYear: 2000, // Reset MinYear
      MaxYear: 2024, // Reset MaxYear
      MinKm: 100, // Reset MinKm
      MaxKm: 1000000, // Reset MaxKm
    });
  };

  let formattedAmountMin = new Intl.NumberFormat("en-IN").format(priceValue[0]);
  let formattedAmountMax = new Intl.NumberFormat("en-IN").format(priceValue[1]);

  const StateData = [
    { state: "Maharashtra" },
    { state: "Delhi" },
    { state: "Karnataka" },
    { state: "Tamil Nadu" },
    { state: "Telangana" },
    { state: "Gujarat" },
    { state: "Rajasthan" },
    { state: "Uttar Pradesh" },
    { state: "West Bengal" },
    { state: "Kerala" },
  ];

  const AreaData = [
    { area: "Viman Nagar" },
    { area: "Koregaon Park" },
    { area: "Aundh" },
    { area: "Kothrud" },
    { area: "Hadapsar" },
    { area: "Shivajinagar" },
    { area: "Kalyani Nagar" },
    { area: "Pimpri-Chinchwad" },
    { area: "Magarpatta" },
    { area: "Wadgaon Sheri" },
    { area: "Katraj" },
    { area: "Model Colony" },
    { area: "Pune Cantonment" },
    { area: "Senapati Bapat Road" },
    { area: "Bhosari" },
    { area: "Chakan" },
    { area: "Bavdhan" },
    { area: "Hinjewadi" },
    { area: "Baner" },
    { area: "Kharadi" },
    { area: "Wagholi" },
  ];

  const Year = [
    { year: 2000 },
    { year: 2001 },
    { year: 2002 },
    { year: 2003 },
    { year: 2004 },
    { year: 2005 },
    { year: 2006 },
    { year: 2007 },
    { year: 2008 },
    { year: 2009 },
    { year: 2010 },
    { year: 2011 },
    { year: 2012 },
    { year: 2013 },
    { year: 2014 },
    { year: 2015 },
    { year: 2016 },
    { year: 2017 },
    { year: 2018 },
    { year: 2019 },
    { year: 2020 },
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
  ];

  const FuleType = [
    { fuelType: "Petrol" },
    { fuelType: "Diesel" },
    { fuelType: "Electric" },
    { fuelType: "CNG" },
    { fuelType: "Petrol+CNG" },
  ];

  const Transmission = [
    { transmission: "Automatic" },
    { transmission: "Manual" },
  ];

  const handlePriceSliderChange = (event, newValue) => {
    let [min, max] = newValue;

    // Ensure the min slider value takes steps of 50000 until 1000000
    if (min < 1000000) {
      min = Math.floor(min / 50000) * 50000;
    } else {
      min = Math.floor(min / 500000) * 500000;
    }

    // Ensure the max slider value follows its logic
    if (max < 1000000) {
      max = Math.floor(max / 50000) * 50000;
    } else {
      max = Math.floor(max / 500000) * 500000;
    }

    // Apply constraints
    if (min > max) {
      min = max; // Ensure min does not exceed max
    }

    // Update state
    setPriceValue([min, max]);
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
  };

  const handleYearSliderChange = (event, newValue) => {
    setYearValue(newValue);
  };

  const handleKmSliderChange = (event, newValue) => {
    setKmValue(newValue);
  };

  const calculateStep = (value) => {
    return value < 7000000 ? 50000 : 500000;
  };

  return (
    <form onSubmit={submitHandle} className="bg-gray-10 p-1 rounded-2xl w-full mx-auto h-full sticky overflow-none">
      {/* Make/Model/Body Group */}
      <div className="mb-2 flex-1">
        <div className="text-sm font-semibold mt-3 mb-4">Filters for cars</div>
        <div className="border border-black bg-white mb-5 w-full rounded-2xl p-4 h-full">
          <div className="space-y-2 broder-black">
            <Autocomplete
              id="brand-autocomplete"
              freeSolo
              options={brands}
              getOptionLabel={(option) => option}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.brand}
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField {...params} label="Brand" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="model-autocomplete"
              freeSolo
              options={modelOptions}
              getOptionLabel={(option) => option}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.model}
              onChange={handleModelChange}
              renderInput={(params) => (
                <TextField {...params} label="Models" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="body-autocomplete"
              className="hidden"
              freeSolo
              options={[]} // TODO: Add body options if available
              getOptionLabel={(option) => option}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.body || ""}
              onChange={() => {}}
              renderInput={(params) => (
                <TextField {...params} label="Body" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
          </div>
        </div>
      </div>
      {/* Price/Year/KM Group */}
      <div className="mb-2 flex-1">
        <div className="bg-white rounded-2xl p-4 h-full w-full mb-5 border border-black">
          {/* <div className="text-sm font-semibold mb-1">Price, Year, KM</div> */}
          <div className="space-y-1">
            {/* Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-0">
                <span>Price: ₹{formattedAmountMin}&nbsp;-&nbsp;₹{formattedAmountMax}</span>
              </div>
              <Slider
                className="w-full"
                sx={{
                  '& .MuiSlider-thumb': { color: '#ff6600' },
                  '& .MuiSlider-track': { color: '#ff6600' },
                  '& .MuiSlider-rail': { color: '#ffe0b2' },
                  height: 2,
                  minHeight: 24,
                  mt: 0,
                  mb: 0,
                }}
                value={priceValue}
                onChange={handlePriceSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={6000000}
                step={calculateStep(priceValue[1])}
                disableSwap
              />
            </div>
            {/* Year Slider */}
            <div className="hidden">
              <div className="flex justify-between text-xs font-medium mb-0">
                <span>Year: {yearValue[0]}&nbsp;-&nbsp;{yearValue[1]}</span>
              </div>
              <Slider
                className="w-full"
                sx={{
                  '& .MuiSlider-thumb': { color: '#ff6600' },
                  '& .MuiSlider-track': { color: '#ff6600' },
                  '& .MuiSlider-rail': { color: '#ffe0b2' },
                  height: 2,
                  minHeight: 24,
                  mt: 0,
                  mb: 0,
                }}
                value={yearValue}
                onChange={handleYearSliderChange}
                valueLabelDisplay="auto"
                min={2000}
                max={2024}
                step={1}
                disableSwap
              />
            </div>
            {/* KM Slider */}
            <div className="hidden">
              <div className=" flex justify-between text-xs font-medium mb-1">
                <span>KM: {kmValue[0].toLocaleString()}&nbsp;-&nbsp;{kmValue[1].toLocaleString()}</span>
              </div>
              <Slider
                className="w-full"
                sx={{
                  '& .MuiSlider-thumb': { color: '#ff6600' },
                  '& .MuiSlider-track': { color: '#ff6600' },
                  '& .MuiSlider-rail': { color: '#ffe0b2' },
                  height: 2,
                  minHeight: 24,
                  mt: 0,
                  mb: 0,
                }}
                value={kmValue}
                onChange={handleKmSliderChange}
                valueLabelDisplay="auto"
                min={100}
                max={1000000}
                step={1000}
                disableSwap
              />
            </div>
          </div>
        </div>
      </div>
      {/* Location Group */}
      <div className=" mb-2 flex-1">
        <div className="bg-white rounded-xl border border-black p-4  h-full">
          
          <div className="space-y-2">
            <Autocomplete
              id="state-autocomplete"
              className="hidden"
              freeSolo
              options={StateData}
              getOptionLabel={(option) => option.state}
              sx={{  width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.state ? { state: filterForm.state } : { state: "" }}
              onChange={(event, newValue) => {
                setFilterForm((prevForm) => ({
                  ...prevForm,
                  state: newValue ? newValue.state : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="State" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="area-autocomplete"
              freeSolo
              options={AreaData}
              getOptionLabel={(option) => option.area}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.area ? { area: filterForm.area } : { area: "" }}
              onChange={(event, newValue) => {
                setFilterForm((prevForm) => ({
                  ...prevForm,
                  area: newValue ? newValue.area : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="City" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="year-autocomplete"
              freeSolo
              options={Year}
              getOptionLabel={(option) => option.year?.toString() || ""}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.year ? { year: filterForm.year } : { year: "" }}
              onChange={(event, newValue) => {
                setFilterForm((prevForm) => ({
                  ...prevForm,
                  year: newValue ? newValue.year : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Year of Manufacture" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
          </div>
        </div>
      </div>
      {/* Other Filters Group */}
      <div className="mb-2 flex-1">
        <div className="bg-white border border-black  rounded-xl p-4 h-full">
          
          <div className="space-y-2">
            <Autocomplete
              id="fueltype-autocomplete"
              freeSolo
              options={FuleType}
              getOptionLabel={(option) => option.fuelType}
              sx={{ width: "100%", background: "White", boxShadow: 'White', '& .MuiOutlinedInput-root': { boxShadow: 'White', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'White' }, m: 0 }}
              value={filterForm.fuelType ? { fuelType: filterForm.fuelType } : { fuelType: "" }}
              onChange={(event, newValue) => {
                setFilterForm((prevForm) => ({
                  ...prevForm,
                  fuelType: newValue ? newValue.fuelType : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Fuel Type" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="transmission-autocomplete"
              freeSolo
              options={Transmission}
              getOptionLabel={(option) => option.transmission}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.transmission ? { transmission: filterForm.transmission } : { transmission: "" }}
              onChange={(event, newValue) => {
                setFilterForm((prevForm) => ({
                  ...prevForm,
                  transmission: newValue ? newValue.transmission : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Transmission" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="bodytype-autocomplete"
              className="hidden"
              freeSolo
              options={[]} // TODO: Add body type options
              getOptionLabel={(option) => option}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.bodyType || ""}
              onChange={() => {}}
              renderInput={(params) => (
                <TextField {...params} label="Body Type / Car Type" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
            <Autocomplete
              id="ownership-autocomplete"
              className="hidden"
              freeSolo
              options={[]} // TODO: Add ownership options
              getOptionLabel={(option) => option}
              sx={{ width: "100%", background: "White", boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }}
              value={filterForm.ownership || ""}
              onChange={() => {}}
              renderInput={(params) => (
                <TextField {...params} label="Ownership" size="small" sx={{ boxShadow: 'none', '& .MuiOutlinedInput-root': { boxShadow: 'none', minHeight: 36, fontSize: 14, padding: '0 8px' }, '& fieldset': { boxShadow: 'none' }, m: 0 }} />
              )}
            />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-2">
        <Button type="submit" className="w-full bg-orange-500 text-white rounded-lg py-2 font-semibold">Search</Button>
        <Button type="button" onClick={resetForm} className="w-full bg-gray-200 text-gray-700 rounded-lg py-2 font-semibold">Reset</Button>
      </div>
    </form>
  );
};

export default FilterCars;
