import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Register(props: HidableProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    });

    const register = async (event: React.FormEvent) => {
        // Prevent page reload
        event.preventDefault();

        const {
            firstName,
            lastName,
            username,
            password,
            passwordConfirmation,
        } = formData;

        if (password !== passwordConfirmation) {
            toast.error("passwords do not match");
            return;
        }

        try {
            // Register new user in database
            const { data } = await axios.post("/user/register", {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setFormData({
                    firstName: "",
                    lastName: "",
                    username: "",
                    password: "",
                    passwordConfirmation: "",
                });
                toast.success("Registration successful");
                props.setVisibility(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {props.isVisible ? (
                <form onSubmit={register}>
                    <input
                        type="text"
                        placeholder="first name"
                        required
                        autoFocus
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                firstName: event.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="last name"
                        required
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                lastName: event.target.value,
                            })
                        }
                    />
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
                    <input
                        type="password"
                        placeholder="confirm password"
                        required
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                passwordConfirmation: event.target.value,
                            })
                        }
                    />
                    <button type="submit">Register</button>
                </form>
            ) : (
                <button onClick={() => props.setVisibility(true)}>
                    Register
                </button>
            )}
        </>
    );
}
