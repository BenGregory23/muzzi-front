const SearchResultItem = ({
  item,
  onClick,
}: {
  item: any;
  onClick: () => any;
}) => {
  if (!item) return null;

  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 bg-background/60  cursor-pointer text-white hover:bg-secondary"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        {item.thumbnails === undefined ? null : (
          <img
            src={item.thumbnails.default.url}
            alt={item.title}
            className="w-30 rounded object-contain"
          />
        )}

        <div className="flex flex-col">
          <span className="text-white font-medium">{item.title}</span>
        
        </div>
      </div>
      <span className="text-muted-foreground text-xs">{item.duration}</span>
    </div>
  );
};

export default SearchResultItem;
