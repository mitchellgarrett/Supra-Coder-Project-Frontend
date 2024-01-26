import { useState } from "react";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";

export default function Home() {
    const [visibility, setVisibility] = useState({
        userLoginVisible: true,
        registerVisible: false,
    });
    const [user, setUser] = useState<UserData>({
        _id: "",
        firstName: "",
        lastName: "",
        username: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            {!isLoggedIn ? (
                <Welcome
                    visibility={visibility}
                    setVisibility={setVisibility}
                    setUser={setUser}
                    setIsLoggedIn={setIsLoggedIn}
                />
            ) : (
                <Dashboard
                    user={user}
                    logout={() => {
                        setIsLoggedIn(false);
                        setUser({
                            _id: "",
                            firstName: "",
                            lastName: "",
                            username: "",
                        });
                    }}
                />
            )}
        </>
    );
}
