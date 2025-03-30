# Multi-User Shopping Cart

This is a multi-user shopping cart application that allows users to log in, add items to their cart, edit quantities, remove items, and view the total cost. Each user's cart is stored separately in `localStorage`.

## Features

-   **User Login:** Users can log in by entering a unique username.
-   **Add Items:** Users can add items to their cart by entering the item name, price, and quantity.
-   **Edit Quantities:** Users can edit the quantity of items in their cart.
-   **Remove Items:** Users can remove items from their cart.
-   **Total Cost:** The application displays the total cost of all items in the cart.
-   **Persistence:** Each user's cart is stored in `localStorage` and persists across page reloads.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Enter a unique username and click "Login."
3.  Enter the item name, price, and quantity and click "Add Item."
4.  Edit the quantity of an item by changing the value in the quantity input field.
5.  Remove an item by clicking the "Remove" button.
6.  View the total cost at the bottom of the cart.

## Notes

-   Cart data is stored in `localStorage` as a JSON object, where each key is the username, and the value is the corresponding cart data.
-   Input validation is implemented to ensure unique usernames and proper item quantities.
-   The cart display updates dynamically as items are added, edited, or removed.
