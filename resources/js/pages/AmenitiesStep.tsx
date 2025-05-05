import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import StepFooter from './StepFooter';

interface AmenitiesStepProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    activeStep: string;
}

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({ goToNextStep, goToPrevStep, activeStep }) => {
    return (
        <Card className="max-h-[80vh] w-full">
            <CardContent className="space-y-4 p-4 lg:p-6">
                <div>
                    <Label>Swimming Pool</Label>
                    <Checkbox id="pool" />
                </div>

                <div>
                    <Label>Gym</Label>
                    <Checkbox id="gym" />
                </div>

                <div>
                    <Label>Parking</Label>
                    <Checkbox id="parking" />
                </div>

                <div>
                    <Label>Garden</Label>
                    <Checkbox id="garden" />
                </div>
            </CardContent>

            <StepFooter
                goToPrevStep={goToPrevStep}
                goToNextStep={goToNextStep}
                activeStep={activeStep}
                disablePrev={activeStep === 'detail'}
                disableNext={activeStep === 'amenities'}
            />
        </Card>
    );
};

export default AmenitiesStep;
