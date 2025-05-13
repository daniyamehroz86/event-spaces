import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/MultiSelect'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface DescriptionStepProps {
  venues: { id: string; name: string }[]
  events: { id: string; name: string }[]
  selectedVenueTypes: string[]
  setSelectedVenueTypes: React.Dispatch<React.SetStateAction<string[]>>
  selectedEventTypes: string[]
  setSelectedEventTypes: React.Dispatch<React.SetStateAction<string[]>>
  openingHours: any
  setOpeningHours: React.Dispatch<React.SetStateAction<any>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  numOfGuests: string
  setNumOfGuests: React.Dispatch<React.SetStateAction<string>>
  size: string
  setSize: React.Dispatch<React.SetStateAction<string>>
  unitOfMeasure: string
  setUnitOfMeasure: React.Dispatch<React.SetStateAction<string>>
  handleVenueChange: (value: string) => void
  handleEventChange: (values: string[]) => void
  handleTimeChange: (day: string, timeType: 'open' | 'close', value: string) => void
  handleCheckboxChange: (day: string) => void
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  venues,
  events,
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
}) => {
  return (
    <div>
      <Label>What kind of place do you want to list?</Label>
      <div className="my-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {venues.map((venue) => (
          <div key={venue.id} className="flex items-center space-x-2">
            <Checkbox
              id={venue.id}
              checked={selectedVenueTypes.includes(venue.id)}
              onCheckedChange={() => handleVenueChange(venue.id)}
            />
            <label htmlFor={venue.id} className="text-sm font-medium leading-none">
              {venue.name}
            </label>
          </div>
        ))}
      </div>

      <div className="col-span-2 mt-3">
        <Label htmlFor="event-types">Type of Event</Label>
        <MultiSelect
          options={events.map((e) => ({ label: e.name, value: e.id }))}
          selected={selectedEventTypes}
          onChange={setSelectedEventTypes}
          placeholder="Select event types"
        />
      </div>

      <div className="col-span-2 mt-3">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="col-span-2 mt-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <Label>Number of guests</Label>
          <Input
            type="number"
            value={numOfGuests}
            onChange={(e) => setNumOfGuests(e.target.value)}
          />
        </div>
        <div>
          <Label>Size</Label>
          <Input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div>
          <Label>Unit of measure</Label>
          <Input
            value={unitOfMeasure}
            onChange={(e) => setUnitOfMeasure(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="mt-6 text-xl font-semibold">Opening Hours</h3>
        {['monToFri', 'saturday', 'sunday'].map((day) => (
          <div key={day} className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="col-span-1">
              <Label>{day === 'monToFri' ? 'Monday to Friday' : day.charAt(0).toUpperCase() + day.slice(1)}</Label>
            </div>
            <div className="col-span-3 flex items-center space-x-2">
              {!openingHours[day].isClosed && (
                <>
                  <Select
                    value={openingHours[day].open}
                    onValueChange={(value) => handleTimeChange(day, 'open', value)}
                  >
                    <SelectTrigger><SelectValue placeholder="Open Time" /></SelectTrigger>
                    <SelectContent>
                      {['12:00 AM', '12:30 AM', '1:00 AM'].map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={openingHours[day].close}
                    onValueChange={(value) => handleTimeChange(day, 'close', value)}
                  >
                    <SelectTrigger><SelectValue placeholder="Close Time" /></SelectTrigger>
                    <SelectContent>
                      {['1:00 AM', '1:30 AM', '2:00 AM'].map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox checked={openingHours[day].isClosed} onCheckedChange={() => handleCheckboxChange(day)} />
                <span className="text-sm">Closed</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DescriptionStep
