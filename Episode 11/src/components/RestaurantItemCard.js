import { RESTAURANT_ITEM_CARD } from "../utils/constants";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RestaurantItemCard = ({
    restaurantName,
    price,
    rating,
    ratingCount,
    description,
    imageId,
    isLastCard,
}) => {
    const trimmedDescription =
        description && description.length > 118
            ? description.substring(0, 118) + "..."
            : description;

    return (
        <div>
            <div className="flex justify-between items-center mt-4 mb-6">
                <div className="mt-4 mb-14 w-9/12">
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
                <div className="w-3/12">
                    {imageId && (
                        <button className="bg-white font-extrabold text-green-500 absolute hover:bg-gray-200 py-2 px-8 rounded-lg mt-[8.5rem] ml-8">
                            ADD
                        </button>
                    )}

                    <div>
                        {imageId && (
                            <img
                                src={RESTAURANT_ITEM_CARD + imageId}
                                className="w-40 h-40 rounded-lg"
                            />
                        )}
                    </div>
                </div>
            </div>
            {!isLastCard && <div className="border border-gray-200"></div>}
        </div>
    );
};

export default RestaurantItemCard;
