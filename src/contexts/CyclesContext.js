import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { ActionTypes, cyclesReducer } from "../reducers/Cycles";
import { differenceInSeconds } from "date-fns";
export const CyclesContext = createContext({});
export function CycleContextProvider({ children }) {
    //const [cycles, setCycles] = useState<Cycle[]>([])
    const [cycleState, dispatch] = useReducer(cyclesReducer, {
        cycles: []
    }, (initialState) => {
        const storedCycleStateAsJson = localStorage.getItem('@Pomodoro2024:CycleState');
        if (storedCycleStateAsJson) {
            return JSON.parse(storedCycleStateAsJson);
        }
        return initialState;
    });
    const { cycles, activeCicleId } = cycleState;
    const activeCycle = cycleState.cycles.find((cycle) => cycle.id === activeCicleId);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }
        return 0;
    });
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');
    function markCurrentCycleAsFinished() {
        dispatch({
            type: ActionTypes.MARK_AS_FINISHED,
            payload: {
                activeCicleId
            }
        });
    }
    function setSecondsPassed(seconds) {
        setAmountSecondsPassed(seconds);
    }
    function createNewCycle(data) {
        const id = String(new Date().getTime());
        const newCycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };
        dispatch({
            type: ActionTypes.ADD_NEW_VALUE,
            payload: {
                newCycle
            }
        });
        setAmountSecondsPassed(0);
    }
    function stopCycle() {
        dispatch({
            type: ActionTypes.STOP_CYCLE,
            payload: {
                activeCicleId
            }
        });
    }
    function updateTitle() {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
        else {
            document.title = 'Pomodoro2024';
        }
    }
    useEffect(() => {
        const JsonCycle = JSON.stringify(cycleState);
        localStorage.setItem('@Pomodoro2024:CycleState', JsonCycle);
    }, [cycleState]);
    return (_jsx(CyclesContext.Provider, { value: {
            cycles,
            activeCycle,
            activeCicleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            totalSeconds,
            minutes,
            seconds,
            setSecondsPassed,
            createNewCycle,
            stopCycle,
            updateTitle
        }, children: children }));
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCycle() {
    const context = useContext(CyclesContext);
    return context;
}
