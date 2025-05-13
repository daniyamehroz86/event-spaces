import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { useDescriptionForm } from '@/pages/hooks/useDescriptionForm';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AmenitiesStep from './AmenitiesStep';
import DescriptionStep from './DescriptionStep';
import DetailStep from './DetailStep';
import LocationStep from './LocationStep';
import MediaStep from './MediaStep';

const stepKeys = ['description', 'media', 'location', 'detail', 'amenities'];

interface AddPropertyProps {
    venues: { id: string; name: string }[]; // venue data passed from Laravel controller
    events: { id: string; name: string }[]; // event data passed from Laravel controller
    editEvent?: any; // Make optional
}

export default function addProperty({ venues, events, editEvent }: AddPropertyProps) {
    const [activeStep, setActiveStep] = useState('description');

    // Use the custom hook to manage the form state
    const {
        selectedVenueTypes,
        setSelectedVenueTypes,
        selectedEventTypes,
        setSelectedEventTypes,
        openingHours,
        setOpeningHours,
        title,
        setTitle,
        description,
        setDescription,
        numOfGuests,
        setNumOfGuests,
        size,
        setSize,
        unitOfMeasure,
        setUnitOfMeasure,
        handleVenueChange,
        handleEventChange,
        handleTimeChange,
        handleCheckboxChange,
    } = useDescriptionForm(editEvent);

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

    const convertOpeningHours = (openingHours) => {
        const transformed = [];

        const mapping = {
            monToFri: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            saturday: ['saturday'],
            sunday: ['sunday'],
        };

        Object.entries(mapping).forEach(([key, days]) => {
            const entry = openingHours[key];

            if (entry) {
                days.forEach((day) => {
                    transformed.push({
                        day,
                        open: entry.open || null,
                        close: entry.close || null,
                        is_closed: entry.isClosed ?? false,
                    });
                });
            }
        });

        return transformed;
    };

    const [isSaving, setIsSaving] = useState(false);
    const handleSaveDraft = () => {
        setIsSaving(true);
        const formData = {
            title,
            description,
            selectedVenueTypes,
            selectedEventTypes,
            numOfGuests,
            size,
            unitOfMeasure,
            openingHours: convertOpeningHours(openingHours),
            status: 'draft',
        };

        const routeName = editEvent ? 'events-update' : 'events-store';
        const method = editEvent ? 'put' : 'post';

        router[method](route(routeName, editEvent?.id), formData, {
            preserveScroll: true,
            onFinish: () => setIsSaving(false),
            onSuccess: () => alert('Event saved!'),
            onError: (errors) => console.error('Error saving:', errors),
        });
    };

    return (
        <AppLayout>
            <Head title="Add New " />

            <div className="mx-auto w-full p-5 lg:w-[80%]">
                <h2 className="mb-4 text-center text-2xl font-bold">Add New Event</h2>

                <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
                    <div className="flex justify-center overflow-x-auto">
                        <TabsList className="mb-2 inline-flex min-w-max gap-2 px-2 md:grid md:grid-cols-3 lg:grid-cols-5 lg:gap-16">
                            {stepKeys.map((step, index) => (
                                <TabsTrigger key={step} value={step} className="whitespace-nowrap">
                                    {index + 1}. {step.charAt(0).toUpperCase() + step.slice(1)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <Card className="w-full">
                        <CardContent className="flex-1 space-y-4 overflow-y-auto border-b-1 pt-3 pb-6">
                            {/* Render the corresponding component based on active step */}
                            <TabsContent value="description">
                                <DescriptionStep
                                    venues={venues}
                                    events={events}
                                    selectedVenueTypes={selectedVenueTypes}
                                    setSelectedVenueTypes={setSelectedVenueTypes}
                                    selectedEventTypes={selectedEventTypes}
                                    setSelectedEventTypes={setSelectedEventTypes}
                                    openingHours={openingHours}
                                    setOpeningHours={setOpeningHours}
                                    title={title}
                                    setTitle={setTitle}
                                    description={description}
                                    setDescription={setDescription}
                                    numOfGuests={numOfGuests}
                                    setNumOfGuests={setNumOfGuests}
                                    size={size}
                                    setSize={setSize}
                                    unitOfMeasure={unitOfMeasure}
                                    setUnitOfMeasure={setUnitOfMeasure}
                                    handleVenueChange={handleVenueChange}
                                    handleEventChange={handleEventChange}
                                    handleTimeChange={handleTimeChange}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            </TabsContent>

                            {/* Other Steps */}
                            <TabsContent value="media">
                                <MediaStep />
                            </TabsContent>

                            <TabsContent value="location">
                                <LocationStep />
                            </TabsContent>

                            <TabsContent value="detail">
                                <DetailStep />
                            </TabsContent>

                            <TabsContent value="amenities">
                                <AmenitiesStep />
                            </TabsContent>
                        </CardContent>

                        {/*
                    <StepFooter goToPrevStep={goToPrevStep} goToNextStep={goToNextStep} activeStep={activeStep}
                        disablePrev={activeStep===stepKeys[0]} disableNext={activeStep===stepKeys[stepKeys.length -
                        1]} /> */}

                        {/* Save Draft and Next Buttons */}
                        <div className="flex justify-between px-6 pb-3">
                            <Button variant="outline" onClick={goToPrevStep} disabled={activeStep === stepKeys[0]}>
                                Previous
                            </Button>

                            <div className="space-x-2">
                                <Button variant="secondary" onClick={handleSaveDraft} disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Draft'}
                                </Button>
                                <Button onClick={goToNextStep} disabled={activeStep === stepKeys[stepKeys.length - 1]}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Tabs>
            </div>
        </AppLayout>
    );
}
