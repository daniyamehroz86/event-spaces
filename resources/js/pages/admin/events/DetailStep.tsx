import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Service {
    name: string;
    price: string;
    description: string;
}

interface DetailStepProps { }

const DetailStep: React.FC<DetailStepProps> = () => {
    const [services, setServices] = useState<Service[]>([
        { name: "", price: "", description: "" },
    ]);

    const handleChange = (
        index: number,
        field: keyof Service,
        value: string
    ) => {
        const updated = [...services];
        updated[index][field] = value;
        setServices(updated);
    };

    const addService = () => {
        setServices([...services, { name: "", price: "", description: "" }]);
    };

    const removeService = (index: number) => {
        const updated = services.filter((_, i) => i !== index);
        setServices(updated);
    };

    return (
        <div className="space-y-6">
            {services.map((service, index) => (
                <div
                    key={index}
                    className="border border-gray-200 p-6 rounded-lg space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor={`service-name-${index}`}>Service name</Label>
                            <Input
                                id={`service-name-${index}`}
                                placeholder="Ex. Projection Screen"
                                value={service.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor={`service-price-${index}`}>Service Price</Label>
                            <Input
                                id={`service-price-${index}`}
                                placeholder="Enter the service price"
                                value={service.price}
                                onChange={(e) => handleChange(index, "price", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor={`service-desc-${index}`}>Service description</Label>
                        <Textarea
                            id={`service-desc-${index}`}
                            placeholder="Enter the service description"
                            value={service.description}
                            onChange={(e) =>
                                handleChange(index, "description", e.target.value)
                            }
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Button
                            variant="destructive"
                            onClick={() => removeService(index)}
                            disabled={services.length === 1}
                        >
                            Remove this service
                        </Button>
                    </div>
                </div>
            ))}

            <div className="flex justify-end">
                <Button onClick={addService} className="bg-orange-400 hover:bg-orange-500">
                    ＋ Add another service
                </Button>
            </div>
        </div>
    );
};

export default DetailStep;
