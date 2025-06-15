
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Film, MessageSquare, Hash, FileText } from "lucide-react";

interface StructuredOutputProps {
  data: {
    title?: string;
    caption?: string;
    hashtags?: string;
    description?: string;
  };
  copy: (text: string, idx: number) => void;
  copiedIdx: number | null;
}

export default function StructuredOutput({ data, copy, copiedIdx }: StructuredOutputProps) {
  if (!data.title && !data.caption && !data.hashtags && !data.description) {
    return null;
  }

  const sections = [
    {
      id: 'title',
      title: '#1 – 🎬 Video Title',
      content: data.title,
      icon: Film,
      gradient: 'from-purple-500 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10'
    },
    {
      id: 'caption',
      title: '#2 – 📝 Caption',
      content: data.caption,
      icon: MessageSquare,
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10'
    },
    {
      id: 'hashtags',
      title: '#3 – 🔖 Hashtags',
      content: data.hashtags,
      icon: Hash,
      gradient: 'from-green-500 to-green-700',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10'
    },
    {
      id: 'description',
      title: '#4 – 📄 Description',
      content: data.description,
      icon: FileText,
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10'
    }
  ].filter(section => section.content);

  return (
    <div className="w-full mt-10 space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 font-playfair">
          Your Generated Content
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
          Professional content ready for your social media
        </p>
      </div>

      {sections.map((section, index) => (
        <Card 
          key={section.id}
          className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/80 border-0 shadow-xl rounded-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <CardContent className="p-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${section.gradient} shadow-md`}>
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 font-display">
                {section.title}
              </h3>
            </div>

            {/* Content Box */}
            <div className={`bg-gradient-to-br ${section.bgGradient} rounded-xl p-6 mb-4 border border-gray-200/60 dark:border-gray-700/50 shadow-inner relative group-hover:shadow-lg transition-all duration-300`}>
              <div className="text-gray-800 dark:text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>

            {/* Copy Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => copy(section.content || '', index)}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 relative"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                {copiedIdx === index && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white rounded text-xs font-semibold animate-bounce-slow">
                    ✅ Copied!
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Copy All Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={() => {
            const allContent = sections
              .map(section => `${section.title}\n${section.content}`)
              .join('\n\n');
            copy(allContent, -1);
          }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Copy className="w-5 h-5 mr-2" />
          Copy All Content
          {copiedIdx === -1 && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white rounded text-xs font-semibold animate-bounce-slow">
              ✅ All Copied!
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
