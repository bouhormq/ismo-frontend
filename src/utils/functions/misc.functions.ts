import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FieldErrors, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { IconProps, UserAgentData } from "../types/components.types";
import { KeyValueObject } from "../types/misc.types";

const BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function guessOS() {
  const userAgent = window.navigator.userAgent;
  const platform =
    (window.navigator as unknown as { userAgentData: UserAgentData })
      .userAgentData.platform || window.navigator.platform;
  const macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];

  if (macosPlatforms.indexOf(platform) !== -1) {
    return "MacOS";
  }
  if (iosPlatforms.indexOf(platform) !== -1) {
    return "iOS";
  }
  if (windowsPlatforms.indexOf(platform) !== -1) {
    return "Windows";
  }
  if (/Android/.test(userAgent)) {
    return "Android";
  }
  if (/Linux/.test(platform)) {
    return "Linux";
  }

  return null;
}

export function valueOrNothing<T>(condition: boolean, value: T) {
  return condition ? value : undefined;
}

export function isPrimitive(
  value: unknown,
): value is number | string | boolean {
  return value !== Object(value);
}

export function defaultIconProps(props: IconProps) {
  return {
    size: "16",
    fill: "currentColor",
    stroke: "currentColor",
    ...props,
  };
}

export const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const dateNames = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export const formatDate = (date: Date) => {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
};

export const dashSeperatedDates = (dates: Date[]) => {
  return dates.map((date, index) => {
    const isSecond = index === 1;
    return `${isSecond ? " - " : ""}${formatDate(date)}`;
  });
};

export const calendarEntries = (year: number, month: number) => {
  const weeks = [];
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daysLength = endDate.getDate();

  let start = 1;
  let end;
  if (startDate.getDay() === 1) {
    end = 7;
  } else if (startDate.getDay() === 0) {
    start = new Date(year, month, 0).getDate() - 6 + 1;
    end = 1;
  } else {
    start = new Date(year, month, 0).getDate() + 1 - startDate.getDay() + 1;
    end = 7 - startDate.getDay() + 1;
    weeks.push({
      start: start,
      end: end,
    });
    start = end + 1;
    end = end + 7;
  }

  while (start <= daysLength) {
    weeks.push({
      start: start,
      end: end,
    });
    start = end + 1;
    end = end + 7;
    end = start === 1 && end === 8 ? 1 : end;
    if (end > daysLength && start <= daysLength) {
      end = end - daysLength;
      weeks.push({
        start: start,
        end: end,
      });
      break;
    }
  }

  return weeks.flatMap(({ start, end }, index) => {
    const sub = +(start > end && index === 0);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(year, month - sub, start + index);
      return {
        date: date.getDate(),
        month: date.getMonth(),
      };
    });
  });
};
export const compareDates = (date1: Date, date2: Date) => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);

  newDate1.setHours(0, 0, 0, 0);
  newDate2.setHours(0, 0, 0, 0);

  if (newDate1.getTime() > newDate2.getTime()) return 2;
  else if (newDate1.getTime() < newDate2.getTime()) return -1;
  else {
    return 1;
  }
};

export const getErrorMessage = (error: any): string => {
  if (error.message) {
    const err = JSON.parse(error.message);
    return err.message;
  }
  if (!error.response || !error.response.data || !error.response.data.message)
    return "Quelque chose s'est mal passé";

  if (error.response.data.message.includes("Internal"))
    return "Quelque chose s'est mal passé";

  return error.response.data.message;
};

export const getBackgroundImage = (url: string) => {
  return `bg-[url('${BASE_URL}/${url}')]`;
};

export async function downloadImage(src: string) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = src.split("/").pop() || "download";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download image", error);
  }
}

export function encodeToUtf16le(str: string) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return new Uint8Array(buf);
}

export function formatDateWithHours(date: Date, hasSeconds = false) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  if (hasSeconds) {
    options.second = "2-digit";
  }
  const dateToFormat = new Date(date);

  const dateFormatter = new Intl.DateTimeFormat("fr-FR", options);

  const formattedDate = dateFormatter.format(dateToFormat);

  return formattedDate;
}

export function downloadCsv(fileName: string, data: any) {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}-${formatDateWithHours(new Date(), true)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function freezeObjects<T extends ReadonlyArray<object>>(...objects: T) {
  for (const obj of objects) {
    Object.freeze(obj);
  }
}

export function createMagicLinkEmailRedirectUrl(email: string) {
  const provider = email.split("@")[1];

  if (provider === "gmail.com") {
    return encodeURI(
      `https://mail.google.com/mail/u/${email}/#search/from:(${import.meta.env.VITE_MAGIC_LINK_SENDER_EMAIL})+in:anywhere+newer_than:1h`,
    );
  }

  if (provider === "outlook.com" || provider === "hotmail.com") {
    return encodeURI(`https://outlook.live.com/mail/?login_hint=${email}`);
  }

  if (provider === "icloud.com") {
    return encodeURI("https://www.icloud.com/mail/");
  }

  if (provider === "yahoo.com") {
    return encodeURI("https://mail.yahoo.com/");
  }

  return null;
}

export function encryptString(input: string) {
  const secretKey = import.meta.env.VITE_DATA_ENCRYPTION_KEY;
  let encryptedMessage = "";
  for (let i = 0; i < input.length; i++) {
    encryptedMessage += String.fromCharCode(
      input.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length),
    );
  }

  return btoa(encryptedMessage);
}

export function decryptString(input: string) {
  const secretKey = import.meta.env.VITE_DATA_ENCRYPTION_KEY;
  const decodedMessage = atob(input);
  let decryptedMessage = "";
  for (let i = 0; i < decodedMessage.length; i++) {
    decryptedMessage += String.fromCharCode(
      decodedMessage.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length),
    );
  }
  return decryptedMessage;
}

export function isKeyValObject(value: unknown): value is KeyValueObject {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === "[object Date]";
}

export function typedObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function typedObjectEntries<T extends object>(
  obj: T,
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export function slugify(str: string) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getDeepFormError<T extends FieldValues>(
  error: FieldErrors<T>,
  errorPath: string[],
) {
  let currentError: FieldErrors<T> | undefined = error as
    | FieldErrors<T>
    | undefined;
  for (const key of errorPath) {
    if (!currentError) {
      return undefined;
    }
    currentError = currentError[key] as FieldErrors<T>;
  }

  return currentError as FieldErrors<T>[keyof FieldErrors<T>];
}

export function throttle<T extends (...params: unknown[]) => void>(
  callback: T,
  delay = 250,
) {
  let shouldWait = false;
  let waitingArgs: Parameters<T> | null = null;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: Parameters<T>) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
export function rgbToRgba(
  alpha: number,
  rgbString?: string,
  type?: "text" | "bg",
): string {
  if (!rgbString) return "rgba(0,0,0,0)";

  const { r, g, b } = generateRgbValues(rgbString);
  if (type === "text") {
    return `rgb(${r},${g},${b})`;
  }
  return `rgba(${r},${g},${b},${alpha})`;
}

export const generateRgbValues = (color: string) => {
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const hslToRgb = (hsl: string): { r: number; g: number; b: number } => {
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = hsl.match(hslRegex);
    if (!match) throw new Error("Invalid HSL format");

    const h = parseInt(match[1]) / 360;
    const s = parseFloat(match[2]) / 100;
    const l = parseFloat(match[3]) / 100;

    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hueToRgb(p, q, h) * 255);
    const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

    return { r, g, b };
  };

  if (color.startsWith("rgb")) {
    const rgbValues = color.split(",");
    const r = parseInt(rgbValues[0].split("(")[1]);
    const g = parseInt(rgbValues[1].trim());
    const b = parseInt(rgbValues[2].trim().replace(")", ""));
    return { r, g, b };
  } else if (color.startsWith("hsl")) {
    const { r, g, b } = hslToRgb(color);
    return { r, g, b };
  } else if (color.startsWith("#")) {
    const { r, g, b } = hexToRgb(color);
    return { r, g, b };
  } else {
    throw new Error("Unsupported color format");
  }
};

export function createPdfUrl(file: BlobPart) {
  const blob = new Blob([file], { type: "application/pdf" });
  return window.URL.createObjectURL(blob);
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getFrenchDateInfo = (date?: Date) => {
  const currentDate = date || new Date();

  const dayOfWeek = capitalize(
    format(currentDate, "EEEE", { locale: fr }).substring(0, 3),
  );
  const year = format(currentDate, "yyyy", { locale: fr });
  const month = capitalize(format(currentDate, "MMMM", { locale: fr }));
  const dayNumber = format(currentDate, "d", { locale: fr });

  return { dayOfWeek, year, month, dayNumber };
};

export function getMediaType(media: File | string) {
  if (media instanceof File) {
    return {
      fullType: media.type,
      type: media.type.split("/")[0],
      extension: media.name.split(".").pop(),
    };
  }

  if (typeof media === "string") {
    const extension = media.split(".").pop();

    if (!extension) return null;

    if (extension === "pdf") {
      return {
        fullType: "application/pdf",
        type: "application",
        extension: "pdf",
      };
    }

    if (["jpg", "jpeg", "png", "webp"].includes(extension)) {
      return {
        fullType: `image/${extension}`,
        type: "image",
        extension,
      };
    }
  }

  return null;
}
