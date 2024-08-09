
const NoMusic = () => { 

    return (
        <div className="flex flex-col  space-y-2 items-center justify-center w-full lg:min-h-60 h-full flex-grow border border-secondary border-dashed p-10 m-10 rounded-md">

            <h1 className="text-muted-foreground font-bold text-lg">No music found</h1>
            <p className="text-muted-foreground">Add your favorite music to your library and listen to them anytime.</p>
            
        </div>
    )

}

export default NoMusic;