const Header = () => {
  return (
    <div className='flex flex-col items-center md:flex-row md:justify-start w-full'>
      <button className="text-white rounded text-lg md:text-xl md:px-8">For You</button>
      <button className="text-white rounded text-lg md:text-xl md:px-8 mt-2 md:mt-0">Top Tracks</button>
    </div>
  );
};

export default Header;
