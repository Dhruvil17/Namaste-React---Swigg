import { useParams } from "react-router-dom";
import RestaurantItemCard from "./RestaurantItemCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage, avgRating, totalRatingsString } =
        resInfo?.cards[2]?.card?.card?.info;

    const { cards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

    return (
        <div className="Restaurant-Menu">
            <h1 className="restaurantname">{name}</h1>
            <p className="restaurant-information">
                {avgRating + " (" + totalRatingsString + ")"} -{" "}
                {costForTwoMessage}
            </p>
            <p className="cuisines">{cuisines.join(", ")}</p>

            {cards.map((card, i) => (
                <div key={i} className="card">
                    <h3 className="category-name">
                        {card?.card?.card?.itemCards ||
                        card?.card?.card?.categories
                            ? card?.card?.card?.title +
                              (card?.card?.card?.itemCards != null &&
                              card?.card?.card?.categories == null
                                  ? " (" +
                                    card?.card?.card?.itemCards?.length +
                                    ") "
                                  : "")
                            : ""}
                    </h3>
                    {card?.card?.card?.itemCards?.map((itemCard) => (
                        <div key={itemCard?.card?.info?.id}>
                            <RestaurantItemCard
                                restaurantName={itemCard?.card?.info?.name}
                                price={
                                    itemCard?.card?.info?.price / 100 ||
                                    itemCard?.card?.info?.defaultPrice / 100
                                }
                                rating={
                                    itemCard?.card?.info?.ratings
                                        ?.aggregatedRating?.rating
                                }
                                ratingCount={
                                    itemCard?.card?.info?.ratings
                                        ?.aggregatedRating?.ratingCountV2
                                }
                                description={itemCard?.card?.info?.description}
                                imageId={itemCard?.card?.info?.imageId}
                            />
                        </div>
                    )) ||
                        card?.card?.card?.categories?.map((category, i) => (
                            <div key={i}>
                                <p className="subcategory-item">
                                    {category?.title +
                                        " (" +
                                        category?.itemCards?.length +
                                        ")"}
                                </p>
                                {category?.itemCards?.map((itemCard) => (
                                    <RestaurantItemCard
                                        key={itemCard?.card?.info?.id}
                                        restaurantName={
                                            itemCard?.card?.info?.name
                                        }
                                        price={
                                            itemCard?.card?.info?.price / 100 ||
                                            itemCard?.card?.info?.defaultPrice /
                                                100
                                        }
                                        rating={
                                            itemCard?.card?.info?.ratings
                                                ?.aggregatedRating?.rating
                                        }
                                        ratingCount={
                                            itemCard?.card?.info?.ratings
                                                ?.aggregatedRating
                                                ?.ratingCountV2
                                        }
                                        description={
                                            itemCard?.card?.info?.description
                                        }
                                        imageId={itemCard?.card?.info?.imageId}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default RestaurantMenu;
