export interface FieldArrayComponentProps {
    control?: any;
    name?: string;
    fields?: any[]; // You should define the type more precisely if possible
    labels?: { [key: string]: string }; // Assuming labels is an object with string keys and string values
    addButton?: string;
    size?: string; // Assuming size is a string, you should define its type more precisely if possible
    options?: any[]; // You should define the type more precisely if possible
    handleChange?: (value: any) => void; // Assuming handleChange is a function that accepts any value
  }
  