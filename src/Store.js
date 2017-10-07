import { observable, action, computed } from "mobx";
import v4 from "uuid";

class Store {
  @observable
  savedState = {
    mixTitle: "DJ Advance Mix September '17",
    tracklist: [
      {
        trackTime: 0,
        trackTitle: "Caroline K - Tracking With Close Ups",
        trackUrl:
          "https://www.discogs.com/Caroline-K-Now-Wait-For-Last-Year/release/10182988",
        trackLabel: "Blackest Ever Black",
        releaseId: "10182988"
      }
    ]
  };

  /*
  loadState() {
    try {
      let savedState = localStorage.getItem("state");
      if (savedState === null) {
        savedState = {
          mixTitle: "DJ Advance Mix August '17",
          tracklist: [
            {
              trackTime: 0,
              trackTitle: "Caroline K - Tracking With Close Ups",
              trackUrl:
                "https://www.discogs.com/Caroline-K-Now-Wait-For-Last-Year/release/10182988",
              trackLabel: "Blackest Ever Black",
              releaseId: "10182988"
            }
          ]
        };
        localStorage.setItem("state", JSON.stringify(savedState));
      }
      return JSON.parse(localStorage.getItem("state"));
    } catch (err) {
      console.log(err);
    }
  }

  @action
  saveState(state) {
    try {
      const savedState = JSON.stringify(state);
      return localStorage.setItem("state", savedState);
    } catch (err) {
      console.log(err);
    }
  }*/

  @computed
  get currentTracklist() {
    return this.savedState.tracklist;
  }

  @action
  saveMixTitle(title) {
    this.savedState.mixTitle = title;
  }

  @action
  initialiseTracklist() {
    return (this.savedState.tracklist = [
      {
        trackTime: 0,
        trackTitle: "",
        trackUrl: "",
        trackLabel: "",
        releaseId: v4()
      }
    ]);
  }

  @action
  addEmptyTrack() {
    this.savedState.tracklist.push({
      trackTime: 0,
      trackTitle: "",
      trackUrl: "",
      trackLabel: "",
      releaseId: v4()
    });
    return this.savedState.tracklist;
  }
}

const store = new Store();

export default store;
