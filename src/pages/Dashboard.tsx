import toast from "react-hot-toast";
import UserInventory from "../components/UserInventory";
import GlobalInventory from "../components/GlobalInventory";
import { useState } from "react";

interface DashboardProps {
    user: UserData;
    logout: () => void;
}

export default function Dashboard(props: DashboardProps) {
    const [viewUserInventory, setViewUserInventory] = useState(true);
    const isGuest = props.user.username === "";

    return (
        <>
            <button
                onClick={() => {
                    props.logout();
                    toast.success("Logged out");
                }}
            >
                Logout
            </button>
            {!isGuest &&
                (viewUserInventory ? (
                    <button onClick={() => setViewUserInventory(false)}>
                        View global inventory
                    </button>
                ) : (
                    <button onClick={() => setViewUserInventory(true)}>
                        View your inventory
                    </button>
                ))}
            <h1>Welcome, {!isGuest ? props.user.firstName : "guest"}!</h1>
            {
                // If user is logged in, show their inventory, otherwise show global inventory
                !isGuest && viewUserInventory ? (
                    <UserInventory user={props.user} />
                ) : (
                    <GlobalInventory />
                )
            }
        </>
    );
}
