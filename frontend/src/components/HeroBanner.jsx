import { Plus, Info } from 'lucide-react';

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-prime-dark via-prime-dark/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-prime-dark via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center h-full px-12 md:w-1/2">
        <h3 className="text-xl font-bold mb-2 tracking-widest text-gray-300 uppercase">prime original</h3>
        <h1 className="text-5xl font-extrabold mb-4">{movie.title}</h1>
        <p className="text-lg text-gray-300 mb-8 line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-prime-blue text-white px-8 py-3 rounded text-lg font-bold hover:bg-prime-hover flex items-center gap-2">
            Watch now
          </button>
          <button className="bg-gray-800/80 p-3 rounded-full hover:bg-white hover:text-black transition-colors">
            <Plus size={24} />
          </button>
          <button className="bg-gray-800/80 p-3 rounded-full hover:bg-white hover:text-black transition-colors">
            <Info size={24} />
          </button>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
          <span className="bg-yellow-600 text-black px-2 py-0.5 rounded font-bold">{movie.rating}</span>
          <span>Watch with a Prime membership</span>
        </div>
      </div>
    </div>
  );
}
