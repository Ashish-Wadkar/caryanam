// import bmw from "/carslogo/bmw.png";
// import honda from "/carslogo/honda.png";
// import kia from "/carslogo/kia.png";
// import mahindra from "/carslogo/mahindra.png";
// import mercedes from "/carslogo/mercedes.png";
// import suzuki from "/carslogo/suzuki.png";
// import tata from "/carslogo/tata (1).png";
// import volkswagen from "/carslogo/volkswagen.png";
// import volvo from "/carslogo/volvo.png";
// import Marquee from "react-fast-marquee";
// const BrandList = () => {
//   return (
//     <div className="container mx-auto">
//       <ul>
//         <Marquee className="-mt-5 md:mt-8"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "10px",
//            // marginTop: "2rem",
//           }}
//           autoFill
//         >
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="bmw" src={bmw} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="honda" src={honda} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="kia" src={kia} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="mahindra" src={mahindra} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="mercedes" src={mercedes} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="suzuki" src={suzuki} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="tata" src={tata} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="volkswagen" src={volkswagen} className="w-[4rem] md:w-[5rem]" />
//           </li>
//           <li style={{ margin: "0 25px" }}>
//             {" "}
//             <img alt="volvo" src={volvo} className="w-[4rem] md:w-[5rem]" />
//           </li>
//         </Marquee>
//       </ul>
//     </div>
//   );
// };

// export default BrandList;




// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import bmw from "/carslogo/bmw.png";
// import honda from "/carslogo/honda.png";
// import kia from "/carslogo/kia.png";
// import mahindra from "/carslogo/mahindra.png";
// import mercedes from "/carslogo/mercedes.png";
// import suzuki from "/carslogo/suzuki.png";
// import tata from "/carslogo/tata (1).png";
// import volkswagen from "/carslogo/volkswagen.png";
// import volvo from "/carslogo/volvo.png";

// const BrandList = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="container mx-auto">
//       <Slider {...settings}>
//         <div>
//           <img alt="bmw" src={bmw} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="honda" src={honda} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="kia" src={kia} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="mahindra" src={mahindra} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="mercedes" src={mercedes} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="suzuki" src={suzuki} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="tata" src={tata} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="volkswagen" src={volkswagen} className="w-[4rem] md:w-[5rem]" />
//         </div>
//         <div>
//           <img alt="volvo" src={volvo} className="w-[4rem] md:w-[5rem]" />
//         </div>
//       </Slider>
//     </div>
//   );
// };













// import  { useState } from 'react';
// import {  Card, CardMedia, Grid, IconButton } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// // Import your images
// import bmw from "/carslogo/bmw.png";
// import honda from "/carslogo/honda.png";
// import kia from "/carslogo/kia.png";
// import mahindra from "/carslogo/mahindra.png";
// import mercedes from "/carslogo/mercedes.png";
// import suzuki from "/carslogo/suzuki.png";
// import tata from "/carslogo/tata (1).png";
// import volkswagen from "/carslogo/volkswagen.png";
// import volvo from "/carslogo/volvo.png";

// const brands = [
//   { id: 1, img: bmw, alt: "BMW" },
//   { id: 2, img: honda, alt: "Honda" },
//   { id: 3, img: kia, alt: "Kia" },
//   { id: 4, img: mahindra, alt: "Mahindra" },
//   { id: 5, img: mercedes, alt: "Mercedes" },
//   { id: 6, img: suzuki, alt: "Suzuki" },
//   { id: 7, img: tata, alt: "Tata" },
//   { id: 8, img: volkswagen, alt: "Volkswagen" },
//   { id: 9, img: volvo, alt: "Volvo" },
// ];

// const BrandList = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsToShow = 4; // Number of items to show at once

//   const nextBrands = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % brands.length);
//   };

//   const prevBrands = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - itemsToShow + brands.length) % brands.length);
//   };

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 20px' }}>
//       <IconButton onClick={prevBrands} color="primary">
//         <ArrowBackIcon />
//       </IconButton>
      
//       <Grid container spacing={2} style={{ flexGrow: 1 }}>
//         {brands.slice(currentIndex, currentIndex + itemsToShow).map((brand) => (
//           <Grid item xs={3} key={brand.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 alt={brand.alt}
//                 image={brand.img}
//                 style={{ width: '100%', height: '80px', objectFit: 'contain' }} // Adjust height and fit
//               />
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
      
//       <IconButton onClick={nextBrands} color="primary">
//         <ArrowForwardIcon />
//       </IconButton>
//     </div>
//   );
// };

// export default BrandList;






// import { Card, CardMedia, Grid,Typography } from '@mui/material';

// // Import your images
// import bmw from "/carslogo/bmw.png";
// import honda from "/carslogo/honda.png";
// import kia from "/carslogo/kia.png";
// import mahindra from "/carslogo/mahindra.png";
// import mercedes from "/carslogo/mercedes.png";
// import suzuki from "/carslogo/suzuki.png";
// import tata from "/carslogo/tata (1).png";
// import volkswagen from "/carslogo/volkswagen.png";
// import volvo from "/carlogo/volvo.png";

// import audi from "/carlogo/audi.png";
// import landrover from "/carlogo/landrover.jpg";
// import jaguar from "/carlogo/Jaguar.png";


// const brands = [
//   { id: 1, img: bmw, alt: "BMW" },
//   { id: 2, img: honda, alt: "Honda" },
//   { id: 3, img: kia, alt: "Kia" },
//   { id: 4, img: mahindra, alt: "Mahindra" },
//   { id: 5, img: mercedes, alt: "Mercedes" },
//   { id: 6, img: suzuki, alt: "Suzuki" },
//   { id: 7, img: tata, alt: "Tata" },
//   { id: 8, img: volkswagen, alt: "Volkswagen" },
//   { id: 9, img: volvo, alt: "Volvo" },
//   { id: 10, img: audi, alt: "audi" },
//   { id: 11, img: landrover, alt: "landrover" },
//   { id: 12, img: jaguar, alt: "jaguar" },
// ];

// const BrandList = () => {
//   return (
    
//     <Grid container spacing={2} style={{ padding: '20px' }}>
//       {brands.map((brand) => (
//         <Grid item xs={12} sm={4} md={3} lg={3} key={brand.id}> {/* Adjust xs value to control how many images per row */}
//           <Card sx={{
//                 width: '250px',
//                 height: '100px',
//                 objectFit: 'cover',
               

//               }}>
//             <CardMedia
//               component="img"
//               alt={brand.alt}
//               image={brand.img}
//               sx={{
//                 width: '100%',
//                 height: '80px',
//                 objectFit: 'contain',
//                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add box shadow here,
               

//               }}
//             />
//             {/* <span> {brand.alt}</span> */}
//             <Typography
//   variant="body2"
//   align="center"
//   style={{
//     padding: '4px',
//     fontFamily: 'Roboto, sans-serif', // Use Roboto font
//     color: '#000', // Set text color to black
//     textTransform: 'uppercase', // Optional: make the text uppercase
//     textShadow: 'none', // Ensure no text shadow is applied
//   }}
// >
//   {brand.alt}
// </Typography>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default BrandList;

import { Grid, Typography } from '@mui/material';

// Import your images
import bmw from "/carslogo/bmw.png";
import honda from "/carslogo/honda.png";
import kia from "/carslogo/kia.png";
import mahindra from "/carslogo/mahindra.png";
import mercedes from "/carslogo/mercedes.png";
import suzuki from "/carslogo/suzuki.png";
import tata from "/carslogo/tata (1).png";
import volkswagen from "/carslogo/volkswagen.png";
import volvo from "/carlogo/volvo.png";
import audi from "/carlogo/audi.png";
import landrover from "/carlogo/landrover.jpg";
import jaguar from "/carlogo/Jaguar.png";

const brands = [
  { id: 1, img: bmw, alt: "BMW" },
  { id: 2, img: honda, alt: "Honda" },
  { id: 3, img: kia, alt: "Kia" },
  { id: 4, img: mahindra, alt: "Mahindra" },
  { id: 5, img: mercedes, alt: "Mercedes" },
  { id: 6, img: suzuki, alt: "Suzuki" },
  { id: 7, img: tata, alt: "Tata" },
  { id: 8, img: volkswagen, alt: "Volkswagen" },
  { id: 9, img: volvo, alt: "Volvo" },
  { id: 10, img: audi, alt: "Audi" },
  { id: 11, img: landrover, alt: "Land Rover" },
  { id: 12, img: jaguar, alt: "Jaguar" },
];

const BrandList = () => {
  return (
    <Grid container spacing={2} style={{ padding: '10px' }}> {/* Reduced padding */}
      {brands.map((brand) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={brand.id}> {/* Adjusted xs and sm values for smaller sizes */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px', // Reduced padding
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Reduced box shadow
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}>
            <img
              src={brand.img}
              alt={brand.alt}
              style={{
                width: '20%', // Set width to 80% for smaller size
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="body2"
              align="center"
              style={{
                padding: '2px', // Reduced padding
                fontFamily: 'Roboto, sans-serif',
                color: '#000',
                textTransform: 'uppercase',
                textShadow: 'none',
                fontSize: '0.8rem', // Reduced font size
              }}
            >
              {brand.alt}
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default BrandList;