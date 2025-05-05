import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StepFooter from './StepFooter';

interface MediaStepProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    activeStep: string;
}

const MediaStep: React.FC<MediaStepProps> = ({ goToNextStep, goToPrevStep, activeStep }) => {
    return (
        <Card className="w-full max-h-[80vh]">
            <CardContent className="space-y-4 p-4 lg:p-6">
                <div>
                    <Label>Image Upload</Label>
                    <Input type="file" placeholder="Upload image" />
                </div>

                <div>
                    <Label>Video Upload</Label>
                    <Input type="file" placeholder="Upload video" />
                </div>

                <div>
                    <Label>Additional Media Description</Label>
                    <Textarea rows={4} placeholder="Describe the media content" />
                </div>
            </CardContent>

            <StepFooter
                goToPrevStep={goToPrevStep}
                goToNextStep={goToNextStep}
                activeStep={activeStep}
                disablePrev={activeStep === 'description'}
                disableNext={activeStep === 'amenities'}
            />
        </Card>
    );
};

export default MediaStep;
