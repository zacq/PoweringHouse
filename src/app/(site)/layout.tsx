import { Nav } from "@/components/nav";
import { FreedomBand } from "@/components/freedom-band";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <FreedomBand />
    </>
  );
}
