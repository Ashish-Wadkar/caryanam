/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Typography } from "@material-tailwind/react";
import { FaFilter } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import {
  useGetOnlyPremiumBrandsQuery,
  useGetPremiumVariantsQuery,
} from "../../services/premiumBrandApi";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const FilterPremiumCars1 = ({ setUrlState, setSearchClicked }) => {
  const { data: brandData } =  useGetOnlyPremiumBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [value, setValue] = useState([1500000, 100000000]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [underTwoLakh, setUnderTwoLakh] = useState(false); // New state for the checkbox
  const [twoLakhFiveLakh, setTwoLakhFiveLakh] = useState(false); // New state for the checkbox
  const [fiveToEightLakh, setFiveToEightLakh] = useState(false); // New state for the checkbox  
  const [eightToTenLakh, setEightToTenLakh] = useState(false); // New state for the checkbox
  const [aboveTenLakh, setAboveTenLakh] = useState(false); // New state for the checkbox

  const { data: variantData } = useGetPremiumVariantsQuery(selectedBrand, {
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
    area: "",
    year: "",
    brand: "",
    model: "",
    fuelType: "",
    transmission: "",
    ownership: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const minPrice = value[0]; // Minimum price from the slider
    const maxPrice = value[1]; // Maximum price from the slider
    const url = {
      Area: filterForm.area,
      Year: filterForm.year,
      Brand: filterForm.brand.toUpperCase(),
      Model: filterForm.model,
      FuelType: filterForm.fuelType,
      Transmission: filterForm.transmission,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
    };
    setUrlState(url);
    setSearchClicked(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setValue([1500000, 100000000]); // Reset slider values to default
    setSelectedBrand(""); // Reset brand selection
    setModelOptions([]); // Reset model options
    setFilterForm({
      area: "", // Reset area
      year: "", // Reset year
      brand: "", // Reset brand
      model: "", // Reset model
      fuelType: "", // Reset fuel type
      transmission: "", // Reset transmission
    });
    setUnderTwoLakh(false); // Reset the checkbox
    setTwoLakhFiveLakh(false);
    setFiveToEightLakh(false);
    setEightToTenLakh(false);
    setAboveTenLakh(false);

    setUrlState({
      area: "",
      year: "",
      brand: "",
      model: "",
      fuelType: "",
      transmission: "",
      MinPrice: 1500000, // Reset MinPrice
      MaxPrice: 100000000, // Reset MaxPrice
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let formattedAmountMin = new Intl.NumberFormat("en-IN").format(value[0]);
  let formattedAmountMax = new Intl.NumberFormat("en-IN").format(value[1]);

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

  const handleSliderChange = (event, newValue) => {
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
    setValue([min, max]);
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
  };
  const calculateStep = (value) => {
    return value < 7000000 ? 50000 : 500000;
  };

  const handleMinPriceChange = (e) => {
    const min = parseInt(e.target.value.replace(/,/g, ""));
    if (
      !isNaN(min) &&
      min >= 0 &&
      (maxPrice === "" || min <= parseInt(maxPrice.replace(/,/g, "")))
    ) {
      setMinPrice(e.target.value);
      setValue([min, value[1] !== null ? value[1] : 100000000]);
    } else if (min > parseInt(maxPrice.replace(/,/g, ""))) {
      setMinPrice(maxPrice);
      setValue([
        parseInt(maxPrice.replace(/,/g, "")),
        parseInt(maxPrice.replace(/,/g, "")),
      ]);
    } else {
      setMinPrice("");
    }
  };

  // Handle manual input for max price
  const handleMaxPriceChange = (e) => {
    const max = parseInt(e.target.value.replace(/,/g, ""));
    if (
      !isNaN(max) &&
      max <= 100000000 &&
      (minPrice === "" || max >= parseInt(minPrice.replace(/,/g, "")))
    ) {
      setMaxPrice(e.target.value);
      setValue([value[0] !== null ? value[0] : 0, max]);
    } else if (max < parseInt(minPrice.replace(/,/g, ""))) {
      setMaxPrice(minPrice);
      setValue([
        parseInt(minPrice.replace(/,/g, "")),
        parseInt(minPrice.replace(/,/g, "")),
      ]);
    } else {
      setMaxPrice("");
    }
  };

  return (
    <div className="  shadow-lg rounded-lg w-full ">
      <Card className={`p-4 ${showFilters ? "block" : "hidden bg-gray-100"}`}>
        <div className="space-y-4">
          <form onSubmit={submitHandle}>
            <div>
              <p className="font-bold mb-5 text-xl text-orange-400">Filters</p>
            </div>
            <div className="md:mb-1 md:grid md:grid-cols-4 md:gap-6  md:items-center">
              <div className="items-center justify-center">
                <Autocomplete
                  id="area-autocomplete"
                  className="my-1"
                  freeSolo
                  options={AreaData}
                  getOptionLabel={(option) => option.area}
                  sx={{ width: "100%", background: "White" }}
                  value={
                    filterForm.area ? { area: filterForm.area } : { area: "" }
                  }
                  onInputChange={(event, newInputValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      area: newInputValue,
                    }));
                  }}
                  onChange={(event, newValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      area: newValue ? newValue.area : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Area" />
                  )}
                />

                <Autocomplete
                  id="year-autocomplete"
                  className="my-1"
                  freeSolo
                  options={Year}
                  getOptionLabel={(option) => option.year.toString()}
                  sx={{ width: "Full", background: "White" }}
                  value={
                    filterForm.year ? { year: filterForm.year } : { year: "" }
                  } // Bind to state
                  onInputChange={(event, newInputValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      year: newInputValue,
                    }));
                  }}
                  onChange={(event, newValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      year: newValue ? newValue.year : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Year" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  id="brand-autocomplete"
                  className="my-1"
                  freeSolo
                  options={brands}
                  getOptionLabel={(option) => option}
                  sx={{ width: "Full", background: "White" }}
                  value={filterForm.brand}
                  onChange={handleBrandChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Brands" />
                  )}
                />

                <Autocomplete
                  id="model-autocomplete"
                  className="my-1"
                  freeSolo
                  options={modelOptions}
                  getOptionLabel={(option) => option}
                  sx={{ width: "Full", background: "White" }}
                  value={filterForm.model}
                  onChange={handleModelChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Models" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  id="fueltype-autocomplete"
                  className="my-1"
                  freeSolo
                  options={FuleType}
                  getOptionLabel={(option) => option.fuelType}
                  sx={{ width: "Full", background: "White" }}
                  value={
                    filterForm.fuelType
                      ? { fuelType: filterForm.fuelType }
                      : { fuelType: "" }
                  } // Bind to state
                  onInputChange={(event, newInputValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      fuelType: newInputValue,
                    }));
                  }}
                  onChange={(event, newValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      fuelType: newValue ? newValue.fuelType : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Fuel Type" />
                  )}
                />

                <Autocomplete
                  id="transmission-autocomplete"
                  className="my-1"
                  freeSolo
                  options={Transmission}
                  getOptionLabel={(option) => option.transmission}
                  sx={{ width: "Full", background: "White" }}
                  value={
                    filterForm.transmission
                      ? { transmission: filterForm.transmission }
                      : { transmission: "" }
                  } // Bind to state
                  onInputChange={(event, newInputValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      transmission: newInputValue,
                    }));
                  }}
                  onChange={(event, newValue) => {
                    setFilterForm((prevForm) => ({
                      ...prevForm,
                      transmission: newValue ? newValue.transmission : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Transmission" />
                  )}
                />
              </div>
              <div className="flex gap-5 md:flex-col lg:flex">
                <Button type="submit" className="bg-orange-400">
                  Search
                </Button>
                <Button onClick={resetForm} className="bg-orange-400">
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default FilterPremiumCars1;
