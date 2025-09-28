import { useState } from 'react';
import OpenAI from 'openai';

function ImageGenerator({ onImageGenerated }) {
    const [prompt, setPrompt] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const generateImage = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        setPreviewUrl('');

        try {
            const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true,
            });

            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt,
                size: "1024x1024",
                response_format: "b64_json",
            });

            const base64Image = response.data[0].b64_json;

            const binaryString = atob(base64Image);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'image/png' });

            const file = new File([blob], `ai_${Date.now()}.png`, {
                type: 'image/png',
            });

            const localPreview = URL.createObjectURL(blob);
            setPreviewUrl(localPreview);

            if (onImageGenerated) {
                onImageGenerated({ previewUrl: localPreview, file });
            }

        } catch (err) {
            console.error('Error in AI generator:', err);
            setError(`Failed to generate image: ${err.message}`);
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
                {/* <button
                    onClick={generateDummyImage}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isLoading ? "Generating..." : "Generate Dummy Image"}
                </button> */}

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