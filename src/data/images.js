import cloudinaryMap from './cloudinary-map.json';

export const c = (localPath) => cloudinaryMap[localPath] || localPath;

export const heroImages = [
  c('/images/hero-ingredients-01.png'),
  c('/images/hero-ingredients-02.png'),
  c('/images/hero-ingredients-03.png'),
];

export const homeSliderImages = [
  { desktop: c('/images/new_homepage_sliding_img1_laptop.png'), mobile: c('/images/new_homepage_sliding_img1_mobile.png') },
  { desktop: c('/images/new_homepage_sliding_img2_laptop.png'), mobile: c('/images/new_homepage_sliding_img2_mobile.png') },
  { desktop: c('/images/new_homepage_sliding_img3_laptop.png'), mobile: c('/images/new_homepage_sliding_img3_mobile.png') },
  { desktop: c('/images/new_homepage_sliding_img4_laptop.png'), mobile: c('/images/new_homepage_sliding_img4_mobile.png') },
];

export const categoryImages = {
  nuts: c('/images/category-nuts.webp'),
  dryFruits: c('/images/category-dry-fruits.webp'),
  seeds: c('/images/category-seeds.webp'),
  laddusSnacks: c('/images/category-laddus-snacks.webp'),
  honeyItems: c('/images/category-honey-items.webp'),
  dehydratedProduce: c('/images/category-dehydrated-produce.webp'),
  berries: c('/images/category-berries.webp'),
  combos: c('/images/category-combos.webp'),
};

export const productImages = {
  almonds: c('/images/product-almonds.png'),
  pistachios: c('/images/product-pistachios.png'),
  cashews: c('/images/product-cashews.png'),
  dates: c('/images/product-dates.png'),
  laddus: c('/images/product-laddus.png'),
  pantry: c('/images/hero-ingredients-03.png'),
  comboBanner: c('/images/home-combos-feature.webp'),
};

export { cloudinaryMap };
export default c;
