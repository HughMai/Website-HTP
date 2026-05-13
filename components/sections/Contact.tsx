"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SITE } from "@/lib/site-data";

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Vui lòng nhập họ và tên (ít nhất 2 ký tự)." })
    .max(80, { message: "Họ tên quá dài (tối đa 80 ký tự)." }),
  phone: z
    .string()
    .trim()
    .regex(VN_PHONE_RE, {
      message: "Vui lòng nhập đúng 10 chữ số (ví dụ: 0901234567).",
    }),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email({ message: "Email không hợp lệ." }).optional()
  ),
  message: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().max(500, { message: "Nội dung quá dài (tối đa 500 ký tự)." }).optional()
  ),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Contact() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast({
        title: "Gửi thất bại",
        description:
          "Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gửi yêu cầu thành công!",
      description:
        "Cảm ơn Quý khách. Hưng Thành Phát sẽ liên hệ lại trong vòng 15 phút.",
    });
    reset();
  };

  return (
    <section
      id="lien-he"
      className="relative bg-brand py-20 text-white md:py-28"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 80% at 50% 100%, black 30%, transparent 75%)",
        }}
      />
      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
        >
          {/* Info */}
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              Tư Vấn — Báo Giá
            </span>
            <h2
              id="contact-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl"
            >
              Liên hệ ngay để nhận khảo sát miễn phí trong 24 giờ.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/75">
              Đội ngũ chuyên viên của Hưng Thành Phát sẵn sàng đến tận công
              trình, đo đạc và đề xuất giải pháp tối ưu — minh bạch về chi phí
              và tiến độ.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                    Số điện thoại
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {SITE.hotlines.map((h) => (
                      <a
                        key={h}
                        href={`tel:${h.replace(/\s/g, "")}`}
                        className="text-lg font-semibold text-white hover:underline"
                      >
                        {h}
                      </a>
                    ))}
                  </div>
                  <p className="text-sm text-white/65">
                    Sẵn sàng tư vấn mọi lúc — kể cả ngoài giờ hành chính.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-lg font-semibold text-white hover:underline"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                    Địa chỉ
                  </p>
                  <p className="text-base text-white/85">{SITE.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
                    Giờ Làm Việc
                  </p>
                  <p className="text-base text-white/85">{SITE.workingHours}</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} custom={1}>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl bg-white p-6 text-brand shadow-2xl md:p-8"
              aria-labelledby="contact-form-title"
            >
              <h3
                id="contact-form-title"
                className="text-xl font-semibold text-brand"
              >
                Yêu cầu báo giá miễn phí
              </h3>
              <p className="mt-1 text-sm text-brand/65">
                Vui lòng điền thông tin — chuyên viên sẽ phản hồi trong 15
                phút.
              </p>

              <div className="mt-6 space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">
                    Họ và Tên <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">
                    Số Điện Thoại <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="0901234567"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={10}
                    aria-invalid={!!errors.phone}
                    aria-describedby={
                      errors.phone ? "phone-error" : undefined
                    }
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      role="alert"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email{" "}
                    <span className="text-brand/45 font-normal">(Không bắt buộc)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">
                    Nhu Cầu / Lời Nhắn{" "}
                    <span className="text-brand/45 font-normal">(Không bắt buộc)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Ví dụ: Tôi cần báo giá cửa cuốn cho mặt tiền nhà phố 4m..."
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Đang gửi yêu cầu...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden />
                      Gửi Yêu Cầu Báo Giá
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-brand/55">
                  Bằng việc gửi yêu cầu, Quý khách đồng ý cho Hưng Thành Phát
                  liên hệ qua số điện thoại đã cung cấp.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
