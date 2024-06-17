import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import React, { useState, useEffect } from "react";

const Body = () => {
    //Superpowerful State Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchRestaurant, setSearchRestaurant] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch(
                "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );

            if (!data.ok) {
                throw new Error("Error in fetching data");
            }

            const json = await data.json();
            const fetchListOfRestaurants =
                json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
                    ?.restaurants;

            if (!fetchListOfRestaurants) {
                throw new Error("Data format is incorrect");
            }

            setListOfRestaurants(fetchListOfRestaurants);
            setFilteredRestaurant(fetchListOfRestaurants);
        } catch (error) {
            console.log("Error in fetching data: ", error.message);
        }
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
                                (restaurant) => restaurant.info.avgRating >= 4.5
                            );
                            setFilteredRestaurant(filteredList);
                        }}>
                        Top Rated Restaurant
                    </button>
                </div>
            </div>

            <div className="restaurant-container">
                {filteredRestaurant.map((restaurant) => (
                    <RestaurantCard
                        data={restaurant}
                        key={restaurant.info.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
