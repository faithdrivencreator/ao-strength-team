/**
 * Studio uses its own root-level shell; bypass the site Header/Footer/Cart.
 * The Studio renders full-screen without our brand chrome.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
