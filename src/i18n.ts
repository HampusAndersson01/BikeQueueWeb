// src/i18n.ts
export type Language = "en" | "sv";

export const translations: Record<Language, { [key: string]: string}> = {
  en: {
    settings: "Settings",
    language: "Language",
    changeTime: "Change Time (minutes)",
    bikes: "Bikes",
    addBike: "Add Bike",
    remove: "Remove",
    resetAll: "Reset All",
    createdBy: "Created by",
    confirmReset: "Are you sure you want to reset all bikes?",
    enterName: "Enter name",
    switch: "Switch",
    queue: "Queue:",
    noOne: "Available",
  },
  sv: {
    settings: "Inställningar",
    language: "Språk",
    changeTime: "Bytestid (minuter)",
    bikes: "Cyklar",
    addBike: "Lägg till cykel",
    remove: "Ta bort",
    resetAll: "Återställ Alla",
    createdBy: "Skapad av",
    confirmReset: "Är du säker på att du vill återställa alla cyklar?",
    enterName: "Ange namn",
    switch: "Byte",
    queue: "Kö:",
    noOne: "Ledig",
  },
};

export default translations;