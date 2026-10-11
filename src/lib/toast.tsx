"use client";

import React from "react";
import { toast, type ToastOptions } from "react-toastify";

// Shared look for every toast: white rounded card, soft shadow, no progress
// bar/close button — matches the "সফলভাবে সাইন আউট হয়েছে।" design.
// Note: newer react-toastify versions removed `bodyClassName`, so all the
// styles (including the former body styles) now live in `className`.
const baseOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeButton: false,
  className:
    "!min-h-0 !items-center !gap-3 !rounded-2xl !bg-white !p-3 !text-sm !font-semibold !text-gray-900 !shadow-lg",
};

const IconBadge = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => (
  <span
    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${color}`}
  >
    {children}
  </span>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const notifySuccess = (message: string) =>
  toast(message, {
    ...baseOptions,
    icon: (
      <IconBadge color="bg-emerald-500">
        <span className="text-white">
          <CheckIcon />
        </span>
      </IconBadge>
    ),
  });

export const notifyError = (message: string) =>
  toast(message, {
    ...baseOptions,
    icon: (
      <IconBadge color="bg-red-500">
        <span className="text-white">
          <XIcon />
        </span>
      </IconBadge>
    ),
  });