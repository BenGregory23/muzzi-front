const SearchResultItem = ({ item, onClick }) => {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 bg-background/60 hover:bg-background/70 cursor-pointer text-white"
      onClick={onClick}
    >
    
      <div className="flex items-center space-x-4">
        <img
          src={item.thumbnails.default.url}
          alt={item.title}
          className="w-24 h-30 rounded-sm object-cover"
        />
        <div className="flex flex-col">
          <span className="text-white font-medium">{item.title}</span>
          <span className="text-muted-foreground text-xs">{item.artist}</span>
        </div>
      </div>
      <span className="text-muted-foreground text-xs">{item.duration}</span>
    </div>
  );
};


export default SearchResultItem;