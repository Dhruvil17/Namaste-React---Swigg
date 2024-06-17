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
        <div>
            <div className="flex justify-between items-center my-8">
                <div className="mt-4 mb-10">
                    <span className="block">{restaurantName}</span>
                    <span>₹ {price}</span>
                    <div className="mt-4">
                        {rating && ratingCount && (
                            <p>
                                <span>
                                    <FontAwesomeIcon
                                        className="text-green-800"
                                        icon={faStar}
                                    />
                                    {" " + rating}
                                </span>
                                <span>{" (" + ratingCount + ")"}</span>
                            </p>
                        )}
                    </div>
                    <p className="mt-4 mr-[20%] max-w-2xl">
                        {trimmedDescription}
                    </p>
                </div>
                <div>
                    {imageId && (
                        <img
                            src={RESTAURANT_ITEM_CARD + imageId}
                            className="w-40 h-40 rounded-lg"
                        />
                    )}
                </div>
            </div>
            <div className="border border-gray-200"></div>
        </div>
    );
};

export default RestaurantItemCard;
