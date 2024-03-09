import styles from "./list.module.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFetchfav from "../../hooks/useFetchfav";
import { AuthContext } from "../../context/AuthContext";

const RecList = () => {
  const [destination, setDestination] = useState("Agra");
  const [style, setStyle] = useState("Explorer");
  const [price, setPrice] = useState(50000);
  // const [count, setCount] = useState(1);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [options, setOptions] = useState("");
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { user } = useContext(AuthContext);

  const { data, loading, error, reFetch } = useFetch(
    `/recommendations?city=${destination}&style=${style}&price=${price || 0
    }&min=${min || 0}&max=${max || 999}&limit=10`
  );

  const { datalist, reFetch1, loading1 } = useFetchfav(
    `/favorites/${user.username}/favlist`
  );
  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          <div className={styles.listSearch}>
            <h1 className={styles.lsTitle}>Enter your Preferences</h1>
            <div className={styles.lsItem}>
              <label>Destination</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                autoFocus={true}
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
              <label>Travel Style</label>
              <select
                onChange={(e) => setStyle(e.target.value)}
                placeholder={style}
                value={style}
                type="text"
              >
                <option value="In-depth Cultural">In-depth Cultural</option>
                <option value="Explorer">Explorer</option>
                <option value="Safari">Safari</option>
                <option value="Hiking & Trekking">Hiking & Trekking</option>
                <option value="Active Adventure">Active Adventure</option>
              </select>
            </div>

            <div className={styles.lsItem}>
              <label>Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                placeholder={price}
                value={price}
                type="number"
              />
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
                    // value={options.adult}
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
                  const totalCount =
                    parseInt(adultCount, 10) + parseInt(childCount, 10);
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

export default RecList;
