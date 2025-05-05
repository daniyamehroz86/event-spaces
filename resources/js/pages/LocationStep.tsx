import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StepFooter from './StepFooter';

interface LocationStepProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    activeStep: string;
}

const LocationStep: React.FC<LocationStepProps> = ({ goToNextStep, goToPrevStep, activeStep }) => {
    return (
        <Card className="max-h-[80vh] w-full">
            <CardContent className="space-y-4 p-4 lg:p-6">
                <div>
                    <Label>Address</Label>
                    <Input placeholder="Enter the property address" />
                </div>

                <div>
                    <Label>City</Label>
                    <Input placeholder="Enter the city" />
                </div>

                <div>
                    <Label>Country</Label>
                    <Input placeholder="Enter the country" />
                </div>

                <div>
                    <Label>Postal Code</Label>
                    <Input placeholder="Enter postal code" />
                </div>
            </CardContent>

            {/* <CardFooter className="flex justify-between px-6">
                <Button variant="outline" onClick={goToPrevStep} disabled={activeStep === 'location'}>
                    Previous
                </Button>

                <div className="space-x-2">
                    <Button variant="secondary">Save Draft</Button>
                    <Button onClick={goToNextStep} disabled={activeStep === 'amenities'}>
                        Next
                    </Button>
                </div>
            </CardFooter> */}

            <StepFooter
                goToPrevStep={goToPrevStep}
                goToNextStep={goToNextStep}
                activeStep={activeStep}
                disablePrev={activeStep === 'media'}
                disableNext={activeStep === 'amenities'}
            />
        </Card>
    );
};

export default LocationStep;
