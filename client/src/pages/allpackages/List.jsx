import styles from "./list.module.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import useFetchfav from "../../hooks/useFetchfav";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [dates, setDates] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState("");
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/packages?city=${destination}&min=${min || 0}&max=${max || 999}&limit=10`
  );

  const { user } = useContext(AuthContext);
  const { datalist, reFetch1, loading1 } = useFetchfav(
    `/favorites/${user.username}/favlist`
  );
  console.log(datalist);

  const handleClick = () => {
    reFetch();
  };

  const [time, settime] = useState(true);

  setTimeout(() => {
    settime(false);
  }, 500);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          <div className={styles.listSearch}>
            <h1 className={styles.lsTitle}>Search</h1>

            <div className={styles.lsItem}>
              <label>Destination</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                // autoFocus={true}
              >
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

            <div className={styles.lsItem}>
              <label>Options</label>
              <div className={styles.lsOptions}>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Min price</span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className={styles.lsOptionInput}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Max price</span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className={styles.lsOptionInput}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options.adult}
                    value={adultCount}
                    onChange={(e) => {
                      setAdultCount(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={styles.lsOptionInput}
                    placeholder={options.children}
                    value={childCount}
                    onChange={(e) => {
                      setChildCount(e.target.value);
                    }}
                  />
                </div>
                {/* <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options.room}
                  />
                </div> */}
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className={styles.listResult}>
            {loading1 ? (
              <>
                <Skeleton
                  count={10}
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                />
                <br></br>
                <Skeleton
                  count={10}
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                />
                <br></br>
                <Skeleton
                  count={10}
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                />
                <br></br>
                <Skeleton
                  count={10}
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                />
                <br></br>
                <Skeleton
                  count={10}
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                />
              </>
            ) : (
              <>
                {data.map((item) => {
                  const totalCount = parseInt(adultCount, 10) + parseInt(childCount, 10);
                  return (
                    <SearchItem
                      item={item}
                      list={datalist.favorites}
                      key={item._id}
                      count={totalCount}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllList;
