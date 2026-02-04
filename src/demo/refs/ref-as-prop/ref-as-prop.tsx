import { useRef, useState } from 'react';

import { Button, Code, Group, Stack, Text, TextInput } from '@mantine/core';
import { Demo } from '@mantinex/demo';

import { DemoPanel } from '../../../components/demo/demo.panel';

// React 19 way - ref as a regular prop!
interface CustomInputProps {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  placeholder?: string;
}

const CustomInput = ({ ref, label = 'Username', placeholder = 'Enter username' }: CustomInputProps) => {
  return (
    <TextInput
      ref={ref}
      label={label}
      placeholder={placeholder}
    />
  );
};

const RefDemo = ({ label, placeholder }: { label?: string; placeholder?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getValue = () => {
    setValue(inputRef.current?.value ?? '');
  };

  return (
    <Stack gap='md'>
      <CustomInput
        ref={inputRef}
        label={label}
        placeholder={placeholder}
      />

      <Group gap='sm'>
        <Button onClick={focusInput}>Focus Input</Button>
        <Button onClick={getValue}>Read Value</Button>
      </Group>

      <Text
        c='dimmed'
        size='sm'
      >
        Current value: <Code>{value}</Code>
      </Text>
    </Stack>
  );
};

export const RefAsPropsDemo = () => {
  return (
    <DemoPanel
      title='ref as a prop'
      value='ref-as-prop'
      description={
        <>
          React 19 allows <Code>ref</Code> to be passed as a regular prop, eliminating the need for{' '}
          <Code>forwardRef</Code>. This simplifies component APIs and makes refs work like any other prop.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: RefDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: componentCode, fileName: 'custom-input.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'string',
              prop: 'label',
              initialValue: 'Username',
              libraryValue: 'Username',
            },
            {
              type: 'string',
              prop: 'placeholder',
              initialValue: 'Enter username',
              libraryValue: 'Enter username',
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `import { useRef } from 'react';

const Demo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getValue = () => {
    setValue(inputRef.current?.value ?? '');
  };

  return (
    <>
      <CustomInput ref={inputRef}{{props}} />
      <Button onClick={focusInput}>Focus Input</Button>
      <Button onClick={getValue}>Read Value</Button>
    </>
  );
};`;

const componentCode = `
interface CustomInputProps {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  placeholder?: string;
}

const CustomInput = ({ ref, label, placeholder }: CustomInputProps) => {
  return (
    <TextInput
      ref={ref}
      label={label}
      placeholder={placeholder}
    />
  );
};
`;

const comparisonCode = `
/** React 18: Required \`forwardRef\` wrapper */
const OldInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);
OldInput.displayName = 'OldInput'; // Extra boilerplate

/** React 19: \`ref\` as a regular prop */
interface NewInputProps {
  ref?: Ref<HTMLInputElement>;
  // ...other props
}

const NewInput = ({ ref, ...props }: NewInputProps) => {
  return <input ref={ref} {...props} />;
};`;
