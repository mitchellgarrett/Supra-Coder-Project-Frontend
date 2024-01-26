import React from "react";

interface AddItemPopupProps {
    setAddItemPopupActive: (addItemPopupActive: boolean) => void;
    newItem: { itemName: string; quantity: number; description: string };
    setNewItem: (data: {
        itemName: string;
        quantity: number;
        description: string;
    }) => void;
    addNewItem: (event: React.FormEvent) => void;
}

export default function AddItemPopup(props: AddItemPopupProps) {
    return (
        <>
            <div
                className="popup-panel"
                onClick={() => props.setAddItemPopupActive(false)}
            />
            <div className="add-item-popup">
                <div
                    className="close-popup-button"
                    onClick={() => props.setAddItemPopupActive(false)}
                >
                    x
                </div>
                <h3>Add Item</h3>
                <form onSubmit={props.addNewItem}>
                    <label>
                        <b>NAME:</b>
                    </label>
                    <input
                        type="text"
                        placeholder="name"
                        required
                        autoFocus
                        onChange={(e) =>
                            props.setNewItem({
                                ...props.newItem,
                                itemName: e.target.value,
                            })
                        }
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
                            props.setNewItem({
                                ...props.newItem,
                                quantity: value,
                            });
                        }}
                        value={props.newItem.quantity}
                    />
                    <br />
                    <label>
                        <b>DESCRIPTION:</b>
                    </label>
                    <textarea
                        className="item-description-input"
                        placeholder="description"
                        onChange={(e) =>
                            props.setNewItem({
                                ...props.newItem,
                                description: e.target.value,
                            })
                        }
                    />
                    <button type="submit">Create Item</button>
                </form>
            </div>
        </>
    );
}
