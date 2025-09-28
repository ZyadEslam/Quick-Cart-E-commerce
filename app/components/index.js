import { lazy } from "react";
// General Components ///////////
export const ProductsGroup = lazy(() =>
  import("./productComponents/ProductsGroup")
);
export { default as ProductCard } from "./productComponents/ProductCard";
export { default as Footer } from "./Footer";
export { default as AuthButtons } from "./AuthButton";
export { default as Provider } from "./providers/AuthProvider";
export { default as ToggleMenuBtn } from "./ToggleMenuBtn";
export { default as UserNav } from "./UserNav";
export { default as DashboardSideNav } from "./dashboardComponents/DashboardSideNav";

// Home Components ///////////////
export { default as FeaturedProductCard } from "./homeComponents/FeaturedProductCard";
export { default as SubscriptionOffer } from "./homeComponents/SubscriptionOffer";
export const FeaturedProductsList = lazy(() =>
  import("./homeComponents/FeaturedProductsList")
);
export const AdvSlider = lazy(() => import("./homeComponents/AdvSlider"));
export const AdvBar = lazy(() => import("./homeComponents/AdvBar"));

// About Components //////////////
export { default as HeroSection } from "../components/aboutComponents/HeroSection";
export { default as MissionSection } from "../components/aboutComponents/MissionSection";

export const ValuesSection = lazy(() =>
  import("../components/aboutComponents/ValuesSection")
);
export const TeamSection = lazy(() =>
  import("../components/aboutComponents/TeamSection")
);
export const ContactUsSection = lazy(() =>
  import("../components/aboutComponents/ContactUsSection")
);

//Contact Components //////////////////
export { default as ContactHeroSection } from "./contactComponents/ContactHeroSection";
export { default as ContactForm } from "./contactComponents/ContactForm";
export const ContactInfo = lazy(() =>
  import("./contactComponents/ContactInfo")
);

// Wishlist Components ///////////////////
export const WishlistTable = lazy(() =>
  import("./wishlistComponents/WishlistTable")
);

// Cart Components ///////////////////
export const CartTable = lazy(() => import("./cartComponents/CartTable"));
