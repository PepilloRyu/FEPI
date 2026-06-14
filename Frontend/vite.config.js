import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'html/loginpage.html'),
        signup: resolve(__dirname, 'html/signup.html'),
        learn: resolve(__dirname, 'html/learn.html'),
        dashboard: resolve(__dirname, 'html/dashboard.html'),
        leaderboard: resolve(__dirname, 'html/leaderboard.html'),
        profile: resolve(__dirname, 'html/profile-page.html'),
        profileEdit: resolve(__dirname, 'html/profile-edit-page.html'),
        admin: resolve(__dirname, 'html/admin.html'),
        faq: resolve(__dirname, 'html/faq.html'),
        verifyEmail: resolve(__dirname, 'html/verify-email.html'),
        world1: resolve(__dirname, 'html/world-1.html'),
        world2: resolve(__dirname, 'html/world-2.html'),
        world3: resolve(__dirname, 'html/world-3.html'),
        world4: resolve(__dirname, 'html/world-4.html'),
        world5: resolve(__dirname, 'html/world-5.html'),
        world6: resolve(__dirname, 'html/world-6.html'),
        amigos: resolve(__dirname, 'html/amigos.html'),
        assignments: resolve(__dirname, 'html/assignments.html'),
        teacher: resolve(__dirname, 'html/teacher.html'),
        tienda: resolve(__dirname, 'html/tienda.html'),
      }
    }
  }
});
