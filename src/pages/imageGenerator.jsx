import { useState } from 'react';
import OpenAI from 'openai';
import mediaUpload from '../utils/mediaUpload';

function ImageGenerator({ onImageGenerated }) {
    const [prompt, setPrompt] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    // ✅ Generate AI image and upload immediately to Supabase
    const generateImage = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError("");

        try {
            const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true,
            });

            const response = await openai.images.generate({
                model: "gpt-image-1",
                prompt,
                size: "512x512",
            });

            const url = response.data[0].url;

            // Convert the generated image to a blob for local preview
            const blob = await fetch(url).then((res) => res.blob());
            const localUrl = URL.createObjectURL(blob);

            setImageUrl(localUrl);
            onImageGenerated({ previewUrl: localUrl, file: blob }); // pass both preview + blob
        } catch (err) {
            setError("Failed to generate image.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Dummy generator (optional)
    const generateDummyImage = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setPreviewUrl('');

            // Get a fresh random image
            const dummyUrl = `https://picsum.photos/seed/${Date.now()}/512`;
            const res = await fetch(dummyUrl, { cache: 'no-store' });
            const blob = await res.blob();

            // Create a File so the parent can upload it later
            const file = new File([blob], `dummy_${Date.now()}.jpg`, {
                type: blob.type || 'image/jpeg',
            });

            // Local preview for this component
            const localPreview = URL.createObjectURL(blob);
            setPreviewUrl(localPreview);

            // Send preview + file to parent (parent uploads on order)
            if (onImageGenerated) {
                onImageGenerated({ previewUrl: localPreview, file });
            }
        } catch (err) {
            console.error('Error in dummy generator:', err);
            setError('Failed to generate dummy image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Design Your Dream Furniture</h2>
            <p className="text-gray-600 mb-6">
                Describe the furniture you want and we'll generate an image for you.
            </p>

            <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                    Furniture Description
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Example: 'Mid-century modern walnut coffee table with hairpin legs'"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    rows={4}
                />
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex gap-3">
                <button
                    onClick={generateDummyImage}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isLoading ? "Generating..." : "Generate Dummy Image"}
                </button>

                <button
                    onClick={generateImage}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isLoading ? "Generating..." : "Generate AI Image"}
                </button>
            </div>

            {previewUrl && (
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Your Generated Furniture</h3>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
                        <img
                            src={previewUrl}
                            alt="Generated furniture"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageGenerator;
