
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Brain, Users, Clock, Plus } from "lucide-react";
import ScriptGenerationTips from "@/components/ScriptGenerationTips";

interface ScriptMitraFormProps {
  topics: string[];
  styles: string[];
  languages: string[];
  lengths: string[];
  formData: any;
  showCustomTopic: boolean;
  isLoading: boolean;
  quotaTooltip?: string;
  onFormChange: (data: any) => void;
  onShowCustomTopic: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

const ScriptMitraForm: React.FC<ScriptMitraFormProps> = ({
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
}) => {
  function handleTopicChange(value: string) {
    onFormChange({
      ...formData,
      topic: value,
      customTopic: ""
    });
    onShowCustomTopic(false);
  }

  return (
    <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl mb-6 transition-all duration-500 glow-hover-card">
      <CardContent className="p-6 my-0 px-[37px] py-[29px]">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Topic Selection */}
            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                Choose a Topic
              </Label>
              <Select value={formData.topic} onValueChange={handleTopicChange}>
                <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Select your topic..." />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                  {topics.map(topic => 
                    <SelectItem key={topic} value={topic} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      {topic}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            {/* Style Selection */}
            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                Script Style
              </Label>
              <Select value={formData.style} onValueChange={value => onFormChange({
              ...formData,
              style: value
            })}>
                <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Select your style..." />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                  {styles.map(style => <SelectItem key={style} value={style} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                      {style}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {/* Language */}
            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                Language
              </Label>
              <Select value={formData.language} onValueChange={value => onFormChange({
              ...formData,
              language: value
            })}>
                <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Select language..." />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                  {languages.map(language => <SelectItem key={language} value={language} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                      {language}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {/* Length */}
            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                Duration
              </Label>
              <Select value={formData.length} onValueChange={value => onFormChange({
              ...formData,
              length: value
            })}>
                <SelectTrigger className="h-10 border-2 border-blue-300/60 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Select duration..." />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-2 border-blue-300/60 dark:border-blue-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm">
                  {lengths.map(length => <SelectItem key={length} value={length} className="rounded-md hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                      {length}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Tooltip for quota/cooldown */}
          <div className="mb-1 min-h-[1.7em] text-center">
            {!!quotaTooltip && (
              <span className="text-red-500 dark:text-yellow-300 text-base font-medium transition">{quotaTooltip}</span>
            )}
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="notion-button-primary flex-1 h-11 text-base font-semibold">
              {isLoading ? <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  {quotaTooltip ? quotaTooltip : "Generating Script..."}
                </div> : <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Script
                </div>}
            </Button>
            <Button type="button" variant="outline" onClick={onReset} className="notion-button-secondary h-11 px-6 text-base font-semibold bg-black text-white border-black hover:bg-black focus:bg-black hover:text-white focus:text-white dark:bg-gray-900 dark:text-white dark:border-blue-800">
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScriptMitraForm;
