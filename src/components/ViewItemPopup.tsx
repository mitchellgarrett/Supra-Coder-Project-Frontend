import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ViewItemPopupProps {
    isEditAllowed: boolean;
    setViewItemPopupActive: (viewItemPopupActive: boolean) => void;
    inspectedItem: ItemData;
    setInspectedItem: (data: ItemData) => void;
    userItems: ItemData[];
    setUserItems: (data: ItemData[]) => void;
}

export default function ViewItemPopup(props: ViewItemPopupProps) {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [itemOwner, setItemOwner] = useState("");

    useEffect(() => {
        getItemOwner();
    });

    const getItemOwner = async () => {
        try {
            // Add new item to database
            const { data } = await axios.get(
                "/user/get/" + props.inspectedItem.userId
            );
            if (data.error) {
                toast.error(data.error);
            } else {
                if (data.username) setItemOwner(data.username);
                else setItemOwner("n/a");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveInspectedItem = async (event: React.FormEvent) => {
        // Prevent page reload
        event.preventDefault();

        const { _id, itemName, quantity, description } = props.inspectedItem;

        try {
            // Add new item to database
            const { data } = await axios.put("/item/update/" + _id, {
                itemName: itemName,
                quantity: quantity,
                description: description,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                const newItems = props.userItems.map((item) => {
                    if (item._id === props.inspectedItem._id)
                        return props.inspectedItem;
                    return item;
                });
                props.setUserItems(newItems);
                setIsInEditMode(false);

                toast.success("Updated item");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div
                className="popup-panel"
                onClick={() => {
                    props.setInspectedItem({
                        _id: "",
                        userId: "",
                        itemName: "",
                        quantity: 1,
                        description: "",
                    });
                    props.setViewItemPopupActive(false);
                }}
            />
            <div className="add-item-popup">
                <div
                    className="close-popup-button"
                    onClick={() => {
                        props.setInspectedItem({
                            _id: "",
                            userId: "",
                            itemName: "",
                            quantity: 1,
                            description: "",
                        });
                        props.setViewItemPopupActive(false);
                    }}
                >
                    x
                </div>
                <h3>Item Details</h3>
                {props.isEditAllowed && isInEditMode ? (
                    <form onSubmit={(event) => saveInspectedItem(event)}>
                        <label>
                            <b>NAME:</b>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            required
                            onChange={(e) =>
                                props.setInspectedItem({
                                    ...props.inspectedItem,
                                    itemName: e.target.value,
                                })
                            }
                            defaultValue={props.inspectedItem.itemName}
                        />
                        <br />
                        <label>
                            <b>QUANTITY:</b>
                        </label>
                        <input
                            type="number"
                            placeholder="quantity"
                            required
                            onChange={(e) => {
                                let value = e.target.value
                                    ? parseInt(e.target.value)
                                    : 1;
                                if (value < 1) value = 1;
                                props.setInspectedItem({
                                    ...props.inspectedItem,
                                    quantity: value,
                                });
                            }}
                            value={props.inspectedItem.quantity}
                        />
                        <br />
                        <label>
                            <b>DESCRIPTION:</b>
                        </label>
                        <textarea
                            className="item-description-input"
                            placeholder="description"
                            onChange={(e) =>
                                props.setInspectedItem({
                                    ...props.inspectedItem,
                                    description: e.target.value,
                                })
                            }
                            defaultValue={props.inspectedItem.description}
                        />
                        <button type="submit">Save Item</button>
                    </form>
                ) : (
                    <>
                        <label>
                            <b>OWNER:</b>
                        </label>
                        <label>
                            <i>{itemOwner}</i>
                        </label>
                        <br />
                        <label>
                            <b>NAME:</b>
                        </label>
                        <label className="inspected-item">
                            {props.inspectedItem.itemName}
                        </label>
                        <br />
                        <label>
                            <b>QUANTITY:</b>
                        </label>
                        <label className="inspected-item">
                            {props.inspectedItem.quantity}
                        </label>
                        <br />
                        <label>
                            <b>DESCRIPTION:</b>
                        </label>
                        <p className="inspected-item">
                            {props.inspectedItem.description}
                        </p>
                        {props.isEditAllowed && (
                            <button onClick={() => setIsInEditMode(true)}>
                                Edit Item
                            </button>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
