export const loadState = () => {
  try {
    let savedState = localStorage.getItem("state");
    if (savedState === null) {
      savedState = [
        {
          trackTime: 0,
          trackTitle: "Caroline K - Tracking With Close Ups",
          trackUrl:
            "https://www.discogs.com/Caroline-K-Now-Wait-For-Last-Year/release/10182988",
          trackLabel: "Blackest Ever Black",
          releaseId: "10182988"
        }
      ];
      localStorage.setItem("state", JSON.stringify(savedState));
    }
    return JSON.parse(localStorage.getItem("state"));
  } catch (err) {
    console.log(err);
  }
};

export const saveState = state => {
  try {
    const savedState = JSON.stringify(state);
    return localStorage.setItem("state", savedState);
  } catch (err) {
    console.log(err);
  }
};
