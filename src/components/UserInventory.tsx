import React, { useEffect, useState } from "react";
import AddItemPopup from "./AddItemPopup";
import axios from "axios";
import toast from "react-hot-toast";
import ViewItemPopup from "./ViewItemPopup";

interface UserInventoryProps {
    user: UserData;
}

export default function UserInventory(props: UserInventoryProps) {
    const [userItems, setUserItems] = useState<ItemData[]>([]);
    const [addItemPopupActive, setAddItemPopupActive] = useState(false);
    const [viewItemPopupActive, setViewItemPopupActive] = useState(false);
    const [newItem, setNewItem] = useState({
        itemName: "",
        quantity: 1,
        description: "",
    });
    const [inspectedItem, setInspectedItem] = useState<ItemData>({
        _id: "",
        userId: "",
        itemName: "",
        quantity: 0,
        description: "",
    });

    useEffect(() => {
        getUserItems();
        // Ignore warning because we only want to get items on the first load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserItems = async () => {
        try {
            const { data } = await axios.get("/items/" + props.user._id);
            setUserItems(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addNewItem = async (event: React.FormEvent) => {
        // Prevent page reload
        event.preventDefault();

        const { itemName, quantity, description } = newItem;
        const userId = props.user._id;

        try {
            // Add new item to database
            const { data } = await axios.post("/item/new", {
                userId: userId,
                itemName: itemName,
                quantity: quantity,
                description: description,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setUserItems([...userItems, data]);
                setNewItem({
                    itemName: "",
                    quantity: 1,
                    description: "",
                });
                setAddItemPopupActive(false);

                toast.success("Added new item");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteItem = async (_id: string) => {
        try {
            // Delete item from database
            const { data } = await axios.delete("/item/delete/" + _id);

            if (data.error) {
                toast.error(data.error);
            } else {
                setUserItems((userItems) =>
                    userItems.filter((item) => item._id !== data._id)
                );
                toast.success("Deleted item");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h4>Your Inventory</h4>
            <div>
                <table className="items">
                    <tbody>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Description</th>
                        </tr>
                        {userItems.length > 0 && (
                            <>
                                {userItems.map((item) => (
                                    <tr
                                        className="item"
                                        key={item._id}
                                        onClick={(event) => {
                                            if (
                                                event.target ===
                                                event.currentTarget
                                            ) {
                                                setInspectedItem(item);
                                                setViewItemPopupActive(true);
                                            }
                                        }}
                                    >
                                        <td className="item-name">
                                            {item.itemName}
                                        </td>
                                        <td className="item-quantity">
                                            {item.quantity}
                                        </td>
                                        <td className="item-description">
                                            {item.description.length <= 100
                                                ? item.description
                                                : item.description.substring(
                                                      0,
                                                      100
                                                  ) + "..."}
                                        </td>
                                        <td
                                            className="delete-item-button"
                                            onClick={() => deleteItem(item._id)}
                                        >
                                            x
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                        <tr>
                            <td
                                colSpan={3}
                                className="add-item-button"
                                onClick={() => setAddItemPopupActive(true)}
                            >
                                +
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {addItemPopupActive && (
                <AddItemPopup
                    setAddItemPopupActive={setAddItemPopupActive}
                    newItem={newItem}
                    setNewItem={setNewItem}
                    addNewItem={addNewItem}
                />
            )}

            {viewItemPopupActive && (
                <ViewItemPopup
                    isEditAllowed={true}
                    setViewItemPopupActive={setViewItemPopupActive}
                    inspectedItem={inspectedItem}
                    setInspectedItem={setInspectedItem}
                    userItems={userItems}
                    setUserItems={setUserItems}
                />
            )}
        </>
    );
}
