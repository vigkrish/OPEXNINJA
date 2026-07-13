import { LucideIcon } from 'lucide-react';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-white">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral dark:text-white">{title}</h3>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
};
