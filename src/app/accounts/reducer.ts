export const accounts = (state = [], action) => {
    switch (action.type){
        case "LOAD_ACCOUNTS":
            return state.concat(action.payload);
        case "LOAD_BALANCE":
            return state;
        case "REMOVE_ACCOUNT":
            return state;
        case "ADD_ACCOUNT":
            return state;
        default:
            return state;
    }

}
