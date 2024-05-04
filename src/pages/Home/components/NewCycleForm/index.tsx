import { FormContainer, MinutesAmountInput, TaskInput } from "./Styles";
import { useFormContext } from "react-hook-form";
import { useCycle } from "../../../../contexts/CyclesContext";



export function NewCycleForm() {
    const { activeCycle, cycles } = useCycle()
    const { register } = useFormContext()
      
    return (
        <FormContainer>
            <label htmlFor="task">I'm going to work in</label>
            <TaskInput 
                id="task" 
                list="task-suggestions"
                placeholder="Project's name"
                disabled={!!activeCycle}
                {...register('task')}
            />
            <datalist id="task-suggestions">
                {cycles.map(cycle => {
                    return (
                        <option value={cycle.task}></option>
                    )
                })}
            </datalist>
            <label htmlFor="minutesAmount">during</label>
            <MinutesAmountInput 
                id="minutesAmount" 
                type="number"
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}                        
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutes.</span>
        </FormContainer>
    )
}