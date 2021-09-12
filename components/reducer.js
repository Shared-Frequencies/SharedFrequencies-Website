export default function reducer (state, action) {
    switch (action.type) {
        case "SET_CALENDAR_WINDOW_HEIGHT":
            return {
                ...state,
                calendarHeight: action.payload
            };
        default:
            return state;
    }
}