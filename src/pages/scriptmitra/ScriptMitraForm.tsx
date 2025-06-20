
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ScriptMitraFormProps {
  topics: string[];
  styles: string[];
  languages: string[];
  lengths: string[];
  formData: {
    topic: string;
    customTopic: string;
    style: string;
    language: string;
    length: string;
  };
  showCustomTopic: boolean;
  isLoading: boolean;
  quotaTooltip?: string;
  onFormChange: (data: any) => void;
  onShowCustomTopic: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export default function ScriptMitraForm({
  topics,
  styles,
  languages,
  lengths,
  formData,
  showCustomTopic,
  isLoading,
  quotaTooltip = "",
  onFormChange,
  onShowCustomTopic,
  onSubmit,
  onReset
}: ScriptMitraFormProps) {

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    
    if (field === "topic") {
      if (value === "Choose custom topic") {
        onShowCustomTopic(true);
      } else {
        onShowCustomTopic(false);
        newData.customTopic = "";
      }
    }
    
    onFormChange(newData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
      {/* Topic Selection */}
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-white font-semibold">Choose a Topic</Label>
        <Select 
          value={formData.topic} 
          onValueChange={(value) => handleInputChange("topic", value)}
        >
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select topic for your script" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic} className="text-white hover:bg-slate-700">
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Topic Input */}
      {showCustomTopic && (
        <div className="space-y-2">
          <Label htmlFor="customTopic" className="text-white font-semibold">Enter Your Custom Topic</Label>
          <Input
            id="customTopic"
            value={formData.customTopic}
            onChange={(e) => handleInputChange("customTopic", e.target.value)}
            placeholder="e.g., Emergency Fund Planning"
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>
      )}

      {/* Style Selection */}
      <div className="space-y-2">
        <Label htmlFor="style" className="text-white font-semibold">Writing Style</Label>
        <Select 
          value={formData.style} 
          onValueChange={(value) => handleInputChange("style", value)}
        >
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Choose your preferred style" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {styles.map((style) => (
              <SelectItem key={style} value={style} className="text-white hover:bg-slate-700">
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language Selection */}
      <div className="space-y-2">
        <Label htmlFor="language" className="text-white font-semibold">Language</Label>
        <Select 
          value={formData.language} 
          onValueChange={(value) => handleInputChange("language", value)}
        >
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {languages.map((language) => (
              <SelectItem key={language} value={language} className="text-white hover:bg-slate-700">
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Length Selection */}
      <div className="space-y-2">
        <Label htmlFor="length" className="text-white font-semibold">Video Length</Label>
        <Select 
          value={formData.length} 
          onValueChange={(value) => handleInputChange("length", value)}
        >
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select video duration" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {lengths.map((length) => (
              <SelectItem key={length} value={length} className="text-white hover:bg-slate-700">
                {length}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quota tooltip */}
      {quotaTooltip && (
        <div className="text-center">
          <span className="text-yellow-300 text-sm font-medium">{quotaTooltip}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" />
                      Generate Script
                    </>
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {quotaTooltip && <TooltipContent>{quotaTooltip}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
