import { motion } from 'framer-motion';
import { ServiceCard } from '../molecules/ServiceCard';
import { TrendingUp, Zap, Cpu, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Lean Transformation',
    description: 'Streamline operations and eliminate waste with proven lean methodologies.',
  },
  {
    icon: Zap,
    title: 'AI Transformation',
    description: 'Integrate cutting-edge AI solutions to automate and optimize processes.',
  },
  {
    icon: Cpu,
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and improve efficiency with intelligent workflows.',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    description: 'Make data-driven decisions with advanced analytics and real-time insights.',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive solutions to drive operational excellence and sustainable growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
