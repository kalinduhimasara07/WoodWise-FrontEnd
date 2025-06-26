export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-20 h-20">
        {/* Outer static ring */}
        <div className="absolute inset-0 border-4 border-[#a86523] border-opacity-20 rounded-full"></div>
        
        {/* First rotating ring */}
        <div 
          className="absolute inset-0 border-4 border-[#a86523] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: '1.5s' }}
        ></div>
        
        {/* Second rotating ring (reverse) */}
        <div 
          className="absolute inset-2 border-4 border-[#a86523] border-opacity-60 border-t-transparent rounded-full animate-spin"
          style={{ 
            animationDirection: 'reverse', 
            animationDuration: '1s' 
          }}
        ></div>
      </div>
    </div>
  );
}