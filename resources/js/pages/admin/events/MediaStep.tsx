import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
    RadioGroup,
    RadioGroupItem,

} from '@/components/ui/radio-group';

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';

interface Service {
    name: string;
    price: string;
    type: string;
}

const MediaStep: React.FC = () => {
    const [services, setServices] = useState<Service[]>([
        { name: '', price: '', type: 'single' },
    ]);

    const handleAddService = () => {
        setServices([...services, { name: '', price: '', type: 'single' }]);
    };

    const handleDeleteService = (index: number) => {
        const updated = [...services];
        updated.splice(index, 1);
        setServices(updated);
    };

    const handleChange = (index: number, key: keyof Service, value: string) => {
        const updated = [...services];
        updated[index][key] = value;
        setServices(updated);
    };

    return (
        <div className="space-y-6">
            {/* Instant Booking */}
            <div>
                <Label>Instance booking</Label>
                <div className="my-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                    <div className="flex items-center justify-between border border-gray-300 p-4 rounded-md w-full">
                        <label htmlFor="instant-booking" className="text-sm font-medium leading-none cursor-pointer">
                            Allow instant booking for this place.
                        </label>
                        <Checkbox id="instant-booking" />
                    </div>
                </div>
            </div>

            {/* Hourly Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow">
                <div>
                    <Label>Price Per Hour</Label>
                    <Input type="number" />
                </div>
                <div>
                    <Label>After Price Label</Label>
                    <Input type="text" />
                </div>
                <div>
                    <Label>Weekends</Label>
                    <Input type="text" />
                </div>
                <div>
                    <Label>Select the days to apply weekend pricing</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select weekend" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="friday_and_saturday">Friday and Saturday</SelectItem>
                            <SelectItem value="saturday_and_sunday">Saturday and Sunday</SelectItem>
                            <SelectItem value="only_sunday">Only Sunday</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Extra Services Section */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Setup Extra Services Price</h2>
                <div className="space-y-4 bg-gray-50 p-4 rounded-md border">
                    {services.map((service, index) => (
                        <div key={index} className="grid md:grid-cols-3 gap-4 items-end">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    placeholder="Enter service name"
                                    value={service.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter price - only digits"
                                    value={service.price}
                                    onChange={(e) => handleChange(index, 'price', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select
                                    value={service.type}
                                    onValueChange={(value) => handleChange(index, 'type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="single">Single Fee</SelectItem>
                                        <SelectItem value="recurring">Recurring Fee</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-3">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteService(index)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <Button onClick={handleAddService} className="bg-orange-400 hover:bg-orange-500">
                        + Add More
                    </Button>
                </div>
            </div>
            {/* Static Extra Charges Section */}
            <div className="space-y-6">
                <div key="rate-selection">
                    <Label>Rate Type</Label>

                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        {/* Price Input */}
                        <Input
                            type="number"
                            placeholder="Enter rate"
                            className="w-full md:w-1/3"
                        />

                        {/* Radio Group */}
                        <RadioGroup
                            defaultValue="hourly"
                            className="flex gap-3 w-full md:w-2/3"
                        >
                            {/* Hourly Option */}
                            <label
                                htmlFor="rate-hourly"
                                className="flex items-center justify-between border border-gray-300 p-4 rounded-md w-full cursor-pointer hover:border-orange-400 transition"
                            >
                                <span className="text-sm font-medium leading-none">Hourly</span>
                                <RadioGroupItem
                                    value="hourly"
                                    id="rate-hourly"
                                />
                            </label>

                            {/* Per Stay Option */}
                            <label
                                htmlFor="rate-per-stay"
                                className="flex items-center justify-between border border-gray-300 p-4 rounded-md w-full cursor-pointer hover:border-orange-400 transition"
                            >
                                <span className="text-sm font-medium leading-none">Per Stay</span>
                                <RadioGroupItem
                                    value="per-stay"
                                    id="rate-per-stay"
                                />
                            </label>
                        </RadioGroup>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default MediaStep;
