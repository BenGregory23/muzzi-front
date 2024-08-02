const MusicHorizontalHeader = () => {
  return (
    <div className="border-t grid grid-cols-4 gap-1  bg-background p-2 items-center justify-center space-x-10 overflow-hidden   border-secondary">
        <div className="col-span-1  flex items-center justify-center">
            <h1 className=""></h1>
        </div>
        <div className="col-span-1 flex justify-start items-start">
            <h1 className="flex justify-center items-center text-center text-muted-foreground text-xs font-medium select-none">Title</h1>
        </div>
  
        <div className="col-span-1">
            <h1 className="text-muted-foreground text-xs font-medium select-none">Date</h1>
        </div>
      
    </div>
  );
};

export default MusicHorizontalHeader;
