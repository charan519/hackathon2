import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is Hack The Future?",
    answer: "Hack The Future is India's premier student hackathon, bringing together talented developers, designers, and innovators for 24 hours of intense coding, creativity, and problem-solving."
  },
  {
    question: "Who can participate?",
    answer: "This hackathon is open to all MBU students. Teams can have 3 to 5 members."
  },
  {
    question: "Is there a registration fee?",
    answer: "Yes, there is a nominal registration fee of ₹499 per team to ensure commitment and cover event expenses."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, and any hardware you might need for your project. We'll provide food, drinks, and a comfortable hacking space."
  },
  {
    question: "Will there be mentors?",
    answer: "Yes! Industry experts and experienced developers will be available throughout the event to guide and mentor teams."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left py-4 pr-10 flex items-center justify-between group"
              >
                <span className="font-medium text-lg group-hover:text-blue-400 transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="py-3 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                initial={false}
                animate={{ opacity: openIndex === index ? 1 : 0 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-400/20 via-blue-400/10 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}