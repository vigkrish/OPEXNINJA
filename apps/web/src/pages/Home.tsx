import { HeroSection } from '@/components/molecules/HeroSection';
import { Services } from '@/components/organisms/Services';

export const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <Services />
    </div>
  );
};
