import { useEffect, useRef } from 'react';
import {
  useFieldArray,
  Controller,
  Control,
  FieldValues,
} from 'react-hook-form';
import { Space, Form, Input, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface FieldArrayComponentProps {
  control?: Control<FieldValues>;
  name?: string;
  fields?: any[];
  labels?: { [key: string]: string };
  filedType?: {
    [key: string]: {
      type: 'input' | 'select';
      options?: { label: string; value: string }[];
    };
  };
  addButton?: string;
}

const FieldArrayComponent: React.FC<FieldArrayComponentProps> = ({
  control,
  name,
  fields,
  labels,
  filedType,
  addButton,
}) => {
  const {
    fields: fieldArray,
    append,
    remove,
  } = useFieldArray({ control, name });

  const hasAppendedRef = useRef(false);

  useEffect(() => {
    if (!hasAppendedRef.current && fieldArray.length === 0 && fields && fields.length > 0) {
      append(fields[0]);
      hasAppendedRef.current = true;
    }
  }, [append, fields, fieldArray.length]);


  return (
    <>
      {fieldArray.map((item, index) => (
        <Space
          className={`relative grid ${
            fieldArray.length > 1 ? 'w-[95%]' : 'w-full'
          } grid-cols-1 gap-4  ${Object?.keys(fieldArray[0])?.length === 3 ? 'grid-cols-2' : 'lg:grid-cols-3'}`}
          key={item.id}
          align="baseline"
        >
          {Object.keys(fields[0]).map((field) => (
            <Form.Item key={field} label={labels[field]} className="w-full">
              <Controller
                name={`${name}[${index}].${field}`}
                control={control}
                defaultValue={filedType[field]?.type === 'select' ? [] : ''}
                render={({ field: controllerField }) => {
                  const fieldConfig = filedType[field];
                  const fieldType = fieldConfig?.type;
                  return (
                    <>
                      {fieldType === 'select' ? (
                        <Select
                        mode="tags"
                        size="large"
                        placeholder="Please select or type"
                        onChange={(value) => {
                          const stringValue = value.join(', ');
                          controllerField.onChange(stringValue);
                        }}
                        style={{ width: '100%' }}
                        className="mt-2 h-12"
                        options={fieldConfig?.options}
                        value={(controllerField.value && controllerField.value.split(', ')) || []}
                      />
                      ) : (
                        <Input
                          {...controllerField}
                          className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                        />
                      )}
                    </>
                  );
                }}
              />
            </Form.Item>
          ))}
          {fieldArray.length > 1 && (
            <MinusCircleOutlined
              className="absolute right-[-2.5%] top-[50%] -translate-y-1/2 transform cursor-pointer text-[1.8rem] lg:right-[-5%]"
              onClick={() => remove(index)}
            />
          )}
        </Space>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={() => append(fields[0])}
          icon={<PlusOutlined />}
        >
          Add {addButton}
        </Button>
      </Form.Item>
    </>
  );
};

export default FieldArrayComponent;
