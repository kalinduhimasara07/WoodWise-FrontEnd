import React, { useState, useEffect, useMemo } from "react";
import OpenAI from "openai";

// Objects and related attributes (Sri Lankan context)
const OBJECTS = [
  "chair",
  "armchair",
  "sofa",
  "dining table",
  "coffee table",
  "bed",
  "wardrobe",
  "cabinet",
  "shelf",
  "bench",
  "stool",
  "lamp",
  "outdoor swing",
  "writing desk",
  "sideboard",
  "altar table",
  "mirror frame",
  "kitchen cupboard",
];

const MATERIALS = [
  "teak",
  "jackfruit wood",
  "coconut wood",
  "rubberwood",
  "bamboo",
  "rattan",
  "metal frame",
  "glass top",
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
  "natural teak finish",
  "dark brown",
  "honey gold",
  "light beige",
  "whitewashed",
  "matte black",
  "raw wood",
];

const CONTEXT_PRESETS = [
  "Product photo on plain white background",
  "Lifestyle — Sri Lankan living room with tropical accents",
  "Outdoor — garden or veranda with greenery",
  "Workshop — artisan crafting scene",
  "Showroom display",
];

const EXTRAS = [
  "carved motifs",
  "handwoven cane panels",
  "brass handles",
  "lacquer finish",
  "polished wood",
  "visible joinery",
  "cushioned seat",
  "traditional patterns",
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

  const [objectType, setObjectType] = useState(OBJECTS[0]);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [color, setColor] = useState(COLORS[0]);
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
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Furniture AI Generator</h2>
      <p className="text-gray-600">Select your preferences and we’ll generate a realistic preview for you.</p>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[ 
          {label: "Object", value: objectType, setter: setObjectType, options: OBJECTS},
          {label: "Material", value: material, setter: setMaterial, options: MATERIALS},
          {label: "Style", value: style, setter: setStyle, options: STYLES},
          {label: "Color", value: color, setter: setColor, options: COLORS},
          {label: "Context", value: contextPreset, setter: setContextPreset, options: CONTEXT_PRESETS},
        ].map(({label, value, setter, options}) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
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

      {/* Extras */}
      <div>
        <p className="text-sm font-medium mb-2">Extras (optional)</p>
        <div className="flex flex-wrap gap-2">
          {EXTRAS.map((opt) => {
            const selected = extras.has(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleExtra(opt)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  selected
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional remarks */}
      <input
        type="text"
        value={additionalRemarks}
        onChange={(e) => setAdditionalRemarks(e.target.value)}
        placeholder="Additional remarks (e.g., slim legs, avoid glossy finish)"
        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 bg-gray-50"
      />

      {/* Prompt */}
      <div>
        <p className="text-sm font-medium mb-2">Generated Prompt (editable)</p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-500 font-mono text-sm"
        />
      </div>

      {/* Generate */}
      <button
        onClick={generateImage}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isLoading ? "Generating..." : "Generate AI Image"}
      </button>

      {/* Error */}
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Preview */}
      {previewUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Generated Preview</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={previewUrl} alt="Generated furniture" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}