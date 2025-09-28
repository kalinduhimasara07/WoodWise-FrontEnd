import React, { useState, useEffect, useMemo } from "react";
import OpenAI from "openai";
import { motion } from "framer-motion";

const OBJECTS = ["Chair", "Table", "Shelf", "Lamp", "Bench", "Cabinet", "Stool", "Dining table"];
const MATERIALS = ["Teak", "Jackfruit (Jak)", "Coconut wood", "Rubberwood", "Bamboo", "Rattan", "Metal", "Glass"];
const STYLES = ["Traditional Sri Lankan", "Colonial", "Modern", "Minimalist", "Coastal", "Kandyan", "Rustic"];
const COLORS = ["Natural (Teak Finish)", "Dark Brown", "Light Beige", "Whitewashed", "Black", "Raw Wood"];
const CONTEXT_PRESETS = [
  "Product photo on plain white background",
  "Lifestyle — Sri Lankan living room with tropical accents",
  "Outdoor — garden / patio with plants",
  "Workshop — artisan crafting scene",
  "Showroom display"
];
const EXTRAS = [
  "carved motifs",
  "handwoven mat",
  "brass fittings",
  "polished finish",
  "patina finish",
  "visible joinery",
  "cushioned seat",
  "traditional lacquer"
];

function joinEnglish(arr) {
  if (!arr || arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

export default function ImageGenerator({ onImageGenerated, initialFurniture = null }) {
  // Core image states
  const [prompt, setPrompt] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Builder states (dropdowns + extras)
  const [objectType, setObjectType] = useState(initialFurniture?.type || OBJECTS[0]);
  const [material, setMaterial] = useState(initialFurniture?.material || MATERIALS[0]);
  const [style, setStyle] = useState(initialFurniture?.style || STYLES[0]);
  const [color, setColor] = useState(initialFurniture?.color || COLORS[0]);
  const [contextPreset, setContextPreset] = useState(initialFurniture?.context || CONTEXT_PRESETS[0]);
  const [extras, setExtras] = useState(new Set(initialFurniture?.extras || []));
  const [additionalRemarks, setAdditionalRemarks] = useState(initialFurniture?.remarks || "");
  const [photoreal, setPhotoreal] = useState(true);

  // Toggle helper for extras Set
  function toggleExtra(value) {
    setExtras(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  // Compose a natural sentence prompt based on selections
  const autoPrompt = useMemo(() => {
    // base: style + material + object
    const parts = [];
    const base = `${style.toLowerCase()} ${material.toLowerCase()} ${objectType}`;
    parts.push(`A ${base}`);

    // color
    if (color) parts.push(`finished in ${color.toLowerCase()}`);

    // extras
    const extrasArr = Array.from(extras);
    if (extrasArr.length) parts.push(`featuring ${joinEnglish(extrasArr)}`);

    // context preset (short phrase)
    if (contextPreset) parts.push(`${contextPreset.toLowerCase()}`);

    // finishing quality
    const quality = photoreal ? "Photorealistic, ultra-detailed, high-resolution" : "stylized illustration, artistic";
    const sentence = `${parts.join(", ")}. ${quality}.`;

    // additional remarks
    if (additionalRemarks && additionalRemarks.trim()) {
      return `${sentence} Additional remarks: ${additionalRemarks.trim()}.`;
    }
    return sentence;
  }, [objectType, material, style, color, extras, contextPreset, photoreal, additionalRemarks]);

  // Auto-fill the editable textarea with the generated sentence so user can tweak it
  useEffect(() => {
    setPrompt(autoPrompt);
  }, [autoPrompt]);

  // OpenAI client (keeps same pattern you used)
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Design Your Sri Lankan Furniture</h2>
        <p className="text-gray-600 mt-1">Select relevant options — the system will build a fluent prompt you can edit before generating.</p>
      </header>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Object</label>
          <select value={objectType} onChange={e => setObjectType(e.target.value)} className="w-full p-2 rounded border">
            {OBJECTS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Material</label>
          <select value={material} onChange={e => setMaterial(e.target.value)} className="w-full p-2 rounded border">
            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Style</label>
          <select value={style} onChange={e => setStyle(e.target.value)} className="w-full p-2 rounded border">
            {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Color / Finish</label>
          <select value={color} onChange={e => setColor(e.target.value)} className="w-full p-2 rounded border">
            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Context / Preset</label>
          <select value={contextPreset} onChange={e => setContextPreset(e.target.value)} className="w-full p-2 rounded border">
            {CONTEXT_PRESETS.map(cp => <option key={cp} value={cp}>{cp}</option>)}
          </select>
        </div>
      </div>

      {/* Extras (chips) */}
      <div>
        <label className="block text-sm font-medium mb-2">Extras (select any)</label>
        <motion.div className="flex flex-wrap gap-2" layout>
          {EXTRAS.map(opt => {
            const selected = extras.has(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleExtra(opt)}
                className={`px-3 py-1 rounded-full border text-sm transition ${selected ? "bg-black text-white" : "bg-white"}`}
              >
                {opt}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Additional remarks */}
      <div>
        <label className="block text-sm font-medium mb-1">Additional remarks (optional)</label>
        <input
          type="text"
          value={additionalRemarks}
          onChange={e => setAdditionalRemarks(e.target.value)}
          placeholder="E.g., 'keep joints visible' or 'no glossy finish'"
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Photoreal toggle + small preview of auto-sentence */}
      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={photoreal} onChange={e => setPhotoreal(e.target.checked)} />
          Photoreal
        </label>

        <div className="text-sm text-gray-600">
          <strong>Auto prompt preview:</strong>
          <div className="mt-1 p-2 rounded border bg-gray-50 text-xs">{autoPrompt}</div>
        </div>
      </div>

      {/* Prompt textarea (editable) */}
      <div>
        <label className="block text-sm font-medium mb-1">Generated Prompt (editable)</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-3 rounded border font-mono text-sm"
        />
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => navigator.clipboard.writeText(prompt)}
            className="px-3 py-1 border rounded text-sm"
          >
            Copy
          </button>
          <button
            onClick={() => setPrompt(autoPrompt)}
            className="px-3 py-1 border rounded text-sm"
            title="Reset to generated prompt from selected options"
          >
            Reset to generated
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Generate button */}
      <div className="flex gap-3">
        <button
          onClick={generateImage}
          disabled={isLoading}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          {isLoading ? "Generating..." : "Generate AI Image"}
        </button>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Your Generated Furniture</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
            <img src={previewUrl} alt="Generated furniture" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}