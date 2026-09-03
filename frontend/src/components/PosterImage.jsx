import { useState } from 'react';

const searchPoster = (title) =>
  `https://tse1.mm.bing.net/th?q=${encodeURIComponent(`${title} official movie poster`)}&w=500&h=750&c=7&rs=1&p=0`;

const fallbackPoster = (title) =>
  `https://placehold.co/500x750/17202a/ffffff?text=${encodeURIComponent(title)}`;

export default function PosterImage({ movie, className = '' }) {
  const [src, setSrc] = useState(movie.thumbnailUrl || fallbackPoster(movie.title));
  const [triedSearch, setTriedSearch] = useState(false);

  const handleError = () => {
    if (!triedSearch) {
      setTriedSearch(true);
      setSrc(searchPoster(movie.title));
      return;
    }
    setSrc(fallbackPoster(movie.title));
  };

  return (
    <img
      src={src}
      alt={movie.title}
      loading="lazy"
      onError={handleError}
      className={`aspect-[2/3] w-full rounded-sm bg-prime-nav object-cover shadow-lg ${className}`}
    />
  );
}