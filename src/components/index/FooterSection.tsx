
import React from "react";

const FooterSection = () => (
  <div className="text-center py-8 border-t border-white/20 dark:border-gray-700">
    <p className="text-white/80 dark:text-gray-400 text-base md:text-lg mb-2">
      Part of the <span className="font-semibold text-white dark:text-[#29fcd9]">Automation Mitra</span> ecosystem for Indian financial creators.
    </p>
    <p className="text-sm text-white/60 dark:text-gray-300">
      &copy; {new Date().getFullYear()} Automation Mitra. All rights reserved.
    </p>
  </div>
);

export default FooterSection;
