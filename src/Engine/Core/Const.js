const genMap = arr => ({ ...arr });

export const EVENTS = [
  "Input",
  "Collision",
  "Physics",
  "Animation",
  "Events",
  "AI",
  "Update",
  "UI"
];

export const TARGETS = genMap(["WORLD", "UI"]);
