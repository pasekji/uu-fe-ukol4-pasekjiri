export const users = [
    { id: 1, name: "Jiri", email: "jiri@email.com" },
    { id: 2, name: "Petr", email: "petr@email.com" },
    { id: 3, name: "Lucie", email: "lucie@email.com" },
    { id: 4, name: "Anna", email: "anna@email.com" },
    { id: 5, name: "Karel", email: "karel@email.com" },
];

export const shoppingLists = [
    {
        id: 1,
        listName: "Týdenní nákup",
        owner: 1,
        archived: false,
        members: [],
        items: [
            { name: "Mléko", amount: 2, unit: "l", solved: false },
            { name: "Chléb", amount: 1, unit: "ks", solved: false },
            { name: "Máslo", amount: 1, unit: "ks", solved: true },
            { name: "Vejce", amount: 12, unit: "ks", solved: false },
            { name: "Cukr", amount: 1, unit: "kg", solved: true },
        ]
    },
    {
        id: 2,
        listName: "Nákup na grilovačku",
        owner: 4,
        archived: false,
        members: [3, 5],
        items: [
            { name: "Steak", amount: 4, unit: "ks", solved: false },
            { name: "Klobása", amount: 5, unit: "ks", solved: true },
            { name: "Pivo", amount: 10, unit: "l", solved: true },
            { name: "Kukuřice", amount: 5, unit: "ks", solved: false },
            { name: "Houska", amount: 10, unit: "ks", solved: false },
        ]
    },
    {
        id: 3,
        listName: "Večerní svačina",
        owner:5,
        archived: false,
        members: [1, 3],
        items: [
            { name: "Čokoláda", amount: 2, unit: "ks", solved: true },
            { name: "Čipsy", amount: 2, unit: "balení", solved: false },
            { name: "Cola", amount: 2, unit: "l", solved: true },
            { name: "Jablka", amount: 4, unit: "kg", solved: false },
        ]
    }
];
