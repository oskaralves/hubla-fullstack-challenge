import { Locale } from "@/contexts/language-context";
import { getDictionary } from "@/dictionaries";
import { translateFormatter } from "@/dictionaries/utils";
import { User } from "@/types/user";
import { z } from "zod";

const UserRoleEnum = z.enum(["ADMIN", "AFFILIATE", "PRODUCER"]);
const UserGenderEnum = z.enum([
  "MALE",
  "FEMALE",
  "NON_BINARY",
  "TRANSGENDER",
  "GENDER_FLUID",
  "AGENDER",
  "BIGENDER",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

const createUserSchema = (
  locale: Locale = "pt-BR",
  isEdition: boolean = false
) => {
  const {
    REQUIRED_FIELD,
    MIN_LENGTH,
    MAX_LENGTH,
    FULL_NAME_REQUIRED,
    USERNAME_INVALID,
    EMAIL_INVALID,
    PASSWORD_WEAK,
  } = getDictionary(locale, "validation");
  const { NAME, NICKNAME, PASSWORD } = getDictionary(locale, "field");

  return z.object({
    name: z
      .string({
        message: translateFormatter(REQUIRED_FIELD, {
          field: NAME,
        }),
      })
      .min(3, translateFormatter(MIN_LENGTH, { field: NAME, min: 3 }))
      .max(90)
      .refine((val) => val.trim().split(/\s+/).length >= 2, {
        message: translateFormatter(FULL_NAME_REQUIRED, {
          field: NAME,
        }),
      }),
    nickname: z
      .string()
      .max(
        40,
        translateFormatter(MAX_LENGTH, {
          field: NICKNAME,
          max: 40,
        })
      )
      .nullable()
      .optional()
      .refine((val) => !!!val || val.length >= 2, {
        message: translateFormatter(MIN_LENGTH, {
          field: NICKNAME,
          min: 2,
        }),
      }),
    username: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val === null || val === undefined || val === "") return true;
          return /^[a-z0-9_-]+$/.test(val);
        },
        {
          message: USERNAME_INVALID,
        }
      )
      .transform((val) => val?.toLowerCase()),
    email: z
      .string()
      .email({ message: EMAIL_INVALID })
      .transform((val) => val.toLowerCase()),
    cellphone: z.string().optional().nullable(),
    gender: UserGenderEnum.optional().nullable(),
    birthDate: z
      .date()
      .nullable()
      .optional()
      .refine(
        (value) => {
          if (value) {
            const date = new Date(value);
            return !isNaN(date.getTime()) && date <= new Date();
          }
        },
        {
          message: "Invalid birth date. It must be a valid past date.",
        }
      ),
    password: isEdition
      ? z.string().optional()
      : z
          .string()
          .min(6, {
            message: translateFormatter(MIN_LENGTH, {
              field: PASSWORD,
              min: 6,
            }),
          })
          .max(90)
          .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: PASSWORD_WEAK,
          }),
    image: z.string().nullable().optional(),
    coverImage: z.string().nullable().optional(),
    roles: z.array(UserRoleEnum).nullable(),
  });
};

export const getUserFormSchema = (
  locale: Locale = "pt-BR",
  isEdition: boolean = false
) => {
  return createUserSchema(locale, isEdition);
};
export const CreateUserSchema = getUserFormSchema("pt-BR");
export const UpdateUserSchema = getUserFormSchema("pt-BR", true);

export type UserFormValueType = z.infer<typeof CreateUserSchema>;

export const getUserFormValues = (user?: User): Partial<UserFormValueType> => {
  return {
    name: user?.name || "",
    nickname: user?.nickname || "",
    username: user?.username?.replace(/[^a-z0-9_-]/gi, "") || "",
    email: user?.email || "",
    cellphone: user?.cellphone || "",
    password: "",
    image: user?.image || null,
    coverImage: user?.coverImage || null,
    roles: user?.roles.map((role) => role.role) || ["AFFILIATE"],
    gender: user?.gender || null,
    birthDate: user?.birthDate ? new Date(user.birthDate) : null,
  };
};
