import { Locale } from "@/contexts/language-context";

import enum_ptBR from "./pt-BR/enum.json";
import feedback_ptBR from "./pt-BR/feedback.json";
import field_ptBR from "./pt-BR/field.json";
import general_ptBR from "./pt-BR/general.json";
import metadata_ptBR from "./pt-BR/metadata.json";
import navigation_ptBR from "./pt-BR/navigation.json";
import validation_ptBR from "./pt-BR/validation.json";

import enum_enUS from "./en-US/enum.json";
import feedback_enUS from "./en-US/feedback.json";
import field_enUS from "./en-US/field.json";
import general_enUS from "./en-US/general.json";
import metadata_enUS from "./en-US/metadata.json";
import navigation_enUS from "./en-US/navigation.json";
import validation_enUS from "./en-US/validation.json";

type GeneralType = typeof general_ptBR;
type FieldType = typeof field_ptBR;
type ValidationType = typeof validation_ptBR;
type FeedbackType = typeof feedback_ptBR;
type EnumType = typeof enum_ptBR;
type NavigationType = typeof navigation_ptBR;
type MetadataType = typeof metadata_ptBR;

export type DictionaryType = {
  general: GeneralType;
  field: FieldType;
  validation: ValidationType;
  feedback: FeedbackType;
  enum: EnumType;
  navigation: NavigationType;
  metadata: MetadataType;
};

export const dictionaries: Record<Locale, DictionaryType> = {
  "pt-BR": {
    navigation: navigation_ptBR,
    general: general_ptBR,
    field: field_ptBR,
    validation: validation_ptBR,
    feedback: feedback_ptBR,
    enum: enum_ptBR,
    metadata: metadata_ptBR,
  },
  "en-US": {
    navigation: navigation_enUS,
    general: general_enUS,
    field: field_enUS,
    validation: validation_enUS,
    feedback: feedback_enUS,
    enum: enum_enUS,
    metadata: metadata_enUS,
  },
};

export function getDictionary<K extends keyof DictionaryType | undefined>(
  locale: Locale,
  key?: K
): K extends keyof DictionaryType ? DictionaryType[K] : DictionaryType {
  const dictionary = dictionaries[locale] || dictionaries["pt-BR"];

  if (key) {
    return dictionary[key] as K extends keyof DictionaryType
      ? DictionaryType[K]
      : never;
  }

  return dictionary as K extends keyof DictionaryType ? never : DictionaryType;
}
