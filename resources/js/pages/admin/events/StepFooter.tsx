import { Button } from '@/components/ui/button';

interface StepFooterProps {
    goToPrevStep: () => void;
    goToNextStep: () => void;
    activeStep: string;
    disableNext?: boolean;
    disablePrev?: boolean;
}

const StepFooter: React.FC<StepFooterProps> = ({
    goToPrevStep,
    goToNextStep,
    activeStep,
    disableNext = false,
    disablePrev = false,
}) => {
    return (
        <div className="flex justify-between px-6 pb-3">
            <Button variant="outline" onClick={goToPrevStep} disabled={disablePrev}>
                Previous
            </Button>

            <div className="space-x-2">
                <Button variant="secondary">Save Draft</Button>
                <Button onClick={goToNextStep} disabled={disableNext}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default StepFooter;
