/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Отключаем ESLint-проверки во время сборки
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Отключаем TypeScript-проверки во время сборки
        ignoreBuildErrors: true,
    },
};

export default nextConfig;