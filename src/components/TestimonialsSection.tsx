import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Winner 2023",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    quote: "Hack The Future was an incredible experience that helped me grow both technically and professionally."
  },
  {
    name: "Rahul Patel",
    role: "First Runner-up 2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    quote: "The mentorship and networking opportunities were invaluable. I made connections that led to my dream job."
  },
  {
    name: "Aisha Khan",
    role: "Best Innovation Award",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    quote: "From ideation to execution, the hackathon pushed us to think outside the box and create something truly innovative."
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 neon-text"
        >
          Success Stories
        </motion.h2>

        <div className="relative h-[400px] sm:h-[300px]">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                x: activeIndex === index ? 0 : 100,
                zIndex: activeIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 ${activeIndex === index ? '' : 'pointer-events-none'}`}
            >
              <div className="glass-card p-8 md:p-12 h-full">
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 glow-effect">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <Quote className="w-8 h-8 text-blue-400 mb-4 mx-auto md:mx-0" />
                    <p className="text-lg md:text-xl mb-6">{testimonial.quote}</p>
                    <div>
                      <h3 className="text-xl font-bold neon-text">{testimonial.name}</h3>
                      <p className="text-blue-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-blue-400 w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}