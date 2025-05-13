import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

interface LocationStepProps { }

const LocationStep: React.FC<LocationStepProps> = () => {
    const [error, setError] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [videoUrl, setVideoUrl] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
        const validFiles: File[] = [];

        for (const file of files) {
            const ext = file.name.split(".").pop()?.toLowerCase();
            if (!ext || !allowedExtensions.includes(ext)) {
                setError("Error #601: File extension error");
                return;
            }
            validFiles.push(file);
        }

        setError(null);
        setSelectedFiles(validFiles);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="border border-dashed border-gray-300 p-6 rounded-lg text-center w-full">
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-gray-500">
                        <div className="text-4xl">📷</div>
                        <p className="font-medium">Drag and drop the images to customize the gallery order.</p>
                        <p>Click on the star icon to set the featured image</p>
                        <p className="text-sm text-gray-400">(Minimum size 1440 x 900 px)</p>
                    </div>

                    <div className="space-y-2">
                        <Input
                            ref={fileInputRef}
                            id="media-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <Button onClick={handleButtonClick} variant="default">
                            ✨ Select and upload
                        </Button>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {selectedFiles.length > 0 && (
                        <ul className="text-sm text-gray-600 mt-2">
                            {selectedFiles.map((file, i) => (
                                <li key={i}>{file.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Video URL Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input
                        id="video-url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://example.com/video"
                    />
                </div>
            </div>
        </div>
    );
};

export default LocationStep;
