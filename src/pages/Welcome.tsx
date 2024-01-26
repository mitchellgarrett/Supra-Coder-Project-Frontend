import UserLogin from "../components/UserLogin";
import Register from "../components/Register";
import GuestLogin from "../components/GuestLogin";

interface WelcomeProps {
    visibility: {
        userLoginVisible: boolean;
        registerVisible: boolean;
    };
    setVisibility: (visibility: {
        userLoginVisible: boolean;
        registerVisible: boolean;
    }) => void;
    setUser: (data: UserData) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Welcome(props: WelcomeProps) {
    return (
        <div className="Welcome">
            <h1>Inventory Manager</h1>
            <UserLogin
                isVisible={props.visibility.userLoginVisible}
                setVisibility={(value) => {
                    props.setVisibility({
                        userLoginVisible: value,
                        registerVisible: !value,
                    });
                }}
                setUser={(data) => {
                    props.setUser(data);
                    props.setIsLoggedIn(true);
                }}
            />
            <div className="side-by-side">
                <Register
                    isVisible={props.visibility.registerVisible}
                    setVisibility={(value) => {
                        props.setVisibility({
                            userLoginVisible: !value,
                            registerVisible: value,
                        });
                    }}
                />
                <GuestLogin setIsLoggedIn={props.setIsLoggedIn} />
            </div>
        </div>
    );
}
