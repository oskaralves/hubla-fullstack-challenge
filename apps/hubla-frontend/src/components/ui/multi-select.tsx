"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check, X as RemoveIcon } from "lucide-react";
import React, {
  KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";

export type MultiSelectorOption = {
  value: string;
  label: string;
};

type MultiSelectorProps = {
  values: MultiSelectorOption[];
  onValuesChange: (value: MultiSelectorOption[]) => void;
  loop?: boolean;
} & React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

interface MultiSelectContextProps {
  value: MultiSelectorOption[];
  onValueChange: (value: MultiSelectorOption) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = (): MultiSelectContextProps => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = ({
  values: value = [],
  onValuesChange: onValueChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}: MultiSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const onValueChangeHandler = useCallback(
    (val: MultiSelectorOption) => {
      if (!value || !Array.isArray(value)) return;

      const exists = value.some((item) => item.value === val.value);
      if (exists) {
        onValueChange(value.filter((item) => item.value !== val.value));
      } else {
        onValueChange([...value, val]);
      }
    },
    [value, onValueChange]
  );

  // @todo: change from else if use to switch case statement

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(
          nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex
        );
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
      };

      if ((e.key === "Backspace" || e.key === "Delete") && value.length > 0) {
        if (inputValue.length === 0) {
          if (activeIndex !== -1 && activeIndex < value.length) {
            onValueChange(value.filter((item) => item !== value[activeIndex]));
            const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
            setActiveIndex(newIndex);
          } else {
            onValueChange(
              value.filter((item) => item !== value[value.length - 1])
            );
          }
        }
      } else if (e.key === "Enter") {
        setOpen(true);
      } else if (e.key === "Escape") {
        if (activeIndex !== -1) {
          setActiveIndex(-1);
        } else {
          setOpen(false);
        }
      } else if (dir === "rtl") {
        if (e.key === "ArrowRight") {
          movePrev();
        } else if (e.key === "ArrowLeft" && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      } else {
        if (e.key === "ArrowLeft") {
          movePrev();
        } else if (e.key === "ArrowRight" && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      }
    },
    [value, dir, activeIndex, loop, inputValue.length, onValueChange]
  );

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        onKeyDown={handleKeyDown}
        className={cn(
          "flex flex-col overflow-visible bg-transparent",
          className
        )}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value, onValueChange, activeIndex } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap gap-1 rounded-md border border-muted bg-background p-2 ring-0 ring-offset-background transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      {...props}
    >
      {value?.map((item, index) => (
        <Badge
          key={item?.value}
          className={cn(
            "flex min-h-6 items-center gap-2 rounded px-1",
            activeIndex === index &&
              "outline-none ring-2 ring-ring ring-offset-2"
          )}
          variant="secondary"
        >
          <span className="text-xs">{item?.label}</span>
          <button
            aria-label={`Remove ${item?.label} option`}
            aria-roledescription="button to remove option"
            type="button"
            onMouseDown={mousePreventDefault}
            onClick={() => onValueChange(item)}
          >
            <span className="sr-only">Remove {item?.label} option</span>
            <RemoveIcon className="h-4 w-4 stroke-foreground hover:stroke-foreground/60" />
          </button>
        </Badge>
      ))}
      {children}
    </div>
  );
});

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } =
    useMultiSelect();

  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={cn(
        "ml-2 min-h-6 flex-1 bg-transparent outline-none placeholder:text-sm placeholder:text-muted-foreground",
        className,
        activeIndex !== -1 && "caret-transparent"
      )}
    />
  );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect();
  return (
    <div ref={ref} className="relative">
      {open && children}
    </div>
  );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={cn(
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg absolute top-0 z-10 flex w-full flex-col gap-2 rounded-md border border-muted bg-background p-2 shadow-md transition-colors",
        className
      )}
    >
      {children}
      <CommandEmpty>
        <span className="text-muted-foreground">No results found</span>
      </CommandEmpty>
    </CommandList>
  );
});

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  { value: MultiSelectorOption } & Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "value"
  >
>(({ className, value, children, ...props }, ref) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Verifica se o valor está incluído nas opções selecionadas
  const isIncluded = Options.some((item) => item.value === value.value);

  return (
    <CommandItem
      ref={ref}
      {...props}
      onSelect={() => {
        onValueChange(value);
        setInputValue("");
      }}
      className={cn(
        "flex cursor-pointer justify-between rounded px-2 py-1 transition-colors ",
        className,
        isIncluded && "cursor-default opacity-50",
        props.disabled && "cursor-not-allowed opacity-50"
      )}
      onMouseDown={mousePreventDefault}
    >
      {/* Renderizando o label */}
      {value.label}
      {isIncluded && <Check className="h-4 w-4" />}
    </CommandItem>
  );
});

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
};
