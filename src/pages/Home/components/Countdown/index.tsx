import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./Styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {   
    const { 
        activeCycle,
        activeCicleId,
        markCurrentCycleAsFinished,
        totalSeconds, 
        minutes, 
        seconds, 
        setSecondsPassed,
        updateTitle } = useContext(CyclesContext)


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
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}