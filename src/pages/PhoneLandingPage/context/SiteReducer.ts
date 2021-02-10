
export const reducer = (state: any, action: { type: any, payload: any }) => {
    const { payload, type } = action;
    switch (type) {
        case 'SET_BACKGROUND_COLOR':
            return {
                ...state,
                backgroundColor: payload
            }
        case 'SET_FONT_COLOR': 
            return {
                ...state,
                fontColor: payload
            }
        default:
            return state;
    }
}