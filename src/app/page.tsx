import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import AssetsList from "@/components/shared/assets-list";
import DonateButton from "@/components/shared/donate-button";
import SwapButton from "@/components/shared/swap-button";
import GradualSpacing from "@/components/ui/gradual-spacing";
import ShineBorder from "@/components/ui/shine-border";
import { fetchAssets } from "@/lib/services/actions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <main>
        <ShineBorder
          className="flex h-fit flex-col items-center justify-center gap-8 overflow-hidden rounded-lg border bg-transparent p-16 pt-6 dark:bg-transparent md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <GradualSpacing
            className="font-display text-center text-2xl font-bold -tracking-widest md:text-6xl md:leading-[5rem]"
            text="Easy, Fast, and Secure"
          />

          <AssetsList fetchAssets={fetchAssets} />

          <section className="flex w-full items-center justify-end gap-4">
            <DonateButton />
            <SwapButton />
          </section>
        </ShineBorder>
      </main>

      <Footer />
    </div>
  );
}
