import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UserLoginProps extends HidableProps {
    setUser: (user: UserData) => void;
}

export default function UserLogin(props: UserLoginProps) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const userLogin = async (event: React.FormEvent) => {
        // Prevent page reload
        event.preventDefault();

        const { username, password } = formData;
        try {
            // Get
            const { data } = await axios.post("/user/login", {
                username: username,
                password: password,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setFormData({ username: "", password: "" });
                toast.success("Login successful");
                const user: UserData = {
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                };
                props.setUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {props.isVisible ? (
                <form onSubmit={userLogin}>
                    <input
                        type="text"
                        placeholder="username"
                        required
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                username: event.target.value,
                            })
                        }
                    />
                    <input
                        type="password"
                        placeholder="password"
                        required
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                password: event.target.value,
                            })
                        }
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <button onClick={() => props.setVisibility(true)}>Login</button>
            )}
        </>
    );
}
