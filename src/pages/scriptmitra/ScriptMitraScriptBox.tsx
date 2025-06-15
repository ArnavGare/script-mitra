
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Sparkles } from "lucide-react";
import ScriptGenerationTips from "@/components/ScriptGenerationTips";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScriptMitraScriptBoxProps {
  script: string;
  formData: any;
  onCopy: () => void;
  onDownload: () => void;
  formatScriptWithColors: (script: string) => React.ReactNode[];
}

const ScriptMitraScriptBox: React.FC<ScriptMitraScriptBoxProps> = ({
  script,
  formData,
  onCopy,
  onDownload,
  formatScriptWithColors,
}) => {
  if (!script) return null;
  return (
    <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl transition-all duration-500 glow-hover-card">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-500" />
          Your Generated Script
        </h3>
        <ScriptGenerationTips />
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/60 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 mb-4 border border-blue-200/60 dark:border-blue-800/50 shadow-inner">
          <ScrollArea className="h-80 w-full pr-4">
            <div className="text-gray-800 dark:text-gray-300 font-medium text-sm leading-relaxed">
              {formatScriptWithColors(script)}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onCopy}
            className="notion-button-primary flex-1 h-10 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Script
          </Button>
          <Button
            onClick={onDownload}
            variant="outline"
            className="notion-button-secondary flex-1 h-10 bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 dark:bg-gray-900 dark:border-blue-800 dark:text-blue-100 dark:hover:bg-blue-800/70"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as .txt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default ScriptMitraScriptBox;
