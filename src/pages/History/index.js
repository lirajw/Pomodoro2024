import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useCycle } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./Styles";
import { differenceInSeconds, formatDistanceToNow } from "date-fns";
export function History() {
    const { cycles, activeCycle, activeCicleId, markCurrentCycleAsFinished, totalSeconds, minutes, seconds, setSecondsPassed, updateTitle } = useCycle();
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
    return (_jsxs(HistoryContainer, { children: [_jsx("h1", { children: "My History" }), _jsx(HistoryList, { children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Task" }), _jsx("th", { children: "Duration" }), _jsx("th", { children: "Started At" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: cycles.map(cycle => {
                                return (_jsxs("tr", { children: [_jsx("td", { children: cycle.task }), _jsxs("td", { children: [String(cycle.minutesAmount).padStart(2, '0'), " minutes"] }), _jsx("td", { children: formatDistanceToNow(cycle.startDate, {
                                                addSuffix: true
                                            }) }), _jsxs("td", { children: [cycle.finishedDate && (_jsx(Status, { statusColor: 'green', children: "Done" })), cycle.stopedDate && (_jsx(Status, { statusColor: 'red', children: "Stopped" })), !cycle.finishedDate && !cycle.stopedDate && (_jsx(Status, { statusColor: 'yellow', children: "Running" }))] })] }, cycle.id));
                            }) })] }) })] }));
}
