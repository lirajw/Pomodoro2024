import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormContainer, MinutesAmountInput, TaskInput } from "./Styles";
import { useFormContext } from "react-hook-form";
import { useCycle } from "../../../../contexts/CyclesContext";
export function NewCycleForm() {
    const { activeCycle, cycles } = useCycle();
    const { register } = useFormContext();
    return (_jsxs(FormContainer, { children: [_jsx("label", { htmlFor: "task", children: "I'm going to work in" }), _jsx(TaskInput, { id: "task", list: "task-suggestions", placeholder: "Project's name", disabled: !!activeCycle, ...register('task') }), _jsx("datalist", { id: "task-suggestions", children: cycles.map(cycle => {
                    return (_jsx("option", { value: cycle.task }));
                }) }), _jsx("label", { htmlFor: "minutesAmount", children: "during" }), _jsx(MinutesAmountInput, { id: "minutesAmount", type: "number", placeholder: "00", step: 5, min: 5, max: 60, disabled: !!activeCycle, ...register('minutesAmount', { valueAsNumber: true }) }), _jsx("span", { children: "minutes." })] }));
}
