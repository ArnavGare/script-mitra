
import React from 'react';

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

  const sectionList = [
    {
      key: 'title',
      icon: '🎬',
      heading: 'Video Title',
      content: data.title,
      boxBg: 'bg-[#e3f7fb]',
      border: 'border-[#b5e8fc]',
    },
    {
      key: 'caption',
      icon: '📝',
      heading: 'Video Caption',
      content: data.caption,
      boxBg: 'bg-[#eee7fb]',
      border: 'border-[#cdbafc]',
    },
    {
      key: 'hashtags',
      icon: '🔖',
      heading: 'Hashtags',
      content: data.hashtags,
      boxBg: 'bg-[#f0f7f7]',
      border: 'border-[#bee2e7]',
    },
    {
      key: 'description',
      icon: '📄',
      heading: 'Video Description',
      content: data.description,
      boxBg: 'bg-[#f5f7fa]',
      border: 'border-[#bec9df]',
    },
  ].filter(section => section.content);

  return (
    <div className="w-full mt-9 animate-fade-in space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold font-playfair text-gray-800 dark:text-gray-200">
          Your Generated Content
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Copy and use across social media
        </p>
      </div>
      {sectionList.map((section, idx) => (
        <div
          key={section.key}
          className={`
            ${section.boxBg}
            ${section.border}
            border shadow-md rounded-2xl p-6 md:p-7 
            flex flex-col items-start gap-2 transition-transform duration-300
            relative
          `}
          style={{
            animation: `fadeInUp 0.8s cubic-bezier(.40,.8,.25,1.1) both`,
            animationDelay: `${idx * 0.13 + 0.1}s`
          }}
        >
          <h2
            style={{
              color: "#00C2FF",
              marginBottom: "8px",
              fontSize: "1.17rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "7px"
            }}
            className="font-display"
          >
            <span style={{ fontSize: "1.23em" }}>{section.icon}</span>
            {section.heading}
          </h2>
          {section.key === "hashtags" ? (
            <p
              style={{
                fontSize: "15px",
                background: "#f7f7f7",
                padding: "12px",
                borderRadius: "8px",
                wordBreak: "break-word",
                fontFamily: "'Inter',sans-serif"
              }}
              className="text-gray-700 w-full select-text"
            >
              {section.content}
            </p>
          ) : (
            <p
              style={{
                fontSize: section.key === "title" ? "18px" : "16px",
                fontWeight: section.key === "title" ? 500 : 400,
                lineHeight: "1.6",
                margin: 0,
                fontFamily: "'Inter',sans-serif"
              }}
              className="text-gray-800 w-full select-text"
            >
              {section.content}
            </p>
          )}
          <button
            className="
              absolute top-4 right-5 text-cyan-600 bg-white/75 hover:bg-cyan-100 shadow py-1 px-3 rounded-md text-xs font-medium focus:outline-none active:scale-95 transition
              flex items-center gap-1
            "
            onClick={() => copy(String(section.content), idx)}
            type="button"
            aria-label={`Copy ${section.heading}`}
          >
            {copiedIdx === idx ? <>✅ Copied!</> : <>Copy</>}
          </button>
        </div>
      ))}
    </div>
  );
}
