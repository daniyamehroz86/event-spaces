import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StepFooter from './StepFooter';

interface DetailStepProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    activeStep: string;
}

const DetailStep: React.FC<DetailStepProps> = ({ goToNextStep, goToPrevStep, activeStep }) => {
    return (
        <Card className="w-full max-h-[80vh]">
            <CardContent className="space-y-4 p-4 lg:p-6">
                <div>
                    <Label>Property Features</Label>
                    <Textarea rows={4} placeholder="List property features" />
                </div>

                <div>
                    <Label>Year Built</Label>
                    <Input type="number" placeholder="Enter year built" />
                </div>

                <div>
                    <Label>Size (in sqft)</Label>
                    <Input type="number" placeholder="Enter property size" />
                </div>
            </CardContent>

            <StepFooter
                goToPrevStep={goToPrevStep}
                goToNextStep={goToNextStep}
                activeStep={activeStep}
                disablePrev={activeStep === 'location'}
                disableNext={activeStep === 'amenities'}
            />
        </Card>
    );
};

export default DetailStep;
