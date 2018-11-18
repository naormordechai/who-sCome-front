export const updateState = (oldState, updatedValue) => {
    return {
        ...oldState,
        ...updatedValue
    }
}