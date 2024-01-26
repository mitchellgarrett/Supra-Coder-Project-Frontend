import toast from "react-hot-toast";

interface GuestLoginProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function UserLogin(props: GuestLoginProps) {
    const guestLogin = async (event: React.FormEvent) => {
        // Prevent page reload
        event.preventDefault();

        toast.success("Logged in as guest");
        props.setIsLoggedIn(true);
    };

    return (
        <form onSubmit={guestLogin}>
            <button>Continue as guest</button>
        </form>
    );
}
