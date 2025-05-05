import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import LocationStep from './LocationStep';
import DetailStep from './DetailStep';
import AmenitiesStep from './AmenitiesStep';
import DescriptionStep from './DdescriptionStep';
import MediaStep from './mediaStep';

const stepKeys = ['description', 'media', 'location', 'detail', 'amenities'];

export default function AddProperty() {
    const [activeStep, setActiveStep] = useState('description');

    const goToNextStep = () => {
        const currentIndex = stepKeys.indexOf(activeStep);
        if (currentIndex < stepKeys.length - 1) {
            setActiveStep(stepKeys[currentIndex + 1]);
        }
    };

    const goToPrevStep = () => {
        const currentIndex = stepKeys.indexOf(activeStep);
        if (currentIndex > 0) {
            setActiveStep(stepKeys[currentIndex - 1]);
        }
    };

    return (
        <AppLayout>
            <Head title="Add New " />

            <div className="mx-auto w-full p-5 lg:w-[80%]">
                <h2 className="mb-4 text-center text-2xl font-bold">Add New Property</h2>

                <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
                    <div className="overflow-x-auto">
                        <TabsList className="mb-2 inline-flex min-w-max gap-2 px-2 md:grid md:grid-cols-3 lg:grid-cols-5 lg:gap-16">
                            {stepKeys.map((step, index) => (
                                <TabsTrigger key={step} value={step} className="whitespace-nowrap">
                                    {index + 1}. {step.charAt(0).toUpperCase() + step.slice(1)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Render the corresponding component based on active step */}
                    <TabsContent value="description">
                        <DescriptionStep
                            goToNextStep={goToNextStep}
                            goToPrevStep={goToPrevStep}
                            activeStep={activeStep}
                        />
                    </TabsContent>
                    <TabsContent value="media">
                        <MediaStep
                            goToNextStep={goToNextStep}
                            goToPrevStep={goToPrevStep}
                            activeStep={activeStep}
                        />
                    </TabsContent>
                    <TabsContent value="location">
                        <LocationStep
                            goToNextStep={goToNextStep}
                            goToPrevStep={goToPrevStep}
                            activeStep={activeStep}
                        />
                    </TabsContent>
                    <TabsContent value="detail">
                        <DetailStep
                            goToNextStep={goToNextStep}
                            goToPrevStep={goToPrevStep}
                            activeStep={activeStep}
                        />
                    </TabsContent>
                    <TabsContent value="amenities">
                        <AmenitiesStep
                            goToNextStep={goToNextStep}
                            goToPrevStep={goToPrevStep}
                            activeStep={activeStep}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
