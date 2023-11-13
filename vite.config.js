import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "import.meta.env.RAPID_API_URL": import.meta.env.RAPID_API_URL,
  //   "import.meta.env.RAPID_API_HOST": import.meta.env.RAPID_API_HOST,
  //   "import.meta.env.RAPID_API_KEY": import.meta.env.RAPID_API_KEY,
  // },
});
