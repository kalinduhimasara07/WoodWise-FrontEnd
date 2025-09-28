import React, { useState, useEffect, useMemo } from "react";
import OpenAI from "openai";

// Objects and related attributes (Sri Lankan context)
const OBJECTS = [
  "Chair",
  "Armchair",
  "Sofa",
  "Dining Table",
  "Coffee Table",
  "Bed",
  "Wardrobe",
  "Cabinet",
  "Shelf",
  "Bench",
  "Stool",
  "Lamp",
  "Outdoor Swing",
  "Writing Desk",
  "Sideboard",
  "Altar Table",
  "Mirror Frame",
  "Kitchen Cupboard",
];

const MATERIALS = [
  "Teak",
  "Jackfruit Wood",
  "Coconut Wood",
  "Rubber Wood",
  "Bamboo",
  "Rattan",
  "Metal Frame",
  "Glass Top",
];

const STYLES = [
  "Traditional Sri Lankan",
  "Colonial",
  "Modern",
  "Minimalist",
  "Rustic",
  "Coastal",
  "Kandyan",
  "Artisan-crafted",
];

const COLORS = [
  "Natural Teak Finish",
  "Dark Brown",
  "Honey Gold",
  "Light Beige",
  "Whitewashed",
  "Matte Black",
  "Raw Wood",
];

const CONTEXT_PRESETS = [
  "Product photo on plain white background",
  "Lifestyle — Sri Lankan living room with tropical accents",
  "Outdoor — garden or veranda with greenery",
  "Workshop — artisan crafting scene",
  "Showroom display",
];

const EXTRAS = [
  "Carved Motifs",
  "Handwoven Cane Panels",
  "Brass Handles",
  "Lacquer Finish",
  "Polished Wood",
  "Visible Joinery",
  "Cushioned Seat",
  "Traditional Patterns",
];

function joinEnglish(arr) {
  if (!arr || arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

export default function ImageGenerator({ onImageGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [objectType, setObjectType] = useState(OBJECTS[0].toLowerCase());
  const [material, setMaterial] = useState(MATERIALS[0].toLowerCase());
  const [style, setStyle] = useState(STYLES[0].toLowerCase());
  const [color, setColor] = useState(COLORS[0].toLowerCase());
  const [contextPreset, setContextPreset] = useState(CONTEXT_PRESETS[0]);
  const [extras, setExtras] = useState(new Set());
  const [additionalRemarks, setAdditionalRemarks] = useState("");
  const [photoreal, setPhotoreal] = useState(true);

  function toggleExtra(value) {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  // Construct meaningful sentence
  const autoPrompt = useMemo(() => {
    let sentence = `A ${style.toLowerCase()} ${objectType} made of ${material}`;
    if (color) sentence += ` with a ${color}`;
    if (extras.size) sentence += `, featuring ${joinEnglish(Array.from(extras))}`;
    if (contextPreset) sentence += `. Displayed as ${contextPreset.toLowerCase()}.`;

    const quality = photoreal
      ? "This should look photorealistic, ultra-detailed, and high-resolution."
      : "This should be an artistic illustration style.";
    sentence += ` ${quality}`;

    if (additionalRemarks.trim()) {
      sentence += ` Additional remarks: ${additionalRemarks.trim()}.`;
    }
    return sentence;
  }, [objectType, material, style, color, extras, contextPreset, photoreal, additionalRemarks]);

  useEffect(() => {
    setPrompt(autoPrompt);
  }, [autoPrompt]);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setPreviewUrl("");

    try {
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
      const blob = new Blob([bytes], { type: "image/png" });
      const file = new File([blob], `ai_${Date.now()}.png`, { type: "image/png" });

      const localPreview = URL.createObjectURL(blob);
      setPreviewUrl(localPreview);

      if (onImageGenerated) onImageGenerated({ previewUrl: localPreview, file });
    } catch (err) {
      console.error("Error in AI generator:", err);
      setError(`Failed to generate image: ${err?.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-2xl space-y-8">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-2">Furniture AI Generator</h2>
      <p className="text-gray-600 text-center mb-6">Select your preferences and we’ll generate a realistic preview for you.</p>

      {/* Dropdowns */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Main Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[ 
            {label: "Object", value: objectType, setter: setObjectType, options: OBJECTS},
            {label: "Material", value: material, setter: setMaterial, options: MATERIALS},
            {label: "Style", value: style, setter: setStyle, options: STYLES},
            {label: "Color", value: color, setter: setColor, options: COLORS},
            {label: "Context", value: contextPreset, setter: setContextPreset, options: CONTEXT_PRESETS},
          ].map(({label, value, setter, options}) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition font-medium"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Extras */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Extras <span className="text-gray-500 font-normal">(optional)</span></h3>
        <div className="flex flex-wrap gap-3">
          {EXTRAS.map((opt) => {
            const selected = extras.has(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleExtra(opt)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition shadow-sm ${
                  selected
                    ? "bg-gray-700 text-white border-gray-700"
                    : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional remarks */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Additional Remarks</h3>
        <input
          type="text"
          value={additionalRemarks}
          onChange={(e) => setAdditionalRemarks(e.target.value)}
          placeholder="e.g., slim legs, avoid glossy finish"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 bg-gray-50 font-medium"
        />
      </div>

      {/* Prompt */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Generated Prompt</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-gray-400 font-mono text-base font-medium"
        />
      </div>

      {/* Generate */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={generateImage}
          disabled={isLoading}
          className={`w-full md:w-1/2 py-3 px-4 rounded-lg font-bold text-white text-lg shadow-lg transition ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Generating..." : "Generate AI Image"}
        </button>
        {error && <div className="w-full md:w-1/2 p-3 bg-red-50 text-red-700 rounded-lg text-sm mt-2 shadow">{error}</div>}
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6 flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-700 mb-3">Generated Preview</h3>
          <div className="rounded-lg overflow-hidden border-2 border-gray-300 shadow">
            <img src={previewUrl} alt="Generated furniture" className="w-full h-auto object-contain max-h-[400px]" />
          </div>
        </div>
      )}
    </div>
  );
}