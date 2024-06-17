import React from "react";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="about">
                <h1>About Us</h1>
                <h2>I am learning from Namaste React Web Series</h2>
                <UserClass number={"9727716878"} />
                <div>
                    Name of the User :
                    <UserContext.Consumer>
                        {({ loggedInUser }) => (
                            <span className="font-bold">{loggedInUser}</span>
                        )}
                    </UserContext.Consumer>
                </div>
                {/* <User /> */}
            </div>
        );
    }
}

export default About;
