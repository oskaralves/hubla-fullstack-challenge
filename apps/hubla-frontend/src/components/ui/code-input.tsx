import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';

interface InputCodeProps extends Omit<InputProps, 'onChange'> {
  digits: number;
  value?: string;
  onChange?: (code: string) => void;
}

const CodeInput: React.FC<InputCodeProps> = ({
  digits,
  value = '',
  onChange,
  className,
  ...props
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\s/g, '');
    if (val.length === 1 && index < digits - 1) {
      inputRefs.current[index + 1]?.select();
    }

    e.target.value = val;

    const currentValues = inputRefs.current
      .map((input) => input?.value || '')
      .join('');
    if (currentValues.length === digits && !currentValues.includes('')) {
      onChange?.(currentValues);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.select();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text').replace(/\s/g, '');
    if (pasteData.length === digits) {
      pasteData.split('').forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      inputRefs.current[digits - 1]?.select();
      onChange?.(pasteData.slice(0, digits)); // Ensure only `digits` number of characters are passed
      e.preventDefault();
    }
  };

  useEffect(() => {
    const limitedValue = value.slice(0, digits); // Ensure the value is limited to the number of digits
    limitedValue.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = char;
      }
    });
  }, [value, digits]);

  useEffect(() => {
    const currentValues = inputRefs.current
      .map((input) => input?.value || '')
      .join('');
    if (currentValues.length === digits && !currentValues.includes('')) {
      onChange?.(currentValues);
    }
  }, [digits, onChange]);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {[...Array(digits)].map((_, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          {...props}
          className={cn(
            'h-10 w-10 p-0 text-center text-xl font-semibold',
            className
          )}
        />
      ))}
    </div>
  );
};

CodeInput.displayName = 'CodeInput';
export { CodeInput };
