
import { toast } from "sonner";

export function copyHashtags(tags: string[]) {
  if (!tags || tags.length === 0) return;
  navigator.clipboard.writeText(tags.map((t) => `#${t}`).join(" ")).then(() => {
    toast.success("Copied all hashtags!");
  });
}
