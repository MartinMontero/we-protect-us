import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const FALLBACK_SUPABASE_URL = "https://sedwmymsmgykmunpqmdy.supabase.co";

// Inject a build-time <link rel="preconnect"> to the configured Supabase origin
// so the very first auth/session request doesn't pay the DNS+TLS round-trip.
function preconnectSupabase(supabaseUrl: string): Plugin {
  let origin = FALLBACK_SUPABASE_URL;
  try {
    origin = new URL(supabaseUrl).origin;
  } catch {
    /* keep fallback */
  }
  return {
    name: "preconnect-supabase",
    transformIndexHtml(html) {
      return html.replace(
        "</head>",
        `  <link rel="preconnect" href="${origin}" crossorigin />\n` +
          `  <link rel="dns-prefetch" href="${origin}" />\n  </head>`,
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const supabaseUrl = env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    preview: {
      port: 8080,
    },
    plugins: [react(), preconnectSupabase(supabaseUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Strip noisy/PII-leaking debug logs from production bundles while keeping
    // console.warn / console.error for real diagnostics.
    esbuild: {
      pure: mode === "production" ? ["console.log", "console.debug", "console.info"] : [],
    },
    build: {
      target: "es2020",
      sourcemap: false,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          // Split the always-loaded vendors into stable chunks for long-term
          // caching. Heavy, route-specific libs (recharts, leaflet) are left for
          // Rollup to async-split so they load on demand rather than up front.
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            supabase: ["@supabase/supabase-js"],
          },
        },
      },
    },
  };
});
