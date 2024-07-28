"use client";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  handleClose,
  title,
  children,
}: ModalProps) {
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } w-[100vw] min-h-screen fixed top-0 left-0 bg-[#00000099]`}
    >
      <div className="absolute right-10 top-10">
        <button
          onClick={() => {
            handleClose && handleClose();
          }}
        >
          X
        </button>
      </div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[800px] h-[80vh] bg-[#222222] rounded">
        <div className="w-full text-center py-2 border-b font-bold">
          {title}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
