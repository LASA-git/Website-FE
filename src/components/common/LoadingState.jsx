export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-lasa-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-lasa-200 border-t-lasa-600" />
      <p className="mt-4 text-sm font-medium">{message}</p>
    </div>
  );
}
