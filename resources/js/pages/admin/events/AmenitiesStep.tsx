import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface AmenitiesStepProps {}

const AmenitiesStep: React.FC<AmenitiesStepProps> = () => {
    return (
        <div>
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
        </div>
    );
};

export default AmenitiesStep;
