import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
});
export function Home() {
    const { createNewCycle, activeCycle, stopCycle } = useContext(CyclesContext);
    const newCycleFrom = useForm({
        resolver: zodResolver(newCycleFormSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5
        }
    });
    const { handleSubmit, watch, reset /*formState*/ } = newCycleFrom;
    const task = watch('task');
    const isSubmitDisabled = !task;
    function handleCreateNewCycle(data) {
        createNewCycle(data);
        reset();
    }
    return (_jsx(HomeContainer, { children: _jsxs("form", { onSubmit: handleSubmit(handleCreateNewCycle), children: [_jsx(FormProvider, { ...newCycleFrom, children: _jsx(NewCycleForm, {}) }), _jsx(CountDown, {}), activeCycle ? (_jsxs(StopCountDownButton, { onClick: stopCycle, type: "button", children: [_jsx(HandPalm, { size: 24 }), "Stop"] })) : (_jsxs(StartCountDownButton, { disabled: isSubmitDisabled, type: "submit", children: [_jsx(Play, { size: 24 }), "Start"] }))] }) }));
}
