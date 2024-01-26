import axios from "axios";
import { useEffect, useState } from "react";
import ViewItemPopup from "./ViewItemPopup";

export default function GlobalInventory() {
    const [items, setItems] = useState<ItemData[]>([]);
    const [viewItemPopupActive, setViewItemPopupActive] = useState(false);
    const [inspectedItem, setInspectedItem] = useState<ItemData>({
        _id: "",
        userId: "",
        itemName: "",
        quantity: 0,
        description: "",
    });

    useEffect(() => {
        getItems();
        // Ignore warning because we only want to get items on the first load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getItems = async () => {
        try {
            // Get all items in database
            const { data } = await axios.get("/items");
            setItems(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h4>Global Inventory</h4>
            <div>
                <table className="items">
                    <tbody>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Description</th>
                        </tr>
                        {items.length > 0 && (
                            <>
                                {items.map((item) => (
                                    <tr
                                        className="item"
                                        key={item._id}
                                        onClick={() => {
                                            setInspectedItem(item);
                                            setViewItemPopupActive(true);
                                        }}
                                    >
                                        <td>{item.itemName}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {item.description.length <= 100
                                                ? item.description
                                                : item.description.substring(
                                                      0,
                                                      100
                                                  ) + "..."}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {viewItemPopupActive && (
                <ViewItemPopup
                    isEditAllowed={false}
                    setViewItemPopupActive={setViewItemPopupActive}
                    inspectedItem={inspectedItem}
                    setInspectedItem={setInspectedItem}
                    userItems={[]}
                    setUserItems={() => {}}
                />
            )}
        </>
    );
}
