import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RESTAURANTS } from "../utils/constants";

const Body = () => {
    //Superpowerful State Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchRestaurant, setSearchRestaurant] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RESTAURANTS);

        const json = await data.json();
        const fetchListOfRestaurants =
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants;

        setListOfRestaurants(fetchListOfRestaurants);
        setFilteredRestaurant(fetchListOfRestaurants);
    };

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
