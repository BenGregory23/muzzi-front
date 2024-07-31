import { ScrollArea } from "@radix-ui/react-scroll-area";

const LearnMore = () => {
  return (
    <ScrollArea className="w-full h-[calc(100vh-5rem)] bg-background border-l border-secondary  flex flex-col justify-center items-center p-10  text-muted-foreground">
      <section className="flex justify-start flex-col items-start space-y-5">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white">
          What is Muzzi ?
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6 max-w-prose text-justify ">
          Muzzi is a music player that allows you to listen to your favorite
          youtube videos as music. You can create playlists, add songs to them,
          and listen to them whenever you want. The idea is to provide a simple
          and easy-to-use music player that allows you to listen to music from
          youtube without any distractions.
        </p>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white">
          Why use Muzzi ?
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6 max-w-prose text-justify">
          Using Muzzi can prevent you from getting distracted by the video
          content on youtube and help you focus on the music you are listening
          to.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6 max-w-prose text-justify">
         One of the reason why I go on youtube instead of Spotify or Apple Music is because I can find a lot of remixes, covers, and live performances that are not available on other platforms. Muzzi allows you to listen to those videos as music without any distractions.
        </p>
      </section>
    </ScrollArea>
  );
};

export default LearnMore;
