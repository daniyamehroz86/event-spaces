import { useState } from 'react';

// Custom hook to manage the state of the property form
export const useDescriptionForm = (defaults?: any) => {
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>(defaults?.selectedVenueTypes ?? []);
    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(defaults?.selectedEventTypes ?? []);
    const [openingHours, setOpeningHours] = useState(
        defaults?.openingHours ?? {
            monToFri: { open: '', close: '', isClosed: false },
            saturday: { open: '', close: '', isClosed: false },
            sunday: { open: '', close: '', isClosed: false },
        },
    );
    const [title, setTitle] = useState(defaults?.title ?? '');
    const [description, setDescription] = useState(defaults?.description ?? '');
    const [numOfGuests, setNumOfGuests] = useState(defaults?.numOfGuests ?? '');
    const [size, setSize] = useState(defaults?.size ?? '');
    const [unitOfMeasure, setUnitOfMeasure] = useState(defaults?.unitOfMeasure ?? '');

    // Handlers for form fields
    const handleVenueChange = (value: string) => {
        setSelectedVenueTypes((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };

    const handleEventChange = (value: string[]) => {
        setSelectedEventTypes(value);
    };

    const handleTimeChange = (day: string, timeType: 'open' | 'close', value: string) => {
        setOpeningHours((prev) => ({
            ...prev,
            [day]: { ...prev[day], [timeType]: value },
        }));
    };

    const handleCheckboxChange = (day: string) => {
        setOpeningHours((prev) => ({
            ...prev,
            [day]: { ...prev[day], isClosed: !prev[day].isClosed },
        }));
    };

    // Return all state and handlers
    return {
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
    };
};
