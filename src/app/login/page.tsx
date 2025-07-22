"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Définition du schéma de validation
const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rememberMe: z.boolean().optional(),
});

// Types pour les données du formulaire
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get("returnUrl") || "/";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Modifier la fonction onSubmit
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        // Rediriger vers la page d'origine ou la page d'accueil
        router.push(returnUrl);
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
            Bon retour !
          </h1>
          <p className="text-muted-foreground text-sm">
            Connectez-vous à votre compte Kosmoria
          </p>
         
        </div>

        {/* Carte principale */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl p-6 shadow-xl shadow-emerald-500/10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="h-11 bg-white/70 dark:bg-gray-800/70 border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between py-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="border-emerald-300 dark:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-foreground cursor-pointer select-none"
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                  )}
                />

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 transform hover:scale-[1.02] border-0 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Se connecter</span>
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Lien vers inscription */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors"
            >
              S&apos;inscrire
            </Link>
          </p>
        </div>

        {/* Alternative - divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-emerald-200/50 dark:border-emerald-800/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-emerald-50 dark:bg-emerald-950 px-4 text-muted-foreground">
              Première visite ?
            </span>
          </div>
        </div>

        {/* CTA vers inscription */}
        <div className="text-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center w-full h-11 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-200 space-x-2"
          >
            <span>Créer un compte</span>
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </Link>
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
