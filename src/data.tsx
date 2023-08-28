export interface menuItem {
    id : number,
    title : string,
    description : string,
    image : string , 
    price : number,
    category : string
}


export const menuItems: menuItem[] = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with creamy sauce, bacon, and Parmesan cheese.",
        image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        price: 12.99,
        category: "Pasta"
    },
    {
        id: 2,
        title: "Margherita Pizza",
        description: "Simple and delicious pizza with tomato sauce, fresh mozzarella, and basil.",
        image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        price: 10.99,
        category: "Pizza"
    },
    {
        id: 3,
        title: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
        image: "https://images.unsplash.com/photo-1563897539633-7374c276c212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1946&q=80",
        price: 7.99,
        category: "Salad"
    },
    {
        id: 4,
        title: "Grilled Chicken Sandwich",
        description: "Juicy grilled chicken breast with lettuce, tomato, and mayo on a bun.",
        image: "https://images.unsplash.com/photo-1655195672061-90c23e3e8026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        price: 9.99,
        category: "Sandwich"
    },
    {
        id: 5,
        title: "Chocolate Brownie Sundae",
        description: "Warm chocolate brownie topped with vanilla ice cream and hot fudge.",
        image: "https://images.unsplash.com/photo-1648857529887-28d03f6774ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        price: 6.99,
        category: "Dessert"
    }
];

export const categories: string[] = [
    "All",
    "Pasta",
    "Pizza",
    "Salad",
    "Sandwich",
    "Dessert"
];