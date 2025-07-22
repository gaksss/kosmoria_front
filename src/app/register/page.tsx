"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

// ✅ Schéma de validation avec zod
const registerSchema = z
  .object({
    pseudo: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// ✅ Typage du formulaire
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const userData = {
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
      };

      const result = await register(userData);
      if (result.success) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Nav retour home */}
        <div className="justify-start items-start flex">
          <Link href="/" aria-label="Retour à la carte">
            <Button
              variant="outline"
              className="text-white border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer rounded-full px-6 flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Carte</span>
            </Button>
          </Link>
        </div>
        {/* Header avec logo/titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-sm"></div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Rejoignez Kosmoria
          </h1>
          <p className="text-muted-foreground text-sm">
            Créez votre compte en quelques minutes
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl p-6 shadow-xl shadow-emerald-500/10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Pseudo */}
              <FormField
                control={form.control}
                name="pseudo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Pseudo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre pseudo"
                        autoComplete="username"
                        disabled={isLoading}
                        className="h-11 bg-white/70 dark:bg-gray-800/70 border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Adresse email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="exemple@email.com"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        className="h-11 bg-white/70 dark:bg-gray-800/70 border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mot de passe */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        className="h-11 bg-white/70 dark:bg-gray-800/70 border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmation mot de passe */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Confirmer le mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        className="h-11 bg-white/70 dark:bg-gray-800/70 border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkbox conditions */}
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                      <Checkbox
                        id="acceptTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="mt-0.5"
                      />
                      <div className="space-y-1 leading-none">
                        <label
                          htmlFor="acceptTerms"
                          className="text-sm text-foreground cursor-pointer"
                        >
                          J&apos;accepte les{" "}
                          <Link
                            href="/terms"
                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors font-medium"
                          >
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link
                            href="/privacy"
                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors font-medium"
                          >
                            politique de confidentialité
                          </Link>
                        </label>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Bouton submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 transform hover:scale-[1.02] border-0 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Inscription en cours...</span>
                  </div>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Créer mon compte</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Lien vers connexion */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>

        {/* Décoration subtile */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
