import LoadingGrid from "./loading-grid";
import LoadingCard from "./loading-card";

// Example component showing different loading animations
const LoadingExamples = () => {
  return (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Animation (Fade + Slide)</h3>
        <LoadingGrid cardCount={2} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Fast Stagger (50ms delay)</h3>
        <LoadingGrid cardCount={4} staggerDelay={50} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Slow Stagger (300ms delay)</h3>
        <LoadingGrid cardCount={3} staggerDelay={300} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Individual Card Animations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LoadingCard 
            titleWidth="w-32" 
            descriptionLines={2}
            animationType="fade"
            delay={0}
          />
          <LoadingCard 
            titleWidth="w-32" 
            descriptionLines={2}
            animationType="slide"
            delay={200}
          />
          <LoadingCard 
            titleWidth="w-32" 
            descriptionLines={2}
            animationType="bounce"
            delay={400}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pulse Animation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadingCard 
            titleWidth="w-40" 
            descriptionLines={3}
            animationType="pulse"
            className="p-4 bg-white shadow-md rounded-lg"
          />
          <LoadingCard 
            titleWidth="w-40" 
            descriptionLines={3}
            animationType="pulse"
            className="p-4 bg-white shadow-md rounded-lg"
            delay={100}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingExamples;