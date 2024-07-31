import { useState } from "react";
import { Input } from "../../ui/input.tsx";
import SearchResultItem from "./search-result-item.tsx";
import { FormDescription, FormLabel } from "../../ui/form.tsx";
import { ScrollArea } from "../../ui/scroll-area.tsx";
import lodash from "lodash";
const SEARCH_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=AIzaSyAvZRV0g5K43qALbQdp9Zy5NW1VQ-Bq18I";

const SearchYoutube = () => {
  const [videos, setVideos] = useState<Array>([]);
  const debouncedSearch = lodash.debounce(search, 500);

  async function search(keywords: string) {
    // search youtube api
    console.log(keywords);
    console.log(videos);

    try {
      const response = await fetch(`${SEARCH_URL}&q=${keywords}`);
      const data = await response.json();
      if (data.items) setVideos(data.items);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <FormLabel className="mb-2">Youtube link</FormLabel>

      <Input
        className="text-white my-2 w-full"
        placeholder="Search for a video"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      <FormDescription>
        Search for a video to add to your library.
      </FormDescription>

      <div className="mt-4 border border-dashed border-secondary py-4 rounded-md ">
        {videos && videos.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center">
            No videos found
          </div>
        ) : (
          <ScrollArea className="h-64 max-h-64">
            {videos.map((video: any) => (
              <SearchResultItem
                key={video.id.videoId}
                item={video.snippet}
                onClick={() => {}}
              />
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default SearchYoutube;
