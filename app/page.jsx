import ProductTabs from "./componets/ProductTabs";
import FAQPage from "./componets/faq";
import Sponsors from "./componets/Sponsors";
import OrderTracking from "./componets/OrderTracking";
import StaffPage from "./staff/page";
import BlogSection from "./componets/BlogSection";
import HomeSlider from "./componets/HomeSlider";
async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/packages`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <HomeSlider></HomeSlider>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 py-3 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">
            eStampBD.com
          </h1>

          <p className=" text-sm md:text-lg">
            স্ট্যাম্প, কোর্ট ফি ও প্রয়োজনীয় লিগ্যাল ডকুমেন্ট
            সহজেই অর্ডার করুন
          </p>
        </div>
      </section>
     


      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <ProductTabs products={products} />
      </section>

      {/* Existing Sections */}
      <StaffPage></StaffPage>
      <BlogSection></BlogSection>

      <Sponsors> </Sponsors>

      <OrderTracking> </OrderTracking>

      <FAQPage> </FAQPage>

    </main>
  );
}