import { Link } from "react-router-dom";
import "./searchItem.css";
import { useState, useContext, useEffect } from "react";
import {
  faHeart,
  faHeartCircleCheck,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetchfav from "../../hooks/useFetchfav";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const SearchItem = ({ item, change, list, count }) => {
  const { user } = useContext(AuthContext);
  const { datalist, reFetch1, loading1 } = useFetchfav(
    `/favorites/${user.username}/favlist`
  );

  console.log(list);

  var trick = false;
  if (list.includes(item.Sr_no)) {
    trick = true;
  }

  const [Fav, setfav] = useState(trick);

  const handleclick = async () => {
    setfav((prev) => !prev);
    try {
      if (!Fav) {
        await axios.post(`/favorites/${user.username}/add/${item.Sr_no}`);
        console.log(`/favorites/${user.username}/add/${item.Sr_no}`);
      } else {
        await axios.delete(`/favorites/${user.username}/delete/${item.Sr_no}`);
        change((prev) => prev + 1);
        //window.location.reload(false);
      }
    } catch (err) {}
  };

  return (
    <div className="searchItem">
      <img src={item.img_link} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.Package_name}</h1>

        <span className="siFeatures destination">
          Destination: <span className="nobold">{item.Destination}</span>
        </span>
        <span className="siFeatures">
          Duration: <span className="nobold">{item.Duration}</span>
        </span>
        {/* <span className="siFeatures">Age range:{item.Age_range}</span> */}
        <span className="siFeatures">
          Country Region: <span className="nobold">{item.Country_region}</span>
        </span>
        {/* <span className="siFeatures">Operated in: {item.Operated_in}</span> */}
        <span className="siFeatures">
          Travel Style: <span className="nobold">{item.Main_style}</span>
        </span>
        <span className="siFeatures">
          Operator: <span className="nobold">{item.Operator}</span>
        </span>

        <span className="siDistance">{item.Reviews}</span>
      </div>

      <div className="siDetails">
        {item.Reviews_star && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.Reviews_star}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span onClick={handleclick} className="favicon">
            {Fav ? (
              <FontAwesomeIcon
                icon={faHeart}
                size="2xl"
                style={{ color: "#f00a0a" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                size="2xl"
                style={{ color: "#b8b8b8" }}
              />
            )}
          </span>
          <div className="priceDetails">
            {/* <span className="siPrice">₹{item.Price}</span> */}
            <span className="siPrice">
              ₹{item.Price * (count > 1 ? count : 1)}
            </span>
            <span className="siTaxOp">Includes taxes and fees</span>
          </div>
          <Link to={`/packages/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;