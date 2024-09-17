const ShowTitle = (props) => {
  return <h1>{props.season}</h1>;
};

const Episodes = (props) => {
  return (
    <>
      {props.episodes.map(episode => [
        <p key={episode.name}>{episode.name} {episode.views.toLocaleString("en-US")}</p>
      ])}
    </>
  );
};

const TotalSeasonViews = (props) => {
  return (
    <p>
      {props.information.season}, Total Number of Views{" "}
      {props.information.episodes.reduce((sum, elm) => {return sum + elm.views}, 0).toLocaleString("en-US")}
    </p>
  );
};

const Season = (props) => {
  return (
    <div>
      <ShowTitle season={props.seasonInformation.season}/>
      <Episodes episodes={props.seasonInformation.episodes}/>
      <TotalSeasonViews information={props.seasonInformation}/>
    </div>
  )
}

const App = () => {
  const seinfedSeason1 = {
    season: "Seinfeld Season 1",
    episodes: [
      {name: "Good News, Bad News", views:6905040},
      {name: "The Stakeout", views:3905040},
      {name: "The Robbery", views:4498237}
    ]
  }
  return (
    <div>
      <Season seasonInformation={seinfedSeason1}/>
    </div>
  );
};

export default App;
