export default function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-12 py-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-prime-blue">prime</span> {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie, index) => (
          <div key={movie.id} className="min-w-[250px] md:min-w-[300px] relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20">
            <img 
              src={movie.thumbnailUrl} 
              alt={movie.title} 
              className="w-full h-auto rounded shadow-lg object-cover"
            />
            {title.includes("Top 10") && (
              <div className="absolute -left-4 -bottom-4 text-8xl font-black text-gray-800 opacity-80 group-hover:text-prime-blue transition-colors">
                {index + 1}
              </div>
            )}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300 rounded">
              <h4 className="font-bold">{movie.title}</h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{movie.description}</p>
              <div className="mt-2 text-xs font-bold text-prime-blue">{movie.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
