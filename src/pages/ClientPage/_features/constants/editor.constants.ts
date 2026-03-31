export const modules = {
  toolbar: [
    [{ font: [] }], // Font family dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header levels
    ["bold", "italic", "underline"], // Formatting buttons
    [{ color: [] }, { background: [] }], // Text color & highlight
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ align: [] }], // Alignment
    ["link", "image"], // Links and images
    ["clean"], // Clear formatting
  ],
};

export const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];
