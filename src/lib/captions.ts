
import { toast } from "sonner";

export function copyCaptions(captions: string[]) {
  if (!captions || captions.length === 0) return;
  navigator.clipboard.writeText(captions.join("\n\n")).then(() => {
    toast.success("Copied all captions!");
  });
}
