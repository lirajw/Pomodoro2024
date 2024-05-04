
export interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    stopedDate?: Date
    finishedDate?: Date
}
export interface CycleState {
    cycles: Cycle[],
    activeCicleId: string | null | undefined
}

export enum ActionTypes {
    ADD_NEW_VALUE = 'ADD_NEW_VALUE',
    STOP_CYCLE = 'STOP_CYCLE',
    MARK_AS_FINISHED = 'MARK_AS_FINISHED'
}

export interface typeAction {    
    type: ActionTypes,
    payload: {
        activeCicleId?: string | null,
        newCycle?: Cycle
    }    
}
export function cyclesReducer(state: CycleState, action: typeAction) {
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
                    if(cycle.id === state.activeCicleId) {
                        return {...cycle, stopedDate: new Date()}
                    } else {
                        return cycle
                    }
                 }),
                activeCicleId: null
            }
        case ActionTypes.MARK_AS_FINISHED:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if(cycle.id === state.activeCicleId) {
                        return {...cycle, finishedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCicleId: null
            }
        default:
            return state;
    }
}