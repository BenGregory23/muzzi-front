import { useState } from "react";
import { Input } from "../../ui/input.tsx";
import SearchResultItem from "./search-result-item.tsx";
import { FormDescription, FormLabel } from "../../ui/form.tsx";
import { ScrollArea } from "../../ui/scroll-area.tsx";
import { fetchWrapper } from "../../../utils/fetchWrapper.ts";
import { MINIMUM_SEARCH_LENGTH } from "../../../lib/constants.ts";

const SearchYoutube = () => {
  const [videos, setVideos] = useState<[]>([]);
  const [searchInfo, setSearchInfo] = useState("Videos will appear here");

  async function search(keywords: string) {
    if (keywords.length < MINIMUM_SEARCH_LENGTH) {
      setSearchInfo(
        `Please enter at least ${MINIMUM_SEARCH_LENGTH} characters`
      );
      setVideos([]);
      return;
    }

    try {
      const response = await fetchWrapper.get(
        "http://localhost:3000/search-video?" +
          new URLSearchParams({ keywords: keywords })
      );

      if (response.items.length > 0) setVideos(response.items);
      else {
        setSearchInfo("No videos found");
        if (videos.length > 0) {
          setVideos([]);
        }
      }
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
        onKeyDown={(e) => {
          if (e.key === "Enter") search(e.target.value);
        }}
      />
      <FormDescription>
        Search for a video to add to your library.
      </FormDescription>

      <div className="mt-4 border border-dashed border-secondary py-4 rounded-md ">
        {videos && videos.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center">
            {searchInfo}
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
