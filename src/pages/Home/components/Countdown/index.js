import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./Styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";
export function CountDown() {
    const { activeCycle, activeCicleId, markCurrentCycleAsFinished, totalSeconds, minutes, seconds, setSecondsPassed, updateTitle } = useContext(CyclesContext);
    useEffect(() => {
        let interval;
        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDiffResult = differenceInSeconds(new Date(), activeCycle.startDate);
                if (secondsDiffResult >= totalSeconds) {
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                    //setActiveCicleId(null)
                    clearInterval(interval);
                }
                else {
                    setSecondsPassed(secondsDiffResult);
                }
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCicleId, markCurrentCycleAsFinished, setSecondsPassed]);
    useEffect(() => {
        updateTitle();
    }, [minutes, seconds, activeCycle, updateTitle]);
    return (_jsxs(CountDownContainer, { children: [_jsx("span", { children: minutes[0] }), _jsx("span", { children: minutes[1] }), _jsx(Separator, { children: ":" }), _jsx("span", { children: seconds[0] }), _jsx("span", { children: seconds[1] })] }));
}
