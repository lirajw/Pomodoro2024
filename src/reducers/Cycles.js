export var ActionTypes;
(function (ActionTypes) {
    ActionTypes["ADD_NEW_VALUE"] = "ADD_NEW_VALUE";
    ActionTypes["STOP_CYCLE"] = "STOP_CYCLE";
    ActionTypes["MARK_AS_FINISHED"] = "MARK_AS_FINISHED";
})(ActionTypes || (ActionTypes = {}));
export function cyclesReducer(state, action) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_VALUE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCicleId: action.payload.newCycle?.id
            };
        case ActionTypes.STOP_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCicleId) {
                        return { ...cycle, stopedDate: new Date() };
                    }
                    else {
                        return cycle;
                    }
                }),
                activeCicleId: ''
            };
        case ActionTypes.MARK_AS_FINISHED:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCicleId) {
                        return { ...cycle, finishedDate: new Date() };
                    }
                    else {
                        return cycle;
                    }
                }),
                activeCicleId: ''
            };
        default:
            return state;
    }
}
