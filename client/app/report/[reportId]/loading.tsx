import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="questions-page px-3 md:px-5 flex flex-col flex-1 pb-3 md:pb-5 items-center justify-center">
      <Spinner />
    </div>
  );
}
