import   { useRef, useState, useEffect } from "react";
import Vector from "../assets/testimonials/Vector.png";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Shubham Patil",
      role: "Customer",
 text: "Sold my old car within days! Great platform with quick responses and easy listing.",
    },
    {
      id: 2,
      name: "Ashish Wadkar",
      role: "Customer",
  text: "Found my dream car at a great price. The process was smooth and transparent.",
    },
    {
      id: 3,
      name: "Vinayak Sathe",
      role: "Customer",
  text: "Bought and sold cars here multiple times. Always a trustworthy experience!",
    },
    {
      id: 4,
      name: "Gauri Adhatrao",
      role: "Customer",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollToTestimonial = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[index];
      const containerWidth = container.clientWidth;
      const scrollPosition =
        card.offsetLeft - (containerWidth - card.clientWidth) / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerWidth = container.clientWidth;
      const scrollPosition = container.scrollLeft;
      const newIndex = Math.round(scrollPosition / containerWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#FCFCFC] py-12 px-4 md:py-16 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-[#FF7101] text-sm uppercase tracking-wider mb-2">
          TESTIMONIALS
        </h2>

        {/* Subtitle */}
        <div className="mb-8 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-black">what our</span>{" "}
            <span className="text-[#FF7101]">clients says</span>
          </h3>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-7 h-1 bg-[#FF7101]"></div>
            <div className="w-[74px] h-1 bg-[#FF7101]"></div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-y-24">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative group ">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20 group-hover:-translate-y-2 transition-all duration-300 ease-in-out">
                <div className="w-24 h-24 rounded-full border-[3px] border-[#FF7101] p-1 bg-white group-hover:border-[#ff8a3d] transition-all duration-300 ease-in-out">
                  <div className="w-full h-full rounded-full bg-[#D9D9D9] overflow-hidden group-hover:bg-[#e6e6e6] transition-all duration-300 ease-in-out">
                    <div className="w-full h-full bg-gray-300 group-hover:scale-105 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </div>
              </div>
              <div className="relative bg-white rounded-lg shadow-lg p-6 pt-16 overflow-hidden min-h-[320px] group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 ease-in-out">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.66] group-hover:opacity-80 transition-opacity duration-300 ease-in-out">
                  <img
                    src={Vector}
                    alt="Card decoration"
                    className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-1 text-center group-hover:text-[#FF7101] transition-colors duration-300 ease-in-out">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#FF7101] text-sm mb-4 text-center group-hover:text-[#ff8a3d] transition-colors duration-300 ease-in-out">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-600 text-center mb-4 group-hover:text-gray-800 group-hover:scale-105 transform transition-all duration-300 ease-in-out">
                    {testimonial.text}
                  </p>
                  <div className="flex justify-center text-[#FF7101] group-hover:text-[#ff8a3d] transition-colors duration-300 ease-in-out">
                    ★ ★ ★ ★ ★
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="pt-4 pb-4">
            <div
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
              ref={scrollRef}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 snap-center px-4"
                >
                  <div className="relative" style={{ paddingTop: "48px" }}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="w-24 h-24 rounded-full border-2 border-[#FF7101] bg-white p-1">
                        <div className="w-full h-full rounded-full bg-[#D9D9D9] overflow-hidden">
                          <div className="w-full h-full bg-gray-300"></div>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-white rounded-lg shadow-lg p-6 pt-14 overflow-hidden min-h-[320px]">
                      <div className="absolute inset-0 flex items-center justify-center opacity-[0.66]">
                        <img
                          src={Vector}
                          alt="Card decoration"
                          className="w-3/4 h-3/4 object-contain"
                        />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-lg font-bold mb-1 text-center">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#FF7101] text-sm mb-4 text-center">
                          {testimonial.role}
                        </p>
                        <p className="text-gray-600 text-center mb-4">
                          {testimonial.text}
                        </p>
                        <div className="flex justify-center text-[#FF7101]">
                          ★ ★ ★ ★ ★
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#FF7101] w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
