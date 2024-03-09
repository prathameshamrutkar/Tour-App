import {
  faBed,
  faCalendarDays,
  faPerson,
  faHeart,
  faHome,
  faList,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ type }) => {
  const location = useLocation();

  console.log(location.pathname);
  const [destination, setDestination] = useState("");
  const [home, sethome] = useState(false);
  const [packages, setpackages] = useState(false);
  const [rec, setrec] = useState(false);
  const [fav, setfav] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      sethome(true);
      setpackages(false);
      setrec(false);
      setfav(false);
    } else if (location.pathname === "/allpackages") {
      setpackages(true);
      sethome(false);
      setrec(false);
      setfav(false);
    } else if (location.pathname === "/recommendations") {
      setrec(true);
      sethome(false);
      setpackages(false);
      setfav(false);
    } else if (location.pathname === "/favorites") {
      setfav(true);
      sethome(false);
      setpackages(false);
      setrec(false);
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/packages", { state: { destination, dates, options } });
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className={home ? "headerListItem active" : "headerListItem"}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faHome} />
              <span> Home</span>
            </Link>
          </div>

          <div
            className={packages ? "headerListItem active" : "headerListItem"}
          >
            <Link
              to="/allpackages"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faList} />
              <span> All Packages</span>
            </Link>
          </div>

          <div className={rec ? "headerListItem active" : "headerListItem"}>
            <Link
              to="/recommendations"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              <span> Try Recommendations</span>
            </Link>
          </div>

          <div className={fav ? "headerListItem active" : "headerListItem"}>
            <Link
              to="/favorites"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faHeart} />
              <span> Favorites</span>
            </Link>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Discover Your Next Adventure: Tailored Tours Just for You!
            </h1>
            <p className="headerDesc">
              Explore destinations, discover hidden gems, and unlock your
              wanderlust and guide you to an unforgettable adventure.
            </p>

            <center>
              {user &&
                <button className="headerBtn">
                  <Link
                    to="/recommendations"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                    <span> Try Recommendations</span>
                  </Link>
                </button>}
            </center>

            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                {/* <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                /> */}
                <select
                  className="headerSearchInput"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="" disabled hidden style={{ color: '#b0b0b0' }}>Where are you going?</option>
                  <option value="Agra">Agra</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Kashmir">Kashmir</option>
                  <option value="Leh & Ladakh">Leh & Ladakh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Rajastan">Rajastan</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="searchBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
