import DonateButton from "@/components/shared/donate-button";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import GradualSpacing from "@/components/ui/gradual-spacing";
import ShineBorder from "@/components/ui/shine-border";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <main className="flex items-center justify-center">
        <ShineBorder
          className="flex h-fit flex-col items-center justify-center gap-8 overflow-hidden rounded-lg border bg-transparent p-16 dark:bg-transparent md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <GradualSpacing
            className="font-display text-center text-4xl font-bold -tracking-widest md:text-7xl md:leading-[5rem]"
            text="Easy, Fast, and Secure"
          />
          <section>
            <DonateButton />
          </section>
        </ShineBorder>
      </main>

      <Footer />
    </div>
  );
}
