import React from "react";
import { ConnectedSongDetail } from "./SongDetail";
import { ConnectedSongList } from "./SongList";

export const App = () => {
  return (
    <div className="ui container grid">
      <div className="ui row">
        <div className="column eight wide">
          <ConnectedSongList />
        </div>
        <div className="column eight wide">
          <ConnectedSongDetail />
        </div>
      </div>
    </div>
  );
};
