const SongListShimmer = () => (
    <div className="space-y-4 p-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
        <div className="flex-grow space-y-2">
          <div className="h-4 w-1/2 bg-white bg-opacity-20 rounded animate-pulse"></div>
          <div className="h-3 bg-white bg-opacity-20 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

export default SongListShimmer;
