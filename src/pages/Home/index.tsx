import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./Styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCycleFormSchema = zod.object({
    task: zod.string().min(1, 'Task Required'),
    minutesAmount: zod.number().min(5, 'Min cycle of 5 Minutes').max(60, 'Max cycle of 60 Minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home() {
    const { createNewCycle, activeCycle, stopCycle } = useContext(CyclesContext)
    const newCycleFrom = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5
        }
    })
    const { handleSubmit, watch, reset /*formState*/ } = newCycleFrom

    const task = watch('task')
    const isSubmitDisabled = !task;
        
    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleFrom}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />                

                {activeCycle ? (
                    <StopCountDownButton   onClick={stopCycle} type="button">
                        <HandPalm size={24}/>
                        Stop
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Start
                    </StartCountDownButton>
                )}


            </form>
        </HomeContainer>
    )
}