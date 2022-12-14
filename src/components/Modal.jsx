import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";

export default function Modal({
  open,
  setOpen,
  onCancel,
  onValidate,
  title,
  children,
  displayOnly,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform  text-left shadow-xl transition-all max-w-[90%] sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-t-md px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-slate-800 dark:text-gray-100"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2 !text-slate-800 dark:text-gray-100">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
                {!displayOnly && (
                  <div className="dark:bg-gray-700 bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t rounded-b-md dark:border-gray-600">
                    <Button onClick={onValidate}>Validate</Button>
                    <Button defaultbtn={true} onClick={onCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
