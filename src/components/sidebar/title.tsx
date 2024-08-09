const Title = () => {
  return (
    <div className="flex flex-col items-start p-4 w-full h-fit space-x-2">
      <h1 className="text-4xl font-bold font-migra text-white">Muzzi</h1>

      {/* <img src="/logo.png" alt="logo" width={40} height={40} className="object-contain h-fit" /> */}

      <p className="text-sm text-muted-foreground">made with ❤️</p>
    </div>
  );
};

export default Title;
