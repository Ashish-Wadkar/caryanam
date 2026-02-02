import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import carKeyIcon from "../../assets/Group 16.png";
import carKeyIcon1 from "../../assets/Group 17.png";
import carKeyIcon2 from "../../assets/Group 18.png";
import carKeyIcon3 from "../../assets/Group 19.png";

const stats = [
  {
    icon: <img src={carKeyIcon} alt="Car Icon" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" />,
    number: 500,
    label: "Available Cars",
  },
  {
    icon: <img src={carKeyIcon1} alt="Car Icon" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" />,
    number: 900,
    label: "Happy Clients",
  },
  {
    icon: <img src={carKeyIcon2} alt="Car Icon" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" />,
    number: 1500,
    label: "Team Workers",
  },
  {
    icon: <img src={carKeyIcon3} alt="Car Icon" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" />,
    number: 30,
    label: "Years Of Experience",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const StatsSection = () => {
  return (
    <motion.section
      className="bg-orange-500 text-white py-6 px-4 sm:py-10 sm:px-8 min-h-[300px] sm:min-h-[350px] flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16 md:gap-24 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.div
              className="rounded-full border-4 border-white bg-black flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {stat.icon}
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-extrabold mt-4">
              <CountUp
                start={0}
                end={stat.number}
                duration={2}
                enableScrollSpy={true}
                scrollSpyOnce={true}
              />
            </h3>

            <p className="text-lg sm:text-xl md:text-2xl font-medium mt-2 sm:mt-4">
              +{stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StatsSection;
