import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  نورپارس — تک‌صفحه‌ای شرکت پنجره
 *  تیره، ادیتوریال و الهام‌گرفته از طبیعت؛ کاملاً فارسی و راست‌چین
 * ------------------------------------------------------------------ */

type NavLink = { label: string; href: string };

const NAV: NavLink[] = [
  { label: "پنجره‌ها", href: "#windows" },
  { label: "آسایش", href: "#comfort" },
  { label: "نمونه‌کارها", href: "#projects" },
  { label: "مراحل کار", href: "#process" },
  { label: "دربارهٔ ما", href: "#about" },
  { label: "پرسش‌های متداول", href: "#faq" },
];

type Solution = {
  n: string;
  title: string;
  text: string;
  points: string[];
  image: string;
};

const SOLUTIONS: Solution[] = [
  {
    n: "۰۱",
    title: "تعویض پنجره‌های فرسوده",
    text: "تعویض پنجره‌های قدیمی، درزدار یا بخارکرده با حفظ شخصیت معماری خانهٔ شما؛ با روش چهارچوب کامل یا درج.",
    points: ["دو روش تعویض: چهارچوب کامل و درج", "تطبیق پروفیل با ساختمان‌های قدیمی", "بازسازی قرنیز و ظرافت‌کاری داخلی"],
    image: "images/sol-replacement.jpg",
  },
  {
    n: "۰۲",
    title: "نصب در ساختمان نوساز",
    text: "بازشوهای جدید، الحاقیه‌ها و بازسازی‌ها؛ چهارچوب‌بندی، فلاشینگ و آب‌بندی برای دهه‌ها دوام.",
    points: ["تقویت سازه‌ای بازشو", "فلاشینگ و لایهٔ ضد رطوبت", "هماهنگی دقیق با پیمانکار"],
    image: "images/belief.jpg",
  },
  {
    n: "۰۳",
    title: "ارتقای بهره‌وری انرژی",
    text: "شیشه‌های دوجداره و سه‌جدارهٔ کم‌گسیل (Low-E) با گاز آرگون؛ گرم‌تر در زمستان و آرام‌تر در تابستان.",
    points: ["شیشه با استاندارد ملی ایران", "دوجداره و سه‌جداره", "کاهش محسوس قبض گاز و برق"],
    image: "images/sol-energy.jpg",
  },
  {
    n: "۰۴",
    title: "پنجره‌های سفارشی",
    text: "لولایی، ثابت، کشویی، ایوان و قوس‌دار؛ دقیقاً به اندازهٔ هر بازشو ساخته می‌شود.",
    points: ["چوب، UPVC و آلومینیوم ترموبریک", "فرم و شبکه‌بندی سفارشی", "یراق‌آلات برنجی یا برنزی"],
    image: "images/proj-loft.jpg",
  },
];

const WHY = [
  {
    title: "نصابان رسمی و بیمه‌شده",
    text: "همهٔ نصب‌ها را تیم‌های آموزش‌دیدهٔ خودمان انجام می‌دهیم، نه پیمانکار دست دوم.",
  },
  {
    title: "پیش‌فاکتور شفاف و مکتوب",
    text: "قیمت مصالح، اجرت و پرداخت‌کاری ردیف به ردیف نوشته می‌شود؛ بدون هزینهٔ پنهان.",
  },
  {
    title: "احترام به خانهٔ شما",
    text: "پوشش کف، کنترل گرد و خاک و تحویل تمیز، بخشی جدایی‌ناپذیر هر پروژه است.",
  },
  {
    title: "ضمانت‌نامهٔ کتبی اجرا",
    text: "علاوه بر گارانتی سازنده، کیفیت نصب ما هم ضمانت‌نامهٔ کتبی دارد.",
  },
];

type Project = { title: string; meta: string; image: string };

const PROJECTS: Project[] = [
  { title: "ویلای جنگلی کردان", meta: "پنجرهٔ سقفی · ۶ عدد", image: "images/proj-cabin.jpg" },
  { title: "خانهٔ قدیمی زعفرانیه", meta: "تعویض کامل · ۲۲ عدد", image: "images/proj-craftsman.jpg" },
  { title: "ویلای لواسان", meta: "کشویی بلند · ۴ لنگه", image: "images/proj-hills.jpg" },
  { title: "آپارتمان الهیه", meta: "پنجرهٔ ثابت · ۳ عدد", image: "images/proj-loft.jpg" },
];

const STEPS = [
  {
    n: "۰۱",
    title: "مشاوره و بازدید",
    text: "به خانهٔ شما می‌آیم، همهٔ بازشوها را می‌بینیم و دربارهٔ فرم، جنس و بودجه صحبت می‌کنیم.",
  },
  {
    n: "۰۲",
    title: "اندازه‌گیری دقیق",
    text: "هر بازشو با دقت اندازه و مستند می‌شود تا هر پنجره دقیقاً به همان ابعاد ساخته شود.",
  },
  {
    n: "۰۳",
    title: "سفارش و زمان‌بندی",
    text: "پیش‌فاکتور نهایی را تأیید می‌کنید؛ ما سفارش را ثبت و تاریخ نصب را قطعی می‌کنیم.",
  },
  {
    n: "۰۴",
    title: "نصب تمیز",
    text: "نصابان مجرب پنجرهٔ قدیمی را خارج و پنجرهٔ نو را نصب و آب‌بندی می‌کنند و فضا را همان‌طور که بود تحویل می‌دهند.",
  },
];

const COMFORT = [
  {
    title: "نورِ روز",
    text: "سطح شیشهٔ بیشتر و قاب‌های باریک‌تر، نور را تا عمق هر اتاق می‌رسانند.",
  },
  {
    title: "آسایش دمایی",
    text: "شیشه‌های عایق، لرزهٔ سرد کنار پنجره و گرمای طاقت‌فرسای تابستان را کم می‌کنند.",
  },
  {
    title: "سکوت",
    text: "شیشهٔ لمینت آکوستیک، همهمهٔ خیابان و محله را به زمزمه بدل می‌کند.",
  },
];

const FAQ = [
  {
    q: "اجرای یک پروژهٔ تعویض پنجره چقدر طول می‌کشد؟",
    a: "پس از آماده شدن پنجره‌ها، نصب در بیشتر واحدها بین یک تا سه روز تمام می‌شود. ساخت پنجره‌های سفارشی معمولاً سه تا شش هفته زمان می‌برد؛ بسته به فرم و جنس.",
  },
  {
    q: "آیا باید همهٔ پنجره‌ها را یک‌جا تعویض کنم؟",
    a: "خیر. بسیاری از مشتریان از اتاق‌های پرکاربرد شروع می‌کنند و باقی را مرحله‌بندی می‌کنند. ما برنامه‌ای می‌چینیم که یکدستی فرم و رنگ حفظ شود.",
  },
  {
    q: "پنجرهٔ نو واقعاً قبض انرژی را کمتر می‌کند؟",
    a: "تعویض پنجره‌های تک‌جداره یا فرسوده معمولاً اتلاف گرما و سرما و نفوذ صدا را به‌طور محسوس کاهش می‌دهد. میزان صرفه‌جویی به ساختمان، اقلیم و نوع پنجرهٔ انتخابی بستگی دارد.",
  },
  {
    q: "هماهنگی با مدیر ساختمان یا شهرداری با کیست؟",
    a: "در صورت نیاز، مدارک فنی و مجوزهای لازم را تهیه و با مدیریت ساختمان و مراجع مربوط هماهنگ می‌کنیم تا کار بدون دردسر پیش برود.",
  },
  {
    q: "با چه متریال‌هایی کار می‌کنید؟",
    a: "UPVC، آلومینیوم ترموبریک و چوب از برندهای معتبر داخلی و خارجی؛ متناسب با اقلیم و شخصیت خانهٔ شما.",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "پنجره‌ها",
    links: [
      { label: "خدمات", href: "#windows" },
      { label: "نور طبیعی", href: "#comfort" },
      { label: "نمونه‌کارها", href: "#projects" },
    ],
  },
  {
    title: "شرکت",
    links: [
      { label: "دربارهٔ ما", href: "#about" },
      { label: "مراحل کار", href: "#process" },
      { label: "پرسش‌های متداول", href: "#faq" },
    ],
  },
];

/* --------------------------- توابع کمکی --------------------------- */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** ظاهرشدن نرم هنگام رسیدن به دید */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[13px] font-medium text-sage">
      <span className="h-px w-7 bg-sage/60" />
      {children}
    </span>
  );
}

/* ------------------------------ نوار ناوبری ------------------------------ */

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/80 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-glow/40 bg-glow/10 text-glow transition-colors group-hover:bg-glow/20">
            <WindowIcon className="h-4 w-4" />
          </span>
          <span className="font-serif text-2xl font-semibold text-cream">
            نورپارس
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-cream-2/80 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#estimate"
            className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            برآورد رایگان
          </a>
          <button
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream md:hidden"
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        className={cx(
          "overflow-hidden border-t border-line/70 bg-ink/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-cream-2/90 transition-colors hover:bg-ink-2 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#estimate"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-cream px-5 py-3 text-center text-sm font-semibold text-ink"
          >
            برآورد رایگان
          </a>
        </nav>
      </div>
    </header>
  );
}

/* --------------------- پنجرهٔ نورِ تعاملی ---------------------- */

function LightWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 38 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-line bg-ink-2 shadow-2xl shadow-black/50"
      >
        <img
          src="images/hero.jpg"
          alt="نمای جنگل از پشت یک پنجرهٔ مدرن"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* شکوفای نورِ در حرکت */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: active ? 1 : 0.55,
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(231,199,154,0.45), rgba(231,199,154,0.12) 35%, transparent 60%)`,
          }}
        />
        {/* شبکهٔ قاب پنجره */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-cream/15" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/10" />
        {/* قرص خورشید شناور */}
        <div
          className="animate-float-slow pointer-events-none absolute h-16 w-16 rounded-full bg-glow/70 blur-xl transition-all duration-500"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)" }}
        />
        <span className="absolute bottom-4 start-4 rounded-full bg-ink/50 px-3 py-1.5 text-[12px] text-cream-2 backdrop-blur-sm">
          نور را با ماوس جابه‌جا کنید
        </span>
      </div>
      <div className="pointer-events-none absolute -bottom-6 -end-4 h-40 w-40 rounded-full bg-moss/30 blur-3xl" />
    </div>
  );
}

/* ------------------------------- قهرمان ------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-28">
        <Reveal className="order-2 lg:order-1">
          <SectionEyebrow>نور طبیعی و آسایش خانه</SectionEyebrow>
          <h1 className="mt-6 font-serif text-[2.9rem] leading-[1.15] text-cream sm:text-6xl lg:text-[4.4rem]">
            اتاق‌هایی که <span className="text-glow">با آفتاب</span> نفس می‌کشند.
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-cream-2/80">
            شیشه‌ای که خوب جاگذاری و خوب آب‌بندی شده باشد، حس خانه را از اساس
            عوض می‌کند: صبح‌های روشن‌تر، شب‌های آرام‌تر، دمایی یکنواخت‌تر و
            پیوندی ملایم و همیشگی با فضای سبز بیرون.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#estimate"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              دریافت برآورد رایگان
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-cream-2 transition-colors hover:border-glow/40 hover:text-cream"
            >
              دیدن نمونه‌کارها
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line/40">
            {[
              ["+۲۰", "سال سابقهٔ نصب"],
              ["+۴٬۸۰۰", "پنجرهٔ نصب‌شده"],
              ["۴٫۹ از ۵", "میانگین رضایت"],
            ].map(([stat, label]) => (
              <div key={label} className="bg-ink px-4 py-5">
                <div className="font-serif text-[1.65rem] text-cream">{stat}</div>
                <div className="mt-1 text-xs text-muted">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <LightWindow />
        </Reveal>
      </div>

      {/* درخشش ملایم خط افق */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-glow/30 to-transparent" />
    </section>
  );
}

/* ----------------------------- باور ما -------------------------------- */

function Belief() {
  return (
    <section id="about" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line">
            <img
              src="images/belief.jpg"
              alt="استادکار در حال نصب پنجره"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionEyebrow>باور ما</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
            منظرهٔ بهتر، از خانه آغاز می‌شود.
          </h2>
          <p className="mt-6 text-lg leading-9 text-cream-2/85">
            پنجره تنها بخشی از خانه است که هر روز از میانش به بیرون نگاه
            می‌کنید. ما پنجره‌ها را چنان تعویض و نصب می‌کنیم که نور، درختان و
            فصل‌های بیرون، بخشی از فضای زندگی شما شوند.
          </p>
          <p className="mt-4 leading-8 text-cream-2/70">
            نورپارس یک شرکت تخصصی پنجره‌های مسکونی در تهران است؛ از بازدید و
            اندازه‌گیری تا تأمین و نصب پنجره‌های تعویضی و نوساز، برای کسانی که
            به حس خانه در هفت صبح و در غروب آذرماه اهمیت می‌دهند.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["تعویض پنجره", "پنجره‌های سقفی", "ساختمان نوساز", "فرم‌های سفارشی"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-4 py-1.5 text-xs text-cream-2/80"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- آسایش ------------------------------- */

function Comfort() {
  return (
    <section id="comfort" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal>
          <SectionEyebrow>نور طبیعی و آسایش خانه</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
            پیوندی ملایم و همیشگی با طبیعت.
          </h2>
          <p className="mt-6 max-w-md leading-8 text-cream-2/75">
            فقط به واحدی که در دیوار می‌نشیند فکر نمی‌کنیم. شیشهٔ درست، بی‌صدا
            زندگی روزمره را دگرگون می‌کند؛ این‌ها تغییراتی است که حسشان خواهید کرد.
          </p>
          <dl className="mt-10 space-y-7">
            {COMFORT.map((c, i) => (
              <div key={c.title} className="flex gap-5">
                <div className="font-serif text-2xl text-glow/80">
                  {"۰۱۲"[i]}
                </div>
                <div>
                  <dt className="font-serif text-2xl text-cream">{c.title}</dt>
                  <dd className="mt-1.5 max-w-sm leading-8 text-cream-2/70">
                    {c.text}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] border border-line">
              <img
                src="images/why.jpg"
                alt="اتاقی روشن با پنجره‌های بزرگ رو به درختان"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute -start-5 -top-5 h-32 w-32 rounded-full bg-glow/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-6 -end-4 h-40 w-40 rounded-full bg-moss/30 blur-3xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- پنجره‌ها ------------------------------- */

function Windows() {
  return (
    <section id="windows" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>خدمات ما</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
            برای هر بازشو، پنجره‌ای متناسب.
          </h2>
          <p className="mt-5 leading-8 text-cream-2/75">
            از تعویض یک شیشهٔ بخارکرده تا دگرگونی کامل نمای خانه؛ محصول و
            پروفیل درست را با شخصیت خانهٔ شما هماهنگ می‌کنیم.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line/40 md:grid-cols-2">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="bg-ink">
              <article className="group flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute start-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
                    {s.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-3xl text-cream">{s.title}</h3>
                  <p className="mt-3 leading-8 text-cream-2/75">{s.text}</p>
                  <ul className="mt-5 space-y-2.5 pb-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm leading-7 text-cream-2/80">
                        <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-sage" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- چرا نورپارس --------------------------- */

function Why() {
  return (
    <section className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line">
            <img
              src="images/why.jpg"
              alt="اتاقی به‌تمام‌شده با پنجره‌های نو"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionEyebrow>چرا ما؟</SectionEyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-snug text-cream sm:text-4xl">
            چرا صاحب‌خانه‌ها پنجره‌های نورپارس را انتخاب می‌کنند
          </h2>
          <ul className="mt-9 space-y-px overflow-hidden rounded-2xl border border-line bg-line/30">
            {WHY.map((w) => (
              <li key={w.title} className="flex gap-4 bg-ink p-5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sage/40 text-sage">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-cream">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-cream-2/70">
                    {w.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- نمونه‌کارها ------------------------------ */

function Projects() {
  return (
    <section id="projects" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <SectionEyebrow>نمونه‌کارهای اخیر</SectionEyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
              پروژه‌هایی که به آن‌ها افتخار می‌کنیم.
            </h2>
          </div>
          <p className="max-w-sm leading-8 text-cream-2/70">
            چند خانه در تهران و اطراف آن که با نور تازه، جان دوباره گرفتند.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <article className="group overflow-hidden rounded-2xl border border-line bg-ink-2">
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl text-cream">{p.title}</h3>
                  <p className="mt-1 text-sm text-sage">{p.meta}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- مراحل کار ------------------------------- */

function Process() {
  return (
    <section id="process" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-line">
            <img
              src="images/hero.jpg"
              alt="نصب تمیز و دقیق پنجره"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <SectionEyebrow>مراحل کار</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
            از بازدید تا نصب.
          </h2>
          <div className="mt-10 space-y-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5">
                <div className="font-serif text-3xl text-glow/70">{s.n}</div>
                <div className="border-s border-line ps-5">
                  <h3 className="font-serif text-2xl text-cream">{s.title}</h3>
                  <p className="mt-1.5 leading-8 text-cream-2/70">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- پرسش‌ها --------------------------------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <Reveal>
          <SectionEyebrow>پرسش‌های متداول</SectionEyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
            پرسش‌ها، پاسخ‌داده‌شده.
          </h2>
          <p className="mt-5 max-w-sm leading-8 text-cream-2/70">
            هنوز مطمئن نیستید؟ کمی از خانه‌تان برایمان بگویید؛ یکی از طراحان
            ما حداکثر تا یک روز کاری پاسخ می‌دهد.
          </p>
          <a
            href="#estimate"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-glow"
          >
            هر پرسشی دارید بپرسید <ArrowIcon className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={100} className="space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-line bg-ink-2"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[1.35rem] leading-8 text-cream">{item.q}</span>
                  <span
                    className={cx(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-cream-2 transition-transform duration-300",
                      isOpen && "rotate-45 border-glow/50 text-glow"
                    )}
                  >
                    <PlusIcon />
                  </span>
                </button>
                <div
                  className={cx(
                    "grid transition-all duration-500 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-8 text-cream-2/75">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- برآورد ------------------------------ */

function Estimate() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="estimate" className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-line bg-gradient-to-b from-ink-2 to-ink">
          <div className="grid lg:grid-cols-2">
            <Reveal className="p-8 lg:p-14">
              <SectionEyebrow>برآورد رایگان</SectionEyebrow>
              <h2 className="mt-5 font-serif text-4xl leading-snug text-cream sm:text-5xl">
                بیایید منظرهٔ بعدی‌تان را قاب کنیم.
              </h2>
              <p className="mt-5 max-w-md leading-8 text-cream-2/75">
                کمی از خانه‌تان برایمان بگویید؛ یکی از کارشناسان ما حداکثر تا
                یک روز کاری دیگر برای هماهنگی بازدید با شما تماس می‌گیرد.
              </p>

              {sent ? (
                <div className="mt-9 rounded-2xl border border-sage/40 bg-sage/10 p-6">
                  <div className="flex items-center gap-3 text-sage">
                    <CheckIcon className="h-5 w-5" />
                    <span className="font-medium">ممنون! به‌زودی با شما تماس می‌گیریم.</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-cream-2/75">
                    یکی از کارشناسان نورپارس حداکثر تا یک روز کاری آینده پاسخ‌گوی شماست.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-9 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="نام و نام خانوادگی" placeholder="مریم احمدی" required />
                    <Field label="ایمیل" type="email" placeholder="you@example.com" required ltr />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="تلفن همراه" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" ltr />
                    <Field label="شهر / محله" placeholder="تهران، سعادت‌آباد" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-cream-2/80">
                      جزئیات پروژه
                    </label>
                    <textarea
                      rows={3}
                      placeholder="چند پنجره؟ هر نکته‌ای که لازم است بدانیم…"
                      className="w-full resize-none rounded-xl border border-line bg-ink px-4 py-3 text-sm leading-7 text-cream placeholder:text-faint focus:border-glow/50 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:w-auto"
                  >
                    ثبت درخواست برآورد
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </form>
              )}
            </Reveal>

            <Reveal delay={120} className="relative">
              <img
                src="images/estimate.jpg"
                alt="جلسهٔ مشاورهٔ طراحی کنار پنجره‌ای آفتابی"
                className="h-full min-h-[320px] w-full object-cover lg:min-h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent lg:bg-gradient-to-r" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
  ltr,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  ltr?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-cream-2/80">
        {label}
        {required && <span className="text-glow"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        dir={ltr ? "ltr" : undefined}
        className={cx(
          "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-faint focus:border-glow/50 focus:outline-none",
          ltr && "text-left"
        )}
      />
    </div>
  );
}

/* ------------------------------ پانویس ------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-line/60 pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-glow/40 bg-glow/10 text-glow">
                <WindowIcon className="h-4 w-4" />
              </span>
              <span className="font-serif text-2xl font-semibold text-cream">نورپارس</span>
            </a>
            <p className="mt-5 max-w-xs leading-8 text-cream-2/70">
              پنجره‌های بهتر، نصب خلوت و دقیق؛ تا نور، درختان و فصل‌ها بخشی از
              خانهٔ شما باشند.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-cream-2/80 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-muted">
              ارتباط با ما
            </h4>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-cream-2/80">
              <li>تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۲۴</li>
              <li>
                <a href="tel:+982126204814" className="transition-colors hover:text-cream">
                  ۰۲۱-۲۶۲۰۴۸۱۴
                </a>
              </li>
              <li>
                <a
                  href="mailto:salam@noorpars.ir"
                  className="transition-colors hover:text-cream"
                >
                  <span dir="ltr">salam@noorpars.ir</span>
                </a>
              </li>
              <li className="text-cream-2/60">شنبه تا پنجشنبه، ۹ تا ۱۸</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line/60 py-7 text-sm text-faint sm:flex-row sm:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p>© {new Date().getFullYear()} نورپارس. کلیهٔ حقوق محفوظ است.</p>
            <DevCredit />
          </div>
          <p className="text-cream-2/50">پنجره‌های مسکونی — تعویض و نصب</p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------- اعتبار طراحی و توسعه: کارن سافت ----------------- */

function DevCredit() {
  return (
    <a
      href="https://www.karen-soft.ir"
      target="_blank"
      rel="noopener noreferrer"
      className="kscredit"
      aria-label="طراحی و توسعه توسط کارن سافت — karen-soft.ir"
    >
      <span className="kscredit-label">طراحی و توسعه توسط</span>
      <span className="kscredit-mark" aria-hidden="true">
        <img src="images/karensoft/mark.png" alt="" width={30} height={30} loading="lazy" />
      </span>
      <span className="kscredit-words">
        <img
          className="kscredit-wm-fa"
          src="images/karensoft/wordmark-fa.png"
          alt="کارن سافت"
          width={80}
          height={20}
          loading="lazy"
        />
        <img
          className="kscredit-wm-en"
          src="images/karensoft/wordmark-en.png"
          alt="KarenSoft"
          width={85}
          height={10}
          loading="lazy"
        />
      </span>
    </a>
  );
}

/* ------------------------------ آیکن‌ها -------------------------------- */

function WindowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M12 4v16M3 12h18" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

/* ------------------------------- اپ --------------------------------- */

export default function App() {
  return (
    <div className="page-grain relative">
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <Belief />
        <Comfort />
        <Windows />
        <Why />
        <Projects />
        <Process />
        <Faq />
        <Estimate />
      </main>
      <Footer />
    </div>
  );
}
