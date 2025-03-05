export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-100 dark:bg-gray-800 w-full">
      <div className="w-full">{children}</div>
    </div>
  );
}
