import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StepFooter from './StepFooter';

interface DescriptionStepProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    activeStep: string;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({ goToNextStep, goToPrevStep, activeStep }) => {
    return (
        <Card className="max-h-[80vh] w-full">
            <CardContent className="border-b-1 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label htmlFor="terms" className="text-sm leading-none font-medium">
                            Accept terms and conditions
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms2" />
                        <label htmlFor="terms2" className="text-sm leading-none font-medium">
                            Accept terms and conditions
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms3" />
                        <label htmlFor="terms3" className="text-sm leading-none font-medium">
                            Accept terms and conditions
                        </label>
                    </div>
                </div>

                <div className="col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter title" />
                </div>

                <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={4} placeholder="Write property description" />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label>Select Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bungalow">Bungalow</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Listed In</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Property Status</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Price in $</Label>
                        <Input type="number" placeholder="Enter price" />
                    </div>

                    <div>
                        <Label>Yearly Tax Rate</Label>
                        <Input type="number" placeholder="Enter tax rate" />
                    </div>

                    <div>
                        <Label>After Price Label</Label>
                        <Input placeholder="e.g. per month" />
                    </div>
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

export default DescriptionStep;
