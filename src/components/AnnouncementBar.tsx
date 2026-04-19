export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-black border-b border-white/10">
      <div className="w-full px-8 md:px-16 lg:px-20 py-2.5">
        <p className="font-mono text-[11px] font-normal tracking-[0.15em] uppercase text-white/80 text-center">
          FREE SHIPPING ON ORDERS OVER $75 <span className="text-white/30 mx-2">//</span> JOIN THE STRENGTH TEAM
        </p>
      </div>
    </div>
  );
}
