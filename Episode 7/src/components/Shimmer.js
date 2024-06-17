const Shimmer = () => {
    const numOfCards = 12;

    const shimmerCards = Array.from({ length: numOfCards }, (v, i, k) => {
        return <div key={i} className="shimmer-card"></div>;
    });

    return <div className="shimmer-container">{shimmerCards}</div>;
};

export default Shimmer;
