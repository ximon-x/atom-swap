import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
}
