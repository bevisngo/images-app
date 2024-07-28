"use client";

interface Props {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode | string;
}

export default function Button({ className, onClick, children }: Props) {
  return (
    <button
      className={`bg-[#f1c40f] hover:bg-[#2c3e50] text-[#2c3e50] hover:text-[#f1c40f] transition font-semibold py-2 px-4 rounded-md ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
