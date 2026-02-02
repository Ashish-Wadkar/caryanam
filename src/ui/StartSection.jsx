import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "countup.js";
import PropTypes from "prop-types";

import carKeyIcon from "../assets/startsection/Group 16.png";
import carKeyIcon1 from "../assets/startsection/Group 17.png";
import carKeyIcon2 from "../assets/startsection/Group 18.png";
import carKeyIcon3 from "../assets/startsection/Group 19.png";

// Counter that starts only when the element is in view
const AnimatedCount = ({ end }) => {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (isInView && countRef.current) {
      const countUp = new CountUp(countRef.current, end, {
        duration: 2,
        startVal: 0,
      });

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    }
  }, [isInView, end]);

  return <span ref={countRef}>0</span>;
};

AnimatedCount.propTypes = {
  end: PropTypes.number.isRequired,
};

const stats = [
  {
    icon: <img src={carKeyIcon} alt="Car Icon" className="w-11 h-11" />,
    number: 500,
    label: "Available Cars",
  },
  {
    icon: <img src={carKeyIcon1} alt="Car Icon" className="w-11 h-11" />,
    number: 900,
    label: "Happy Clients",
  },
  {
    icon: <img src={carKeyIcon2} alt="Car Icon" className="w-11 h-11" />,
    number: 1500,
    label: "Team Workers",
  },
  {
    icon: <img src={carKeyIcon3} alt="Car Icon" className="w-11 h-11" />,
    number: 30,
    label: "Years Of Experience",
  },
];

const StatsSection = () => {
  return (
    <motion.div
      className="bg-orange-500 text-white py-6 px-4 min-h-[300px] flex items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.2,
            }}
          >
            <motion.div
              className="rounded-full border-4 border-white bg-black flex items-center justify-center w-24 h-24"
              variants={{
                hidden: { y: -20 },
                visible: { y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.2 + 0.3,
              }}
            >
              {stat.icon}
            </motion.div>

            <h3 className="text-5xl font-extrabold mt-6">
              <AnimatedCount end={stat.number} />
            </h3>

            <p className="text-2xl font-semibold mt-6">+{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsSection;
