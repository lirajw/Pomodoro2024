import { useEffect } from "react";
import { useCycle } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./Styles";
import { differenceInSeconds, formatDistanceToNow } from "date-fns";

export function History() {
    const { 
        cycles,
        activeCycle,
        activeCicleId,
        markCurrentCycleAsFinished,
        totalSeconds, 
        minutes, 
        seconds, 
        setSecondsPassed,
        updateTitle } = useCycle()
    
    useEffect(() => {
        let interval: number

        if(activeCycle)
        {
                interval = setInterval(() => {
                    const secondsDiffResult = differenceInSeconds(new Date(), activeCycle.startDate)
                    
                    if(secondsDiffResult >= totalSeconds ) {

                        markCurrentCycleAsFinished()
                        setSecondsPassed(totalSeconds)
                        //setActiveCicleId(null)
                        clearInterval(interval)
                    } else {
                        setSecondsPassed(secondsDiffResult) 
                    }
                }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCicleId, markCurrentCycleAsFinished, setSecondsPassed])


    useEffect(() => {
        updateTitle()
    }, [minutes, seconds, activeCycle, updateTitle])
    
    return (
        <HistoryContainer>
            <h1>My History</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Started At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{String(cycle.minutesAmount).padStart(2, '0')} minutes</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true
                                    })}</td>                                    
                                    <td>
                                        {cycle.finishedDate && (<Status statusColor='green'>Done</Status>)}
                                        {cycle.stopedDate && (<Status statusColor='red'>Stopped</Status>)}
                                        {!cycle.finishedDate && !cycle.stopedDate && (<Status statusColor='yellow'>Running</Status>)}
                                    </td>
                                </tr>
                            )
                        })}                      
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}