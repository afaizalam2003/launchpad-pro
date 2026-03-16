import { supabase } from "@/lib/supabase";

export async function logTemplateDeploy(
  templateName: string,
  userEmail: string | undefined
): Promise<void> {
  try {
    await supabase.from("activity_logs").insert({
      event: `Template deployed: ${templateName}`,
      user_email: userEmail ?? "anonymous",
      status: "success",
    });
  } catch {
    // Fail silently - don't block user flow
  }
}
