const initialState = [
    {
        id: 0,
        name:"Rahul",
        number: 123456,
        email: "dpr@gmail.com",
    },
    {
        id: 1,
        name: "Pranesh",
        number: 7894,
        email: "rahul@gmail.com",
    },
];

const contactReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CONTACT":
            state= [ ...state, action.payload];
            localStorage.setItem('add',JSON.stringify(state));
            return state;
        case "EDIT_CONTACT":
            const updateState = state.map(contact => contact.id === action.payload.id?action.payload: contact);
            state = updateState;
           // localStorage.setItem('add',JSON.stringify(state));
            return state;
        case "DELETE_CONTACT":
            const filterContacts = state.filter(contact => contact.id !== action.payload && contact);
            state = filterContacts;
            localStorage.setItem('add',JSON.stringify(state));
            return state;
        default:
            return state;
    }
};

export default contactReducer;