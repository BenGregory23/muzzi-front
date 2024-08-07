import { useState } from "react";
import { Input } from "../../ui/input.tsx";
import SearchResultItem from "./search-result-item.tsx";
import { ScrollArea } from "../../ui/scroll-area.tsx";
import { fetchWrapper } from "../../../utils/fetchWrapper.ts";
import { API_URL, MINIMUM_SEARCH_LENGTH } from "../../../lib/constants.ts";
import { Label } from "../../ui/label.tsx";

const SearchYoutube = ({handleSelect}:{handleSelect:(video:any)=>any}) => {
  const [videos, setVideos] = useState<[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>();
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
        API_URL +
        "/search-video?" +
          new URLSearchParams({ keywords: keywords })
      );

      console.log(response);

      if (response.result.items.length > 0) setVideos(response.result.items);
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
      
      <Label className="mb-2">Youtube video</Label>

      <Input
        className="text-white my-2 w-full"
        placeholder="Search for a video"
        onKeyDown={(e) => {
          if (e.key === "Enter") search(e.target.value);
        }}
      />
      
      <div className="mt-3 border border-dashed border-secondary py-4 rounded-md my-2">
        {videos && videos.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center h-64 flex items-center justify-center">
            {searchInfo}
          </div>
        ) : (
          <ScrollArea className="h-64 max-h-64">
            {videos.map((video: any) => (
              <SearchResultItem
                key={video.id.videoId}
                item={video.snippet}
                onClick={() => {
                    setSelectedVideo(video);
                    handleSelect(video)}}
              />
            ))}
          </ScrollArea>
        )}
        
      </div>
      <p className="text-[0.8rem] text-muted-foreground">
        Search for a video to add to your library.
      </p>


      {
        selectedVideo && (
          <div className="mt-4">
            <div className="text-muted-foreground text-sm">
              Selected video
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={selectedVideo.snippet.thumbnails.default.url}
                alt={selectedVideo.snippet.title}
                className="w-30 rounded object-contain"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium">
                  {selectedVideo.snippet.title}
                </span>
                <span className="text-muted-foreground text-xs">
                  {selectedVideo.snippet.channelTitle}
                </span>
              </div>
            </div>
          </div>)
      }

    </div>
  );
};

export default SearchYoutube;
