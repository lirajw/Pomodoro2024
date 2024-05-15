
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
    activeCicleId: string
}

export enum ActionTypes {
    ADD_NEW_VALUE = 'ADD_NEW_VALUE',
    STOP_CYCLE = 'STOP_CYCLE',
    MARK_AS_FINISHED = 'MARK_AS_FINISHED'
}

export type Action =
|{    
    type: ActionTypes.ADD_NEW_VALUE,
    payload: {        
        newCycle: Cycle
    }    
}
| {
    type: | ActionTypes.MARK_AS_FINISHED | ActionTypes.STOP_CYCLE,
    payload: {
        activeCicleId: string ,        
    }  
}

export function cyclesReducer(state: CycleState, action: Action): CycleState {
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
                activeCicleId: ''
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
                activeCicleId: ''
            }
        default:
            return state;
    }
}