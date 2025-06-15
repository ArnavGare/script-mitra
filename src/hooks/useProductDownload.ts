
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Download logic for StorePage product files.
 * Handles both the "Viral Script Hooks" public link and all other products.
 */
export function useProductDownload() {
  const downloadFile = async (item: any, { onSuccess, onError }: { onSuccess?: () => void; onError?: (e: Error) => void } = {}) => {
    // Special case for "30 Viral Script Hooks" product: use direct public link and force download via Blob
    if (
      item.title &&
      item.title.trim().toLowerCase() === "30 viral script hooks"
    ) {
      try {
        // Log in downloads table (anonymous users allowed)
        const { error: logError } = await supabase
          .from("product_downloads")
          .insert({
            product_id: item.id,
            user_id: null,
          });
        if (logError) {
          console.warn("Logging download failed:", logError);
        }
        const directUrl =
          "https://ypqbygpqthtjtkhoztsi.supabase.co/storage/v1/object/public/product_files//30%20Viral%20Script%20Hooks.pdf";
        // Fetch as blob then trigger actual download
        const response = await fetch(directUrl);
        if (!response.ok) throw new Error("Could not download file.");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "30 Viral Script Hooks.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        toast({
          title: "Download started",
          description: item.title + " file is being downloaded.",
        });
        onSuccess && onSuccess();
      } catch (e: any) {
        toast({
          title: "Download failed",
          description: e.message || "Download error.",
          variant: "destructive",
        });
        onError && onError(e);
      }
      return;
    }

    // Usual product logic (check file_path)
    if (!item.file_path) {
      toast({
        title: "Download not available",
        description: "No file path set for resource.",
      });
      onError && onError(new Error("No file_path for item."));
      return;
    }
    try {
      // Get signed download URL
      const { data, error } = await supabase.storage
        .from("product_files")
        .createSignedUrl(item.file_path, 60);

      if (error || !data?.signedUrl) {
        toast({
          title: "Download failed",
          description:
            "Couldn't get file download URL from storage. The file may not exist in the storage bucket, or the path is incorrect.",
          variant: "destructive",
        });
        onError && onError(
          new Error(
            "Storage signedUrl error: " +
              (error?.message || "no signed url returned")
          )
        );
        return;
      }

      // Log download
      const { error: logError } = await supabase.from("product_downloads").insert({
        product_id: item.id,
        user_id: null,
      });
      if (logError) {
        console.warn("Logging download failed:", logError);
      }

      // Force browser download using Blob
      const fileResponse = await fetch(data.signedUrl);
      if (!fileResponse.ok) throw new Error("Could not download file (fetch failed).");
      const fileBlob = await fileResponse.blob();
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.file_name || item.title;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);

      toast({
        title: "Download started",
        description: item.title + " file is being downloaded.",
      });
      onSuccess && onSuccess();
    } catch (e: any) {
      toast({
        title: "Download failed",
        description: e.message || "Download error.",
        variant: "destructive",
      });
      onError && onError(e);
    }
  };

  return { downloadFile };
}
