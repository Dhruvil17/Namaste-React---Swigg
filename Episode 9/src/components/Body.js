import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RESTAURANTS } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import useFetchRestaurants from "../utils/useFetchRestaurants";

const Body = () => {
    //Superpowerful State Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchRestaurant, setSearchRestaurant] = useState("");

    const fetchListOfRestaurants = useFetchRestaurants();
    const onlineStatus = useOnlineStatus();

    useEffect(() => {
        if (fetchListOfRestaurants) {
            setListOfRestaurants(fetchListOfRestaurants);
            setFilteredRestaurant(fetchListOfRestaurants);
        }
    }, [fetchListOfRestaurants]);

    if (onlineStatus === false) {
        return (
            <h1>
                Looks like you're offline!!! Please check your Internet
                connection.{" "}
            </h1>
        );
    }

    //Conditional Rendering
    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter-cards">
                <input
                    type="text"
                    placeholder="Search Restaurant"
                    className="search-bar"
                    value={searchRestaurant}
                    onChange={(event) => {
                        setSearchRestaurant(event.target.value);
                    }}
                />
                <button
                    className="search"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (restaurant) =>
                                restaurant.info.name
                                    .toLowerCase()
                                    .includes(searchRestaurant.toLowerCase())
                        );
                        setFilteredRestaurant(filteredList);
                    }}>
                    Search
                </button>
                <div className="filter">
                    <button
                        className="filter-btn"
                        onClick={() => {
                            const filteredList = listOfRestaurants.filter(
                                (restaurant) => restaurant.info.avgRating > 4.1
                            );
                            setFilteredRestaurant(filteredList);
                        }}>
                        Top Rated Restaurant
                    </button>
                </div>
            </div>

            <div className="restaurant-container">
                {filteredRestaurant.map((restaurant) => (
                    <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={"/restaurants/" + restaurant.info.id}
                        key={restaurant.info.id}>
                        <RestaurantCard data={restaurant} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
