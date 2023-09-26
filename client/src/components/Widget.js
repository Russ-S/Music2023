import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import { FaMusic } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { ImTicket } from "react-icons/im";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const [recordings, setRecordings] = useState([]);
  const [performances, setPerformances] = useState([]);

  function getRecordings() {
    axios.get("/api/recordings").then((res) => {
      setRecordings(res.data);
    });
  }

  useEffect(() => {
    getRecordings();
  }, []);

  // const albumNumber = recordings.distinct("catalogNumber");
  // console.log(albumNumber);
  let data;

  // Temporary
  const amount = 100.76;
  const diff = 385;

  useEffect(() => {
    const fetchPerformances = async () => {
      const response = await fetch("/api/performances");
      const json = await response.json();

      if (response.ok) {
        setPerformances(json);
      }
    };

    fetchPerformances();
  }, []);

  // Make a set of unique media...
  const composerSet = new Set(performances.map((p) => p.composer));
  // ... and a sorted array from the set.
  const composers = Array.from(composerSet).sort();
  const composerTotal = composers.length;

  // Make a set of unique media...
  const compositionSet = new Set(performances.map((p) => p.composition));
  // ... and a sorted array from the set.
  const compositions = Array.from(compositionSet).sort();
  const compositionTotal = compositions.length;

  // Make a set of unique media...
  const artistsSet = new Set(performances.map((p) => p.artists));
  // ... and a sorted array from the set.
  const artists = Array.from(artistsSet).sort();
  const artistTotal = artists.length;

  // Make a set of unique media...
  const conductorsSet = new Set(performances.map((p) => p.conductor));
  // ... and a sorted array from the set.
  const conductors = Array.from(conductorsSet).sort();
  const conductorTotal = conductors.length;

  // Make a set of unique media...
  const ensemblesSet = new Set(performances.map((p) => p.ensemble));
  // ... and a sorted array from the set.
  const ensembles = Array.from(ensemblesSet).sort();
  const ensembleTotal = ensembles.length;

  // Make a set of unique media...
  const hallSet = new Set(performances.map((p) => p.concertHall));
  // ... and a sorted array from the set.
  const halls = Array.from(hallSet).sort();
  const hallTotal = halls.length;

  // Make a set of unique media...
  const citySet = new Set(performances.map((p) => p.city));
  // ... and a sorted array from the set.
  const cities = Array.from(citySet).sort();
  const cityTotal = cities.length;

  // Make a set of unique media...
  const concertSet = new Set(performances.map((p) => p.performanceDate));
  // ... and a sorted array from the set.
  const concerts = Array.from(concertSet).sort();
  const concertTotal = concerts.length;

  switch (type) {
    case "compactDisc":
      data = {
        title: "Compact Discs",
        isMoney: true,
        link: "See all CDs'",
        icon: (
          <AlbumOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "cd-r":
      data = {
        title: "CD-Recordables",
        isMoney: true,
        link: "View all CD-Rs",
        icon: (
          <AlbumOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "cassette":
      data = {
        title: "Cassettes",
        isMoney: true,
        link: "View all cassettes",
        icon: (
          <AlbumOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "lp-albums":
      data = {
        title: "LP ALbums",
        isMoney: true,
        link: "See all LP albums",
        icon: (
          <AlbumOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "reel-to-reel":
      data = {
        title: "Reel to Reel Tapes",
        isMoney: true,

        icon: (
          <AlbumOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "composers":
      data = {
        title: "Composers",
        count: composerTotal,
        desc: "different",
        cat: "composers",
        icon: (
          <IoPerson
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "compositions":
      data = {
        title: "Compositions",
        count: compositionTotal,
        desc: "different",
        cat: "compositions",

        icon: (
          <FaMusic
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "artists":
      data = {
        title: "Artists",
        count: artistTotal,
        desc: "different",
        cat: "artists",
        icon: (
          <PeopleOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "conductors":
      data = {
        title: "Conductors",
        count: conductorTotal,
        desc: "different",
        cat: "conductors",
        icon: (
          <Person2OutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "ensembles":
      data = {
        title: "Ensembles",
        count: ensembleTotal,
        desc: "different",
        cat: "ensembles",
        icon: (
          <PeopleOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "concertHalls":
      data = {
        title: "Concert Halls",
        count: hallTotal,
        desc: "different",
        cat: "concert halls",
        icon: (
          <ImTicket
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "cities":
      data = {
        title: "Cities",
        count: cityTotal,
        desc: "total",
        cat: "cities",
        icon: (
          <LocationCityIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "concerts":
      data = {
        title: "Concerts",
        count: concertTotal,
        desc: "total",
        cat: "concerts",
        icon: (
          <StadiumOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }
  // console.log(data.title);
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.count} {data.desc}
          <br />
          {data.cat}{" "}
        </span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
