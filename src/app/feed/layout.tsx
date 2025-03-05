import { Toaster } from "react-hot-toast";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <Toaster position="top-right" />
      {children}
    </section>
  );
}
