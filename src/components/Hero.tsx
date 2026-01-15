// src/components/Hero.tsx
export default function Hero() {
  return (
    <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-16">
      <img 
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover"
        alt="LMS Banner"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Explore Your Potential</h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">World-class lectures at your fingertips.</p>
        
        {/* Search Overlay - Like Tiqets */}
       
      </div>
    </div>
  );
}