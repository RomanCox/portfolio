import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // dev-сервер по адресу в локальной сети (проверка с телефона): без этого Next блокирует
  // скрипты и HMR для чужого origin — страница без гидрации, меню не открывается
  allowedDevOrigins: ["192.168.*.*"],
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default withNextIntl(nextConfig);
