/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT DATA — the ONE file to edit.
 *
 *  • TEXT:   change the name, prices, description, benefits, FAQs, etc. below.
 *  • IMAGES: either (a) replace the files in /public/products/ keeping the same
 *            names, OR (b) change the `src` paths in the `images` array below.
 *            `src` can be a /public path ("/products/pone.jpeg") or a full URL.
 *            Product images are square (1:1).
 *
 *  To add another product later: add a new object to the `products` array with
 *  a unique `slug`, then read it with getProduct(slug).
 * ─────────────────────────────────────────────────────────────────────────
 */
import {
  IconLeaf,
  IconShieldCheck,
  IconDroplet,
  IconSparkles,
} from "@/components/icons";
import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "dar-ul-shifa-skin-oil",
    name: "دارالشفا اسکن آئل",
    // The big marketing claim shown under the title (client-provided).
    tagline:
      "خارش، چنبل، سورائیسز اور اسکن الرجی کے لیے پاکستان کا نمبر 1 آئل",
    description:
      "دارالشفا اسکن آئل قدرتی جڑی بوٹیوں اور خالص روغنی اجزا سے تیار کردہ ایک خاص ہربل فارمولا ہے، جو خارش، چنبل، داد، سورائسز اور خشک جلد کی شکایات میں مددگار ثابت ہوتا ہے۔ اس میں کوئی اسٹیرائڈ، خوشبو یا نقصان دہ کیمیکل شامل نہیں۔",
    // Edit image paths here, or just replace the files in /public/products/.
    images: [
      { src: "/products/pone.jpeg", alt: "دارالشفا اسکن آئل کی بوتل" },
      { src: "/products/ptwo.jpeg", alt: "دارالشفا اسکن آئل کے فوائد" },
    ],
    // Single 100 ml pack.
    variants: [
      { id: "100ml", label: "100 ML", price: 1500, compareAtPrice: 2500 },
    ],
    rating: 4.8,
    reviewCount: 2347,
    highlights: [
      "100% natural herbal formula",
      "No steroids or chemicals",
      "For itching, eczema & psoriasis",
      "Cash on delivery available",
    ],
    benefits: [
      {
        icon: <IconDroplet className="text-brand" />,
        title: "خارش سے نجات",
        description:
          "خشک اور خارش زدہ جلد کو فوری سکون دیتا ہے اور جلن کم کرنے میں مدد دیتا ہے۔",
      },
      {
        icon: <IconShieldCheck className="text-brand" />,
        title: "چنبل اور داد کا خاتمہ",
        description:
          "ضدی داد اور چنبل کے دھبوں پر قدرتی اجزا کے ساتھ کام کرتا ہے۔",
      },
      {
        icon: <IconSparkles className="text-brand" />,
        title: "سورائسز میں مددگار",
        description:
          "متاثرہ جلد کو نرم رکھتا ہے اور خشکی و کھردری کیفیت میں آرام دیتا ہے۔",
      },
      {
        icon: <IconLeaf className="text-brand" />,
        title: "الرجی اور خشکی",
        description:
          "اسکن الرجی اور خشک جلد کے لیے خاص ہربل آئل — روزانہ استعمال کے لیے محفوظ۔",
      },
    ],
    usage: [
      "متاثرہ جگہ کو نیم گرم پانی سے دھو کر خشک کر لیں۔",
      "تیل کے چند قطرے دن میں دو بار لگائیں اور ہلکے ہاتھ سے مالش کریں۔",
      "بہتر نتائج کے لیے روزانہ باقاعدگی سے استعمال کریں۔",
      "کم از کم 3 سے 4 ہفتے مسلسل استعمال جاری رکھیں۔",
    ],
    ingredients: ["نیم", "کلونجی", "زیتون کا تیل", "تلسی", "ایلو ویرا"],
    faqs: [
      {
        question: "کیا یہ تیل ہر قسم کی جلد کے لیے محفوظ ہے؟",
        answer:
          "جی ہاں۔ یہ 100% قدرتی ہربل آئل ہے جس میں کوئی اسٹیرائڈ یا نقصان دہ کیمیکل شامل نہیں۔ پہلی بار استعمال سے پہلے تھوڑی مقدار جلد پر لگا کر ٹیسٹ کر لیں۔",
      },
      {
        question: "نتائج کتنے دن میں نظر آتے ہیں؟",
        answer:
          "ہربل فارمولے بتدریج کام کرتے ہیں۔ زیادہ تر صارفین کو باقاعدہ استعمال کے 3 سے 4 ہفتوں میں واضح فرق محسوس ہوتا ہے۔",
      },
      {
        question: "کیا اس کے کوئی سائیڈ ایفیکٹس ہیں؟",
        answer:
          "یہ قدرتی اجزا سے تیار کردہ ہے اور عام طور پر محفوظ ہے۔ اگر آپ کو کسی جڑی بوٹی سے الرجی ہو یا کوئی جلدی بیماری شدید ہو تو ڈاکٹر سے مشورہ کریں۔",
      },
      {
        question: "کیا کیش آن ڈیلیوری دستیاب ہے؟",
        answer:
          "جی ہاں۔ آپ آرڈر موصول ہونے پر نقد ادائیگی کر سکتے ہیں۔ بس آرڈر کریں، ہماری ٹیم آپ سے تصدیق کر لے گی۔",
      },
    ],
    testimonials: [
      {
        name: "عمران شہزاد",
        location: "لاہور",
        rating: 5,
        quote:
          "برسوں سے خارش کا مسئلہ تھا۔ مسلسل استعمال سے کافی آرام آیا، تیل لگانے میں بھی آسان ہے۔",
      },
      {
        name: "نسیم اختر",
        location: "فیصل آباد",
        rating: 5,
        quote:
          "چنبل کے دھبوں کے لیے استعمال کیا، فرق محسوس ہوا۔ ڈیلیوری بھی جلدی ہوئی اور کیش پر ادائیگی کی۔",
      },
      {
        name: "رابعہ خان",
        location: "اسلام آباد",
        rating: 4,
        quote:
          "قدرتی اجزا ہیں جنہیں میں پہچانتی ہوں۔ خشک جلد کے لیے اچھا رہا اور آرڈر کا عمل آسان تھا۔",
      },
    ],
  },
];

/** The product shown on the homepage. */
export function getDefaultProduct(): Product {
  return products[0];
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
