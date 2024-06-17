import "./RestaurantItemCard.css";
import { RESTAURANT_ITEM_CARD } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RestaurantItemCard = ({
    restaurantName,
    price,
    rating,
    ratingCount,
    description,
    imageId,
}) => {
    const [showFullInformation, setShowFullInformation] = useState(false);

    const trimmedDescription =
        description && description.length > 118
            ? description.substring(0, 118) + "..."
            : description;

    return (
        <div className="restaurantdetail-card">
            <div className="restaurantitem-card">
                <div className="itemcard-left">
                    <span className="restaurant-name">{restaurantName}</span>
                    <span className="restaurantitem-price">₹ {price}</span>
                    <div className="restaurantitem-rating">
                        {rating && ratingCount && (
                            <p>
                                <span className="rating-restaurant">
                                    <FontAwesomeIcon icon={faStar} />
                                    {" " + rating}
                                </span>
                                <span>{" (" + ratingCount + ")"}</span>
                            </p>
                        )}
                    </div>
                    <p className="description">{trimmedDescription}</p>
                </div>
                <div className="itemcard-right">
                    {imageId && (
                        <img
                            src={RESTAURANT_ITEM_CARD + imageId}
                            className="restaurantitem-card-image"
                        />
                    )}
                </div>
            </div>
            <div className="style-divider" style={{ display: "flex" }}></div>
        </div>
    );
};

export default RestaurantItemCard;
