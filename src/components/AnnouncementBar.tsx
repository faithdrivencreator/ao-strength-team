import { FREE_SHIPPING_THRESHOLD_CENTS, dollars } from "@/lib/shipping";

const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";
const LAUNCH_LABEL = process.env.NEXT_PUBLIC_LAUNCH_DATE_LABEL || "June 2";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-black border-b border-white/10">
      <div className="w-full px-8 md:px-16 lg:px-20 min-h-[56px] sm:min-h-9 flex items-center justify-center">
        <p className="font-mono text-[11px] font-normal tracking-[0.15em] uppercase text-white/80 text-center">
          {PURCHASE_LOCKED ? (
            <>
              OFFICIAL DROP · {LAUNCH_LABEL}
              <span className="text-white/30 mx-2">//</span>
              GET ON THE LIST FOR FIRST ACCESS
            </>
          ) : (
            <>
              FREE US SHIPPING OVER {dollars(FREE_SHIPPING_THRESHOLD_CENTS)}
              <span className="text-white/30 mx-2">//</span>
              LAUNCH DROP PRICING IS LIVE
            </>
          )}
        </p>
      </div>
    </div>
  );
}
